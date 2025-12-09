import express from "express";
import dotenv from "dotenv";
import "./utils/dbConnect.js";
import userRouter from "./controllers/users/index.js"
dotenv.config();

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