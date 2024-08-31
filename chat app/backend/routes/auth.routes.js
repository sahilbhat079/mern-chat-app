const express= require('express');
const router=express.Router();
const {loginController,signupController,logoutcontroller}=require('../controlers/auth.controler')



router.route("/signup").post(signupController);



router.route("/login").post(loginController);



router.route("/logout").post(logoutcontroller);





module.exports = router;