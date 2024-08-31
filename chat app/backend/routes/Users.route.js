const router=require('express').Router();
const getuser=require('../controlers/users.controler');
const protectedRoute=require('../middleware/protectroute.middleware')


router.route('/').get(protectedRoute,getuser);


module.exports=router;