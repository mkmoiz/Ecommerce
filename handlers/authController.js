import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";
// import { testController } from './authController';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    //validations 
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "answer  is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role:user.role
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// export const loginController =async(req,res)=>{
//   try{
//     const{email,password}=req.body
//     if(!email || !password){
//       return res.status(404).send({
//         success:false,
//         message:'invalid email or password'
//       })
//     }
//   //check if user is not registered
//    const user = await userModel.findOne({email});
//    if(!user){
//      return res.status(404).send({
//       success:false,
//       message:"user is not registered"
//      })
//    }
//    //compare the pass
//      const theMatch= await comparePassword(password,user.password)
//       if(!theMatch){
//           res.status(200).send({
//           success:false,
//           message:"Entered wrong password"
//           });
//       }
//     //token jwt
//     const token = JWT.sign({_id:user._id},process.env.JWT,{expiresIn:"7d"});

//     res.status(200).send({
//       success:true,
//       message:"successfully logged in",
//       user:{
//         name:user.name,
//         email:user.email,
//         phone:user.phone,
//         address:user.address
//       },token
//     })
//   }catch(error){
//    console.log(error)
//    res.status(500).send({
//     success:false,
//     message:'error in login',
//     error
//    })


//   }

// }

//test controller
export const testController=async(req,res)=>{
  try{
     console.log("protected")
     res.send("protectected")
  }catch(error){
    console.log(error)
  }
}


//getNewPassword controller
  
export const getNewPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "incorrect email or password",
      error,
    });
  }
};











// export const getNewPasswordController=async(req,res)=>{
//   try{
//     const[email,answer,newPassword]=req.body
//     if(!email){
//       res.status(400).send({message:"email is required"})
//     }
//     if(!answer){
//       res.status(400).send({message:"answer is required"})
//     }
//     if(!newPassword){
//      res.status(400).send({message:"newPassword is required"})
//     }
    
//     //check user either exists or not
//   const user=await findOne({email,answer})
//   //now validate it
//   if(!user){
//     res.status(404).send({
//       success:false,
//       message:"incorrect email or pass"
//     })
//   }

//   const newHashedPassword=await hashPassword(newPassword);
//   await userModel.findByIdAndUpdate(user._id,{password:newHashedPassword})
//   res.status(200).send({
//     success:true,
//     message:"new password updated successfully"
//   })
//   }catch(err){
//     console.log(err)
//     res.status(500).send({
//       success:false,
//       message:"something went wrong",
//       err
//     })
//   }


// }ex