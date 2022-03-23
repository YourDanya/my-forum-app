const mongoose=require('mongoose')
const slugify= require('slugify')
const validator= require('validator')
const User= require('./userModel')
const Thread=require('./threadModel')

const postSchema=  new mongoose.Schema({
    post: {
        type: String,
        required: [true, 'Post can not be empty']
    },
    reply: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    thread: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thread',
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    number: {
        type: Number
    },
    likes:{
        count: {
           type: Number,
            default: 0
        },
        users: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    },
    dislikes: {
        count: {
            type: Number,
            default: 0
        },
        users: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'User'
            }
        ]
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

postSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'author',
        select: 'name'
    }).populate({
        path: 'reply',
        select: 'post'
    })
    next()
})

const Post= mongoose.model('Post', postSchema)
module.exports= Post