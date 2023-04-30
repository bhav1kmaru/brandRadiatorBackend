const express=require('express')
const { AdminModel } = require('../models/Admin.model')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const adminRouter=express.Router()

adminRouter.post('/register',async(req,res)=>{
    try {
        const {email,password}=req.body
        const adminCheck=await AdminModel.find({email})
        if(adminCheck.length>0){
            res.send('Admin already registered,please login')
        }else{
            const hashedPassword=await bcrypt.hash(password,5)
            const admin=new AdminModel({email,password:hashedPassword})
            await admin.save()
            res.send({message:"Admin Registered Successfully"})
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

adminRouter.post('/login',async(req,res)=>{
     const { email, password } = req.body;
     try {
       const admin = await AdminModel.find({ email });
       if (admin.length > 0) {
         bcrypt.compare(password, admin[0].password, (err, result) => {
           if (result) {
             const token = jwt.sign({ userID: admin[0]._id }, "shhhhh");
             res.send({ message: "Login Successful", token: token });
           } else {
             res.send({ message: "Wrong Credentials" });
           }
         });
       } else {
         res.send({ message: "Wrong Credentials" });
       }
     } catch (error) {
       res.send({ message: "unable to login", error: error.message });
     }
})

module.exports={adminRouter}