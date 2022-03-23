const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')
const User = require('./../models/userModel')
const Thread = require('./../models/threadModel')
const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const {sendMail} = require("../utils/email");
const crypto = require('crypto')

// const multerStorage= multer.diskStorage({
//   destination: (req, file, cb) =>{
//      cb(null, 'public/img/users')
//   },
//   filename: (req, file, cb) =>{
//     const ext=file.mimetype.split('/')[1]
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext }`)
//   }
// })

exports.myThread = async (req, res, next) => {

    if (!req.user) return

    const user = await User.findOne({_id: req.user.id})
    const thread = await Thread.findOne({_id: req.body.thread})
    const myThread = user.myThreads.find(item => {
        return item.thread.toString() === req.body.thread.toString()
    })

    if (myThread) {
        myThread.readPosts = thread.postsCount
        if (user.myReplies.count !== 0)
            user.myReplies.replies = user.myReplies.replies.map(
                item => {
                    if (item.thread.toString() === req.body.thread.toString()) {
                        user.myReplies.count--
                        item.checked = true
                    }
                    return item
                })
    } else {
        user.myThreads.push({readPosts: thread.postsCount, thread: req.body.thread})
    }

    user.save({validateBeforeSave: false})

}

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadUserPhoto = upload.single('photo')

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {

    if (!req.file) return next()
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`

    await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`public/img/users/${req.file.filename}`)

    next()
})

exports.updateMe = catchAsync(async (req, res, next) => {

    const filteredBody = filterObj(req.body, 'newName', 'newEmail',
        'currentPassword', 'passwordConfirm', 'newPassword', 'email')

    const user = await User.findById(req.user.id).select('+password')

    const updateSuccess = {}

    if ('newName' in filteredBody) {
        user.name = filteredBody.newName

        await user.save()
        updateSuccess.name = 'success'
    }
    if ('newEmail' in filteredBody) {

        const updateToken = crypto.randomBytes(32).toString('hex')

        user.emailConfirmToken = crypto.createHash('sha256').update(updateToken).digest('hex').toString()
        user.emailConfirmExpires = Date.now() + 10 * 60 * 1000

        const message = `Перейдите по ссылке для подтверждения почты: http://localhost:5000/confirm-email/${updateToken}`

        await sendMail('Подтверждение почты', message, filteredBody.newEmail)

        user.emailToConfirm = filteredBody.newEmail
        await user.save()
        updateSuccess.email = 'success'
    }
    else if ('currentPassword' in filteredBody && 'passwordConfirm' in filteredBody && 'newPassword' in filteredBody) {

        const {currentPassword, passwordConfirm, newPassword} = filteredBody

        const user = await User.findById(req.user.id).select('password')

        // console.log(await bcrypt.compare(currentPassword, user.password))

        if (!(await bcrypt.compare(currentPassword, user.password) && (newPassword === passwordConfirm))) {
            return next(new AppError('Ошибка смены пароля.', 401, {errorFields: {
                password: 'Старый пароль неверен, или новый пароль и подтверждение не совпадают.'
                }}))
        }

        user.password = filteredBody.newPassword
        await user.save()
        updateSuccess.password = 'success'
    }
    else if ('email' in filteredBody) {

        const resetToken = crypto.randomBytes(32).toString('hex')

        user.ResetToken = crypto.createHash('sha256').update(resetToken).digest('hex').toString()
        user.ResetExpires = Date.now() + 10 * 60 * 1000

        const message = `Перейдите по ссылке для смены пароля: http://localhost:5000/reset-password/${resetToken}`

        await sendMail('Сброс пароля', message, filteredBody.email)

        await user.save()
        updateSuccess.forget = 'success'
    }

    res.status(200).json({
        status: 'success',
        updateSuccess
    })

})

exports.confirmEmail = catchAsync(async (req, res, next) => {
    console.log(req.params.token)

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await User.findOne({
        emailConfirmToken: hashedToken,
        emailConfirmExpires: {$gt: new Date()}
    })

    if (!user) {
        return next(new AppError('Токент устарел или неверен', 400))
    }

    user.ConfirmedEmail = true
    user.email = user.emailToConfirm
    user.emailToConfirm = undefined
    user.emailConfirmToken = undefined
    user.emailConfirmExpires = undefined

    await user.save()
    res.status(200).json({
        status: 'success',
        message: 'Ваша почта успешно подтверждена!'
    })
})

exports.resetPassword= catchAsync( async (req, res, next) =>{
    // 1 get user based on token
    const hashedToken= crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    // 2 if token has not expired and there is a user
    const user= await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: new Date()}
    })

    if(!user){
        return next(new AppError('Token is invalid or expired', 400))
    }

    user.password= req.body.password
    user.passwordConfirm= req.body.passwordConfirm
    user.passwordResetToken= undefined
    user.passwordResetExpires= undefined

    await user.save()

    res.status(200).json({
        status: 'success',
        message: 'Ваш пароль успешно изменен!'
    })

})

const filterObj = (obj, ...allowedFields) => {
    const newObj = {}
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) {
            newObj[el] = obj[el]
        }
    })
    return newObj
}

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {active: false})

    res.status(204).json({
        status: 'success',
    })

})

