const mongoose=require('mongoose');
const User= require('./userModel')
const Increment = require('mongoose-auto-increment')
const connection = mongoose.createConnection("mongodb+srv://Danya:JaxTeller02@cluster.a3ypt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
Increment.initialize(connection)
const threadSchema=new mongoose.Schema({
        id: Number,
        name: {
            type: String,
            trim: true,
            maxlength: [100, 'Название темы должно состоять из 100 или менее символов.'],
            minlength: [6, 'Название темы должно состоять из 6 или более символов.'],
        },
        description: {
            type: String,
            maxlength: [1500, 'Описание темы должно иметь меньше 1500 символов.']
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        },
        postsCount: {
            type: Number,
            default: 0
        },
        likes: {
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
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

threadSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'thread',
    localField: '_id'
})

threadSchema.plugin(Increment.plugin, {model: 'Thread', field: 'id'})

threadSchema.pre(/^find/, function(next) {
    this.populate({
        path:'author',
        select: 'name'
    });
    next();
});

const Thread= mongoose.model('Thread', threadSchema)
module.exports= Thread