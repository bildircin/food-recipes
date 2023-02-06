import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";
import User from "../models/User.js";
import { Op, QueryTypes } from "sequelize"
import db from "../../db.js";

const verifyToken = (req, res, next) => {
  let token = req.cookies["usr-auth"];

  if (!token) {
    return res.status(403).send({
        isSuccess: false,
        message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        isSuccess: false,
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(async user => {

    const roles = await db.query("SELECT * FROM user_roles inner join roles on user_roles.userId = roles.id WHERE user_roles.userId = " + user.id, { type: QueryTypes.SELECT });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        isSuccess: false,
        message: "Require Admin Role!"
      });
      return;
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(async user => {

    const roles = await db.query("SELECT * FROM user_roles inner join roles on user_roles.userId = roles.id WHERE user_roles.userId = " + user.id, { type: QueryTypes.SELECT });

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        isSuccess: false,
        message: "Require Moderator Role!"
      });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(async user => {

    const roles = await db.query("SELECT * FROM user_roles inner join roles on user_roles.userId = roles.id WHERE user_roles.userId = " + user.id, { type: QueryTypes.SELECT });
    
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        isSuccess: false,
        message: "Require Moderator or Admin Role!"
      });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
export default authJwt;