const mongoose=require('mongoose');
const User= require('./userModel')
const Increment = require('mongoose-auto-increment')
const connection = mongoose.createConnection("mongodb+srv://Danya:JaxTeller02@cluster.a3ypt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
Increment.initialize(connection)
const threadSchema=new mongoose.Schema({
        id: Number,
        name: {
            type: String,
            required: [true, `A tour must have a name`],
            trim: true,
            maxlength: [40, 'a thread-collection name must have less ot equal then 40 characters'],
            minlength: [10, 'a thread-collection name mush have more or equal then 10 characters'],
        },
        description: {
            type: String,
            maxlength: [200, 'a thread-collection name must have less ot equal then 40 characters']
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