import { Op, QueryTypes } from "sequelize"
import config from "../config/auth.config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import User from "../models/User.js"
import UserRole from "../models/UserRole.js"
import db from "../../db.js"
import moment from "moment/moment.js"
import app from "../../app.js"
import svgCaptcha from "svg-captcha"
import UserGender from "../models/UserGender.js"

const signupAjax = async (req, res) => {
  // Save User to Database

    const {firstName, surName, userName, email, password, gender, captcha} = req.body

    let nowDate = moment()

    if(!req.session.captcha){
      return res.status(404).send({isSuccess:false, message:"Captcha kodunu yenileyip tekrar deneyiniz!" });
    }
    if(req.session.captcha && req.session.captcha != captcha){
      return res.status(404).send({isSuccess:false, message:"Captcha kodu hatalı, lütfen tekrar deneyiniz!" });
    }

    await User.create({
        userGenderId:gender,
        firstName,
        surName,
        userName,
        email,
        active: true,
        createdByUserID: null,
        createdDate: nowDate,
        modifiedByUserID: null,
        modifiedDate: nowDate,
        password: bcrypt.hashSync(password, 8)
    })
    .then(user => {
        // user role = 1
        UserRole.create({
            roleId: 1,
            userId: user.id,
            createdByUserID: null,
            createdDate: nowDate,
            modifiedByUserID: null,
            modifiedDate: nowDate,
        }).then(() => {
          res.send({isSuccess:true, message: "Kaydınız başarıyla oluşturuldu!" });
        })
        .catch(err => {
            res.status(500).send({isSuccess:false, message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({isSuccess:false, message: err.message });
    });
};

const signinAjax = async (req, res) => {

  await User.findOne({
    where: {
        userName: req.body.userName
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({isSuccess:false, message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
    
      if (!passwordIsValid) {
        return res.status(401).send({
            isSuccess:false,
            accessToken: null,
            message: "Invalid Password!"
        });
      }

      let getToken = req.cookies["usr-auth"];
      let token = getToken;

      if(!getToken){
          token = jwt.sign({user:{
            id:user.id,
            userName: user.userName,
            firstName: user.firstName,
            surName: user.surName
          }}, config.secret, {
            expiresIn: 86400 // 24 hours
          });
      }

      var authorities = [];
      const roles = await db.query("SELECT * FROM user_roles inner join roles on user_roles.userId = roles.id WHERE user_roles.userId = " + user.id, { type: QueryTypes.SELECT });
      
      for (let i = 0; i < roles.length; i++) {
          authorities.push(roles[i].name.toUpperCase());
        }
      roles.forEach(item => {
          res.cookie("usr-auth", token)
          res.status(200).send({
            isSuccess: true,
            message: "Giriş Başarılı",
            id: user.id,
            userName: user.userName,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
      });
     
    })
    .catch(err => {
      res.status(500).send({ isSuccess: false, message: err.message });
    });
};

const logout = async (req,res) => {
    app.locals.user = null;
    res.clearCookie("usr-auth")
    res.redirect("/")
}

const signin = async (req,res) => {

  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  const userGenders = await UserGender.findAll()
  
  res.status(200).render("UI/login", {captcha:captcha, userGenders:userGenders})
}

const captchaReset = async (req,res) => {

  var captcha = svgCaptcha.create();
  req.session.captcha = captcha.text;

  res.status(200).send({isSuccess:true, captcha:captcha.data})
}

export default {
  signin,
  signinAjax,
  logout,
  signupAjax,
  captchaReset
}