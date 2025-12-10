import express from "express";
import dotenv from "dotenv";
import userRouter from "./controllers/users/index.js"
dotenv.config();
console.clear();
import "./utils/dbConnect.js";
const port = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
    try {
        res.status(200).json({msg:"Welcome"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

app.use("/users",userRouter);

app.listen(port,()=>console.log(`Server is running at http://localhost:${port}`))