const ROLES = ["user", "admin", "moderator"];
import User from "../models/User.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  await User.findOne({
    where: {
        userName: req.body.userName
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
            isSuccess: false,
            message: "Kullanıcı adı başka biri tarafından kullanılıyor!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
            isSuccess: false,
            message: "Email başka biri tarafından kullanılıyor!"
        });
        return;
      }

      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
            isSuccess: false,
            message: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

export default verifySignUp;