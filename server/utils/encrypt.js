import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secKey = process.env.SECKEY

async function encrypt(payload){
    try {
        return await jwt.sign( payload, secKey, { expiresIn:"1D" })
    } catch (error) {
        console.log(error);
    }
}
export default encrypt;