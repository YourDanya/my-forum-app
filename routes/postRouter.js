const express=require('express');
const router=express.Router();
const authController= require('./../controllers/authController')
const postController= require('../controllers/postController')
router
    .route('/')
    .get(postController.getAllPosts)
    .post(
        authController.protect,
        postController.createPost);

router
    .route('/:id')
    .get(postController.getPost)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        postController.updatePost)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        postController.updatePost);

module.exports=router;


