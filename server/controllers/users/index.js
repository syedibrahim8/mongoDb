import express from "express";
import bcrypt from "bcrypt";
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
        await userModel.create(userInput);
        res.status(200).json({msg:"User Registered Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

export default router;