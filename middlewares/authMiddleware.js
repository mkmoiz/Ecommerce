import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
// import { emitWarning } from 'node:process';
// import { stat } from 'node:fs';


export const requireSignIn=async(req,res,next)=>{
   try{
      const decode=JWT.verify(req.headers.authorization,process.env.JWT)//process.env.JWT, the JWT is here the secret key
      req.user=decode
      console.log(decode)
      next()  
   }catch(error){
    console.log(error)

   }

  }
  //Access to admin

  export const isAdmin=async(req,res,next)=>{
    try{
   const user=await userModel.findById(req.user._id)
    // console.log(user)
   if(user.role!==1){
    res.status(401).send({
      success:false,
      message:"Unauthorized Access"
    })
   }else{
    next();
   }
    }catch(error){
      console.log(error)
      res.status(401).send({
        success:false,
        message:"error in Admin middleware",
        error
      })
    }
    
  }
  
  

