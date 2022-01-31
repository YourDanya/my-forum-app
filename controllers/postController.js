const factory= require('./handlerFactory')
const Thread= require('../models/threadModel')
const catchAsync= require('./../utils/catchAsync')
Post=require(`./../models/postModel.js`)
User=require(`./../models/userModel`)


// exports.sendData= async(req, res, next)=>{
//     req.body.author=req.user.id
//     const thread=await Thread.findOne({id: req.params.id})
//     req.body.number=++thread.postsCount
//     await thread.save()
//     req.body.thread=thread._id
//
//     if(req.params.replyId){
//         req.body.reply=req.params.replyId
//         const replyPost= await Post.findOne({_id:req.params.replyId})
//         const user= await User.findOne({_id: replyPost.author})
//     }
//
//     next()
// }

exports.sendReply= async(req, res, next)=>{
    const replyPost= await Post.findOne({_id:req.params.replyId})
    const user= await User.findOne({_id: replyPost.author})
    user.myReplies.count++
    user.myReplies.replies.push({post: req.body.reply, thread: req.body.thread})
    user.save({validateBeforeSave: false})
    next()
}

exports.getAllPosts= factory.getAll(Post)
exports.getPost= factory.getOne(Post)
exports.deletePost= factory.deleteOne(Post)
exports.updatePost=factory.updateOne(Post)

exports.createPost =  catchAsync(async (req, res, next) => {
    console.log('inside create post route ///////////////////////')
    req.body.author=req.user.id
    const thread=await Thread.findOne({id: req.params.id})
    req.body.number=++thread.postsCount
    await thread.save()
    req.body.thread=thread._id

    if(req.params.replyId) {
        req.body.reply=req.params.replyId
        // const replyPost= await Post.findOne({_id:req.params.replyId})
        // const user= await User.findOne({_id: replyPost.author})
    }

    const post=await Post.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            data: post
        }
    })
})