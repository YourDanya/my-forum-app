const catchAsync= require('./../utils/catchAsync')
const AppError= require('./../utils/appError')
const APIFeatures=require('./../utils/apiFeatures')
const Thread=require('./../models/threadModel')
const User=require('./../models/userModel')

exports.deleteOne = Model => catchAsync( async (req, res, next) =>{
  const doc=  await Model.findByIdAndDelete(req.params.id);

  if(!doc){
    return next(new AppError('no document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  })

})

exports.updateOne = Model => catchAsync( async (req, res, next) =>{
  const doc= await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if(!doc){
    return next(new AppError('no document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })
})

exports.createOne = Model => exports.createTour= catchAsync(async (req, res, next) => {
  const doc=await Model.create(req.body);
  if(req.params.replyId){
    req.body.reply=doc._id
  }
  if(Model===Thread) req.body.thread=doc._id
    next()
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  })

})

exports.getOne= (Model, popOptions) => catchAsync( async (req, res, next) =>{

  let doc= Model===Thread? await Thread.findOne({id: req.params.id}).populate('posts') : await Model.findById(req.params.id)
  console.log(doc)

  // if(popOptions) query= query.populate(popOptions)
  // const doc= await query;

  if(!doc){
    return next(new AppError('no document found with that ID', 404));
  }

  if(Model===Thread) {
    req.body.thread = doc._id
    next()
  }

  if(Model===User){
    doc.populate({
      path: 'myThreads',
      populate: {
        path: 'Thread'
      }
    })
  }


  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  })

})

exports.getAll= Model => catchAsync( async (req, res, next) =>{

  // to allow for nested get eviews on tour
  // let filter= {}
  // if(req.params.tourId) filter ={tour: req.params.tourId}

  const doc= await Model.find().sort({id:-1});

  // if(Model===Thread) doc.sort()

  res.status(200).json({
    status:'success',
    results: doc.length,
    data: {
      data: doc
    }
  });

})

exports.like= async(req, res, next)=>{
  const user=req.user.id;
  let doc=null
  if(req.params.postNum){
    const thread=await Thread.findOne({id: req.params.id}).populate('posts')
    const post=thread.posts.find(item => item.number.toString()===req.params.postNum)
    doc=post
  } else{
    const thread=await Thread.findOne({id: req.params.id})
    doc=thread
  }

  const likeUser= doc.likes.users.find(item => {return item.toString()===req.user.id.toString()})
  let message


  if(!likeUser){
    doc.likes.count++
    doc.likes.users.push(user)

    message= req.params.postNum? `liked post with number ${req.params.postNum}` :
        `liked thread with id ${req.params.id}`

    const dislikeUser= doc.dislikes.users.find(item => {return item.toString()===req.user.id.toString()})
    if(dislikeUser){
      doc.dislikes.count--
      doc.dislikes.users.splice(doc.dislikes.users.indexOf(user), 1)
    }

  } else{
    doc.likes.count--
    const index=doc.likes.users.indexOf(user)
    doc.likes.users.splice(index, 1)
    message= req.params.postNum? `removed like from post with number ${req.params.postNum}` :
        `removed like from thread with id ${req.params.id} `
  }

  await doc.save()

  res.status(200).json({
    status: 'success',
    data: {
      data: message
    }
  })

}

exports.dislike= async(req, res, next)=>{
  const user=req.user.id;

  let doc=null
  if(req.params.postNum){
    const thread=await Thread.findOne({id: req.params.id}).populate('posts')
    const post=thread.posts.find(item => item.number.toString()===req.params.postNum)
    doc=post
  } else{
    const thread=await Thread.findOne({id: req.params.id})
    doc=thread
  }

  const dislikeUser= doc.dislikes.users.find(item => {return item.toString()===req.user.id.toString()})

  let message

  if(!dislikeUser){
    doc.dislikes.count++
    doc.dislikes.users.push(user)
    message= req.params.postNum? `disliked post with number ${req.params.postNum}` :
        `disliked thread with id ${req.params.id}`

    const likeUser= doc.likes.users.find(item => {return item.toString()===req.user.id.toString()})
    if(likeUser){
      doc.likes.count--
      doc.likes.users.splice(doc.likes.users.indexOf(user), 1)
    }

  } else{
    doc.dislikes.count--
    const index=doc.dislikes.users.indexOf(user)
    doc.dislikes.users.splice(index, 1)
    message= req.params.postNum? `removed dislike from post with number ${req.params.postNum}` :
        `removed dislike from thread with id ${req.params.id} `
  }

  await doc.save()

  res.status(200).json({
    status: 'success',
    data: {
      data: message
    }
  })
}

