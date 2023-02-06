import express from 'express'
const router = express.Router()
import authJwt from '../middleware/AuthJwt.js'
import userController from '../controllers/UserController.js'

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/", userController.home)

router.post("/sifre-yenileme-talep", userController.passwordReset)
//router.post("/sifre-yenileme/:uuid?", userController)















router.get("/api/test/all", userController.allAccess);

router.get(
  "/api/test/user",
  [authJwt.verifyToken],
  userController.userBoard
);

router.get(
  "/api/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  userController.moderatorBoard
);

router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.adminBoard
);

export default router;