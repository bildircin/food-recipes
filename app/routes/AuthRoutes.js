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

router.post('/uyelik',
    [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
    ],
    authController.signup
)

router.post("/signin", authController.signin);

export default router;