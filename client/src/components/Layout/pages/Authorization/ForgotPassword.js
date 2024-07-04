import React from 'react'
import Layout from '../../Layout'
import { useState } from 'react';
import  toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../../../context/Authenticate';


const ForgotPassword = () => {


    const [email,setEmail]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [answer,setAnswer]=useState("")
    const toNavigate=useNavigate()
    // const [Authen,setAuthen]=useAuth(); not necessary
//Handle the submit operation
const handleSubmit=async(e)=>{
    e.preventDefault();  
   try{
    const resp=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgetPassword`,{email,newPassword,answer});
    if(resp && resp.data.success){
        toast.success(resp.data.message)//toast not working look after it instead using alert.
        alert(resp.data.message)
      
        toNavigate("/login")
        

    }else{
        toast.error(resp.data.message)
    }


   }catch(error){
    toast.error("something went wrong/incorrect email or answer")
   }
}




    
  return (
    <Layout title={'forgotPassword'}>
            <div className='register'>
            <h1>Reset password</h1>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
   
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email'
    required />
  </div>
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter your favourite food'
    required />
  </div>
  <div className="mb-3">
    <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder='enter the new Password' 
    required />
  </div>

  <button type="submit" className="btn btn-success">Reset</button>
</form>



            
        </div>
    </Layout>
  )
}

export default ForgotPassword