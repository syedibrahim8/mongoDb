import mailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const admin = process.env.EMAIL;
const pass = process.env.PASS;

async function sendMail(to,subject,text){
    try {
        const userDetails = mailer.createTransport({
            service : "gmail",
            auth:{
                user:admin,
                pass
            }
        })
        const sender = await userDetails.sendMail({
            from:admin,
            to:[to],
            subject,
            text
        })
        console.log("Email sent successfully",sender.messageId);
    } catch (error) {
       console.log(error); 
    }
}

function otp(){
    return Math.floor(Math.random()*(9999 - 1000) + 1000)
}

export { sendMail, otp };