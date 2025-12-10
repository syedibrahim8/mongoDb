import express from "express";
import bcrypt from "bcrypt";
import encrypt from "../../utils/encrypt.js"
import { sendMail, otp } from "../../utils/mailer.js";
import userModel from "../../models/User/User.js";

const router = express.Router();

router.get("/getall",async (req,res)=>{
    try {
        let allUsers = await userModel.find();
        console.log(allUsers);
        res.status(200).json({users:allUsers})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/register",async (req,res)=>{
    try {
        let userInput = req.body;
        userInput.password = await bcrypt.hash(userInput.password,10);
        userInput.gender = userInput.gender.toLowerCase()
        let OTP = otp();
        userInput.otp = OTP;
        await userModel.create(userInput);
        await sendMail(
            userInput.email,
            `Welcome ${userInput.fullName}!\nGlad to have you onboard`,
            `Your account is succesfully registered with us\nyour OTP for account verification is ${OTP}`
        )
        res.status(200).json({msg:"User Registered Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.post("/validate-user",async (req,res)=>{
    try {
        let email = req.body.email
        let user = await userModel.findOne({email})
        if(!user) return res.status(400).json({msg:"User not found"})
        if(user.otp != req.body.otp) return res.status(400).json({msg:"Invalid OTP!"})
        await userModel.findOneAndUpdate({email},{$set:{isVerified:true},$unset:{otp:""}},{new:true})
        res.status(200).json({msg:"user verified"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error}) 
    }
})

router.post("/login",async (req,res)=>{
    try {
        let email = req.body.email
        let user = await userModel.findOne({email})
        if(!user) return res.status(400).json({msg:"User not found"})
        if(!user.isVerified) return res.status(400).json({msg:"Verify your account to access"})
        let pass = await bcrypt.compare(req.body.password,user.password)
        if(!pass) return res.status(400).json({msg:"Invalid Credentials"})
        let payload = {
            email
        }
        let token = await encrypt(payload);
        res.status(200).json({msg:"Login Success",token})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
})

export default router;