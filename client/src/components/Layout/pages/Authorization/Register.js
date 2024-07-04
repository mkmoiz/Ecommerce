import React ,{useState}from 'react'
import Layout from '../../Layout'
import  toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const[answer,setAnswer]=useState("");
    const toNavigate=useNavigate()
//Handle the submit operation
const handleSubmit=async(e)=>{
    e.preventDefault();  
   try{
    const resp=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,answer});
    if(resp && resp.data.success){
        toNavigate("/login")
        toast.success(resp.data.message)//toast not working look after it instead using alert.
        alert("succesfully registered")

    }else{
        toast.error(resp.data.message)
    }
   }catch(error){
    toast.error("something went wrong")
   }
}


  return (
    <Layout title='khanStore'>
        <div className='register'>
            <h1>Sign up</h1>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Name' 
    required />
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email'
    required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder='Password' 
    required />
  </div>
  <div className="mb-3">
    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}  className="form-control" id="exampleInputPhone" placeholder='Phone'  
    required/>
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Address'
    required/>
  </div>
  <div className="mb-3">
    <input type="text" value={answer} onChange={(e)=>setAnswer (e.target.value)} className="form-control" id="exampleInputAddress" placeholder='Name your favourite food'
    required/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>



            
        </div>

    </Layout>
    
  )
}

export default Register