const express=require('express')
const userController=require('./../controllers/userController')
const authController=require('./../controllers/authController')
const multer= require('multer')
const router=express.Router()

const upload=multer({dest: 'public/img/users'})

router.get('/', authController.isLoggedIn, authController.sendUser)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use(authController.protect)

router.patch('/updateMyPassword', authController.updateMyPassword)
router.get('/me', userController.getMe, userController.getUser, userController.myThread)
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
)
router.delete('/deleteMe', userController.deleteMe)


// router.use(authController.restrictTo('admin'))

router
  .route('/')
  .get(userController.getAllUsers)

router
  .route('/:id')
  .delete(userController.deleteUser)


module.exports=router

