const catchAsync= require('./../utils/catchAsync')
const AppError= require('./../utils/appError')
const User= require('./../models/userModel')
const Thread= require('./../models/threadModel')
const factory= require('./handlerFactory')
const multer= require('multer')
const sharp= require('sharp')

// const multerStorage= multer.diskStorage({
//   destination: (req, file, cb) =>{
//      cb(null, 'public/img/users')
//   },
//   filename: (req, file, cb) =>{
//     const ext=file.mimetype.split('/')[1]
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext }`)
//   }
// })

exports.myThread= async(req, res, next)=>{

  if(!req.user) return

  const user=await User.findOne({_id: req.user.id});
  const thread=await Thread.findOne({_id: req.body.thread});
  const myThread= user.myThreads.find(item => {return item.thread.toString()===req.body.thread.toString()})

  if(myThread){
    myThread.readPosts = thread.postsCount
    if(user.myReplies.count!==0)
    user.myReplies.replies=user.myReplies.replies.map(
        item => {
          if(item.thread.toString()===req.body.thread.toString()){
            user.myReplies.count--
            item.checked=true
          }
          return item
        })
  } else{
    user.myThreads.push({readPosts: thread.postsCount, thread: req.body.thread})
  }

  user.save({validateBeforeSave: false})

}

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});


exports.uploadUserPhoto= upload.single('photo')

exports.resizeUserPhoto= catchAsync( async (req, res, next) =>{

  if(!req.file) return next()
  req.file.filename=`user-${req.user.id}-${Date.now()}.jpeg`

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({quality: 90})
    .toFile(`public/img/users/${req.file.filename}`)

  next()
})

exports.updateMe= catchAsync( async (req, res, next)=>{

  //1 create error if user post s password data
  if(req.body.password|| req.body.passwordConfirm){
    return next(new AppError('This route is not for password updates. Please use / updateMyPassword', 401));
  }
  //2 update user document

  const filteredBody= filterObj(req.body, 'name', 'email');
  if(req.file) filteredBody.photo = req.file.filename


  const updatedUser= await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true, runValidators: true
  });

  res.status(200).json({
    status: 'success',
    user: updatedUser
  })

})


const filterObj= (obj, ...allowedFields) =>{
  const newObj= {};
  Object.keys(obj).forEach(el =>{
    if(allowedFields.includes(el)){
      newObj[el]=obj[el];
    }
  })
  return newObj;
}

exports.getMe= catchAsync(async (req, res, next)=>{
  req.params.id= req.user.id
  next()
})

exports.deleteMe= catchAsync(async (req, res, next)=>{
  await User.findByIdAndUpdate(req.user.id, {active: false});

  res.status(204).json({
    status: 'success',
    data: null
  })

  res.status(500).json({
    status: 'error',
    message:'this route is not defined'
  })
})

exports.getAllUsers= factory.getAll(User)
exports.updateUser= factory.updateOne(User)
exports.getUser= factory.getOne(User)
exports.deleteUser= factory.deleteOne(User)