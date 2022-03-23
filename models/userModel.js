const mongoose=require('mongoose');
const slugify= require('slugify');
const validator= require('validator');
const bcrypt= require('bcryptjs');
const crypto= require('crypto')

const userSchema=new mongoose.Schema({
  name: {
    type: String,
    required: [true, `должно быть имя`],
    trim: true,
    maxlength: [15, 'Имя пользователя должно состоять из 15 или менее символов.'],
    minlength: [4, 'Имя пользователя должно состоять из 4 или более символов.']
  },
  myThreads: [
    {
      readPosts: Number,
      thread: {
        type: mongoose.Schema.ObjectId,
        ref: 'Thread',
      }
    }
  ],
  myReplies: {
    count:{
      type: Number,
      default: 0
    },
    replies:[
      {
        checked: {
          type: Boolean,
          default: false
        },
        post: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post'
        },
        thread: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post'
        }
      }
    ]
  },
  email: {
    type: String,
    required: [true, `должен быть email`],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'должен быть email']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'Должен быть пароль'],
    minlength: 6,
    select: false
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Должно быть подтверждение пароля'],
  //   validate: {
  //     // this only works on create or save
  //     validator: function(el) {
  //       return el ===this.password
  //     },
  //     message: 'passwords are not the same'
  //   }
  // },
  passwordChangedAt: {
    type: Date
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: Date
  },
  emailConfirmToken: {
    type: String
  },
  emailConfirmExpires: {
    type: Date
  },
  emailConfirmed: {
    type: Boolean
  },
  emailToConfirm: {
    type: String
  },
  lastUpdate: {
    type: Boolean
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  // this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function(next){
    this.find({active: {$ne: false}});
    next();
})

userSchema.methods.correctPassword=async function(candidatePassword, userPassword){
  return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter =function(JWTTimestamp) {
  if(this.passwordChangedAt){
      const changedTimeStamp= parseInt(this.passwordChangedAt.getTime()/1000, 10);
      return JWTTimestamp<changedTimeStamp;
  }

  return false;
}

userSchema.methods.createPasswordResetToken= function(){
  const resetToken= crypto.randomBytes(32).toString('hex');

  this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex').toString();

  this.passwordResetExpires= Date.now() + 10*60*1000;

  return resetToken;
}

const User=mongoose.model('User', userSchema);

module.exports= User;

