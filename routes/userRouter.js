const express=require('express')
const userController=require('./../controllers/userController')
const authController=require('./../controllers/authController')
const multer= require('multer')
const router=express.Router()

router.get('/', authController.isLoggedIn, authController.sendUser)
router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.patch('/resetPassword/:token', userController.resetPassword)
router.post('/confirm-email/:token', userController.confirmEmail)

router.use(authController.protect)

router.patch('/updateMe', userController.updateMe)
router.delete('/deleteMe', userController.deleteMe)

// router.use(authController.restrictTo('admin'))

module.exports=router

