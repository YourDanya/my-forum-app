const express=require('express');
const router=express.Router();
const authController= require('./../controllers/authController')
const threadController= require('./../controllers/threadController')
const postController= require('./../controllers/postController')
const userController= require('./../controllers/userController')
const handlerFactory= require('./../controllers/handlerFactory')

router
    .route('/')
    .get(threadController.getAllThreads)
    .post(
        authController.protect,
        threadController.sendAuthor,
        threadController.createThread,
        userController.myThread);

router
    .route('/:id')
    .get(authController.protect, threadController.getThread, userController.myThread)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        threadController.updateThread)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        threadController.updateThread);

router
    .route('/:id/createPost/')
    .post(
        authController.protect,
        postController.sendData,
        postController.createPost,
        userController.myThread,
    )

router
    .route('/:id/createPost/:replyId')
    .post(
        authController.protect,
        postController.sendData,
        postController.createPost,
        postController.sendReply,
        userController.myThread,
    )

router
    .route('/:id/like')
    .get(
        authController.protect,
        handlerFactory.like
    )

router
    .route('/:id/dislike')
    .get(
        authController.protect,
        handlerFactory.dislike
    )

router
    .route('/:id/like/:postNum')
    .get(
        authController.protect,
        handlerFactory.like
    )

router
    .route('/:id/dislike/:postNum')
    .get(
        authController.protect,
        handlerFactory.dislike
    )




module.exports=router;

