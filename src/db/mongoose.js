const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false
})

/*const User = mongoose.model('User', {
    name: {
        type: String,
        required:true,
        trim:true
    },
    age: {
        type: Number,
        validate(value){
           if(value<0){
               throw new Error('Age must be a positive number')
           }
        },
        default:0
    },
    email:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        },
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain password')
            }
        }
    }
})

const me = new User({
    name:' Swathi  ',
    email:'sWathi@gmail.com ',
    password:'testing'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})*/

/*const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const taskone = new Task({
    description: 'Dont confuse'
})

taskone.save().then(() => {
    console.log(taskone)
}).catch((error) => {
    console.log(error)
})*/