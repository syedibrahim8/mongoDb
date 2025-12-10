import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        minlength:[18,"Minimum age is 18"],
        maxlength:[80,"Maximum age is 80"],
    },
    gender:{
        type:String,
        enum:["male","female","others"],
        required: true
    },
    isActive:{
        type:Boolean,
        default:true 
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    address:{
        type:String,
        required:true,
    },
    otp:{
        type:Number,
        default:null
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema);
export default userModel;