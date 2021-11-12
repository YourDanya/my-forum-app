const factory= require('./handlerFactory')
Thread=require(`./../models/threadModel.js`)

exports.sendAuthor= async(req, res, next)=>{
    req.body.author=req.user.id;
    next();
}

exports.getAllThreads= factory.getAll(Thread)
exports.getThread= factory.getOne(Thread)
exports.deleteThread= factory.deleteOne(Thread)
exports.updateThread=factory.updateOne(Thread)
exports.createThread= factory.createOne(Thread)
