import express from "express";
import {
  registerController,
  loginController,
  testController,
  getNewPasswordController
  // forgotPasswordController
} from "../handlers/authController.js";
import {  requireSignIn,isAdmin} from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test",requireSignIn, isAdmin,testController);
   
//protected routes for user authentication
router.get("/userAuth",requireSignIn,(req,res)=>{
  res.status(200).send({ok:true})
})

//protected routes for admin authentication
router.get("/adminAuth",requireSignIn,isAdmin,(req,res)=>{
  res.status(200).send({ok:true})
})

//getNewpassword
router.post("/forgetPassword",getNewPasswordController)




export default router;
