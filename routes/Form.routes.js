const express=require('express')
const { FormModel } = require('../models/Form.model')

const formRouter=express.Router()

formRouter.post('/',async(req,res)=>{
    try {
        const {firstName,lastName,email,message}=req.body
        const form=new FormModel({firstName,lastName,email,message,time:new Date()})
        await form.save()
        res.send({message:"Form Submitted Successfully"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

formRouter.get('/',async(req,res)=>{
try {
    const forms=await FormModel.find()
    res.send(forms)
} catch (error) {
    res.status(400).send({error:error.message})
}
})

module.exports={formRouter}