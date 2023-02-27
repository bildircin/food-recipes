import { Op, QueryTypes } from "sequelize"
import PasswordReset from "../models/PasswordReset.js";
import { v4 as uuidv4 } from 'uuid';
import User from "../models/User.js";
import moment from "moment";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport" ;
import db from "../../db.js";
import Role from "../models/Role.js";
import UserGender from "../models/UserGender.js";
import bcrypt from "bcryptjs";

const home = (req,res)=>{
    return res.status(200).render('UI/home')
}

const passwordReset = async (req,res)=>{
    
    const sendEmail = req.body.sendEmail;

    User.findOne({
        where:{
            email:sendEmail
        }
    }).then(user =>{

        if(user){

            const uuid = uuidv4();

            PasswordReset.destroy({
                where:{
                    email:sendEmail
                }
            }).then(item=>{

                PasswordReset.create({
                    email: sendEmail,
                    uuid: uuid,
                    createdDate: moment()
                }).then(async reset => {
                    
                    let mailTransporter = nodemailer.createTransport(smtpTransport({
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        auth: {
                            user: 'bildircina34@gmail.com',
                            pass: 'wpwzxfanplvfmmni'
                        }
                    }))
    
                    let info = mailTransporter.sendMail({
                        from: '"Enfesto.net" <bildircina34@gmail.com>',
                        to: sendEmail,
                        subject: "Sayın ",
                        text: "Şifre Yenileme Talebi",
                        html: "<p>Sayın " + user.firstName + ", <br /> Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayınız.</p><br /><a href='https://localhost:3000/sifre-yenileme/" + uuid + "'> https://localhost:3000/sifre-yenileme/" + uuid + " </a>",
                      }, function(err, data) {
                        if(err) {
                            console.log(err);
                            res.status(500).send({isSuccess: false, message: err.code && err.code == "EENVELOPE" ? "Mail adresiniz geçersiz" : ( err.code ? err.code : "Mail gönderilemedi sayfayı yenileyip tekrar deneyiniz")})
                        } else {
                            res.status(200).send({isSuccess: true, message: "Mail Adresinize Yenileme Linki Başarıyla Gönderildi"})
                        }
                    })
                    
                }).catch(err => {
                    res.status(500).send({isSuccess: false, message: err})
                })
            }).catch(err=>{
                res.status(500).send({isSuccess: false, message: err})
            })
        }else{
            res.status(404).send({isSuccess: false, message: "Böyle bir mail hesabı bulunamadı"})
        }
    }).catch(err =>{
        res.status(500).send({isSuccess: false, message: err})
    })
}

const passwordResetEntry = async (req,res) => {

    const uuid = req.params.uuid;
    console.log(uuid)
    const passwordReset = await PasswordReset.findOne({
        where:{
            uuid:uuid
        }
    })

    if (passwordReset) {
        res.render("UI/passwordResetEntry", {uuid:uuid})
    }else{
        res.status(404).render("UI/invalidPasswordUrl")
    }
}

const passwordResetAjax = async (req,res) => {

    const {password, password2, uuid} = req.body;

    if(password != password2){
        res.send({isSuccess:false, message:"Lütfen şifre tekrarını aynı giriniz!"})
    }

    const t = await db.transaction()

    try {
        const passwordReset = await PasswordReset.findOne({
            where:{
                uuid:uuid
            }
        }, {transaction: t})

        if (passwordReset) {
            await User.update({
                password: bcrypt.hashSync(password, 8)
            },{
                where:{
                    email:passwordReset.email
                }
            }, { transaction: t})

            await PasswordReset.destroy({
                where:{
                    uuid:uuid
                }
            }, {transaction: t})

            await t.commit()
            await res.status(200).send({isSuccess:true, message:"Şifre başarıyla yenilendi"})
        }else{
            await res.status(404).send({isSuccess:false, message:"Link bulunamadı, lütfen yeni şifre yenileme talebi oluşturunuz."})
        }
    } catch (error) {
        await t.rollback()
        await res.send({isSuccess:false, message:"Bir Hata oluştu, sayfayı yenileyip tekrar deneyiniz."})
    }
}




//admin processes
const users = async (req,res) => {
    res.locals.title = "Kullanıcılar"
    const users = await db.query("SELECT *, roles.name as roleName FROM users inner join user_roles on users.id = user_roles.userId " + 
    "inner join roles on user_roles.roleId = roles.id", { type: QueryTypes.SELECT });

    res.render("admin/users", {layout:"admin/layout", users})
}

const usersAjax = async (req,res) => {
    
    res.locals.title = "Kullanıcılar"
/*     const { draw } = req.query

    const users = await User.findAll({
        where:{
            isDeleted:false
        }
    }) */
    
    let list = {
        "draw": 2,
        "recordsTotal": 10,
        "recordsFiltered": 10,
        "data": [
            [
                "Charde",
                "Marshall",
                "Regional Director",
                "San Francisco",
                "16th Oct 08",
                "$470,600"
            ]
        ]
    }

    if (req.query.draw == 1) {
        list = {
            "draw": req.query.draw,
            "recordsTotal": 1,
            "data": [
              [
                112,
                "Satou",
                "Accountant",
                "Tokyo",
                "28th Nov 08",
                "$162,700"
              ]
            ]
          }
    }else{
        list = {
            "draw": req.query.draw,
            "recordsTotal": 1,
            "data": [
              [
                113,
                "aaa",
                "Accountant",
                "Tokyo",
                "28th Nov 08",
                "$162,700"
              ]
            ]
          }
    }
    res.json(list)
}

const userUpdate = async (req,res) => {

    const id = req.params.id;
    const users = await db.query("SELECT *, roles.name as roleName FROM users inner join user_roles on users.id = user_roles.userId " + 
    "inner join roles on user_roles.roleId = roles.id WHERE users.id=" + id, { type: QueryTypes.SELECT, bind:["active"] });
    const roles = await Role.findAll()
    const userGenders = await UserGender.findAll()
    
    const user = users.length > 0 ? users[0] : {}
    
    res.locals.title = user.userName + " Güncelleme"
    res.render("admin/userUpdate", {layout:"admin/layout", user, roles, userGenders})
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
    users,
    usersAjax,
    userUpdate,
    passwordResetEntry,
    passwordResetAjax,

    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard
}