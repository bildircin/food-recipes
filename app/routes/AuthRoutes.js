import express from 'express'
const router = express.Router()
import verifySignUp from '../middleware/VerifySignUp.js';
import authController from '../controllers/AuthController.js'


router.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/giris", authController.signin)
router.post("/signinAjax", authController.signinAjax);
router.get("/cikis", authController.logout);
router.post("/captcha-reset", authController.captchaReset);
router.post('/uye-ol',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signupAjax
)


export default router;