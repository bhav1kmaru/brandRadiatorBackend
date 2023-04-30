const mongoose=require('mongoose')

const formSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
    time:{type:Date,required:true},
})

const FormModel=mongoose.model('Form',formSchema)

module.exports={FormModel}