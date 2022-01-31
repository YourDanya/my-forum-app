const factory= require('./handlerFactory')
Thread=require(`./../models/threadModel.js`)
const catchAsync= require('./../utils/catchAsync')

exports.sendAuthor= async(req, res, next)=>{
    req.body.author=req.user.id;
    next();
}

exports.getAllThreads= factory.getAll(Thread)
exports.getThread= factory.getOne(Thread)
exports.deleteThread= factory.deleteOne(Thread)
exports.updateThread=factory.updateOne(Thread)

exports.createThread= catchAsync(async (req, res, next) => {
    console.log(req.cookies)
        const doc=await Thread.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
})