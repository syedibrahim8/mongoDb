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
        enum:["Male","Female","Others"],
        required: true
    },
    isActive:{
        type:Boolean,
        default:true 
    },
    address:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

const userModel = mongoose.model("users",userSchema);
export default userModel;