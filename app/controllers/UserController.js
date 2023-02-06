import PasswordReset from "../models/PasswordReset.js";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/User.js";
import moment from "moment";
import nodemailer from "nodemailer";

const home = (req,res)=>{
    
    return res.status(200).render('UI/home')
}

const passwordReset = (req,res)=>{
    
    /* const sendEmail = req.body.sendEmail;

    User.findOne({
        where:{
            email:sendEmail
        }
    }).then(user =>{

        if(user){

            const uuid = uuidv4();
            PasswordReset.create({
                email: sendEmail,
                uuid:uuid,
                createDate: moment()
            }).then(reset => {
                
                
                
            }).catch(err => {
                res.status(500).send({isSuccess: false, message: err})
            })
        }else{
            res.status(404).send({isSuccess: false, message: "Böyle bir mail hesabı bulunamadı"})
        }
    }).catch(err =>{
        res.status(500).send({isSuccess: false, message: err})
    }) */


    
    
    
   
}

main().catch(console.error);

async function main(){
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let mailTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'bildircina34@gmail.com',
            pass: ''
        }
    });

    let info = await mailTransporter.sendMail({
        from: '"Fred Foo 👻" <bildircina34@gmail.com>', // sender address
        to: "rahmanbildircin@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });

    /*   console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); */
}


const allAccess = async (req,res)=>{
    res.status(200).send("Public Content.");
}

const userBoard = async (req,res)=>{
    res.status(200).send("User Content.");
};

const adminBoard = async (req,res)=>{
    res.status(200).send("Admin Content.");
};

const moderatorBoard = async (req,res)=>{
    res.status(200).send("Moderator Content.");
};


export default {
    home,
    passwordReset,
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard
}