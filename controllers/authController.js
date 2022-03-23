const jwt= require('jsonwebtoken')
const User= require('./../models/userModel')
const AppError= require('./../utils/appError')
const catchAsync= require('./../utils/catchAsync')
const {promisify}= require('util')
const Email= require('./../utils/email')
const crypto= require('crypto')

const signToken=  id =>{
  return jwt.sign({id},   process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_SECRET_IN
  })
}

exports.sendUser= (req, res, next) =>{
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  })
}

const createSendToken= (user, statusCode, res) =>{
  const token= signToken(user._id)
  const cookieOptions= {
    expires: new Date(Date.now()+process.env.JWT_COOKIES_EXPIRES_IN*24*3600*1000),
    httpOnly: true,
    // sameSite: 'none',
    // secure: true
  }

  if(process.env.NODE_ENV=== 'production') cookieOptions.secure=true

  res.cookie('jwt', token, cookieOptions)

  user.password=undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    user
  })

}

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  })

  createSendToken(newUser, 201, res)
})


exports.login= catchAsync(async (req, res, next)=>{
  const {email, password}= req.body

  if(!email || !password){
    return next(new AppError('Отсутствует логин или пароль', 400))
  }

  const user=await User.findOne({email}).select('+password')

  if(!user ||!await user.correctPassword(password, user.password)){
    return next(new AppError('Вы ввели неверный логин или пароль.', 401))
  }

  createSendToken(user, 200, res)

})

exports.logout = (req, res) => {
  console.log('inside logout')
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })
  res.status(200).json({ status: 'success' })
}

exports.protect =catchAsync(async(req, res, next)=>{

  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token= req.headers.authorization.split(' ')[1]
  } else if(req.cookies.jwt) {
    token= req.cookies.jwt
  }

  if(!token){
    return next(new AppError('You are not logged in! Please Log in to get access.', 401))
  }
  // verification token
  const decoded=await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  // check if user still exists
  const currentUser= await User.findById(decoded.id)

  if(!currentUser){
    return next(new AppError('the user belonging to this token does no longer exist', 401))
  }

  // check if user changed password after the token was issued

  // if(currentUser.changedPasswordAfter(decoded.iat)){
  //   return next (new AppError('user recently changed password! please login again', 401))
  // }

  req.user=currentUser
  res.locals.user=currentUser
  next()
})

exports.isLoggedIn = catchAsync(async (req, res, next) => {

  req.user=null

  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      )

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id)

      if (!currentUser) {
        return next()
      }

      // 3) Check if user changed password after the token was issued
      // if (currentUser.changedPasswordAfter(decoded.iat)) {
      //   return next()
      // }

      // THERE IS A LOGGED IN USER
      req.user = currentUser

    } catch (err) {
      return next()
    }
  }
  next()
} )

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      )
    }

    next()
  }
}

