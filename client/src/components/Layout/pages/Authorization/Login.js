import React ,{useState}from 'react'
import Layout from '../../Layout'
import  toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/Authenticate';


const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const toNavigate=useNavigate()
    const [Authen,setAuthen]=useAuth();
//Handle the submit operation
const handleSubmit=async(e)=>{
    e.preventDefault();  
   try{
    const resp=await axios.post("http://localhost:4000/api/v1/auth/login",{email,password});
    if(resp && resp.data.success){
        toast.success(resp.data.message)//toast not working look after it instead using alert.
        alert(resp.data.message)
        setAuthen({
            ...Authen,
            user:resp.data.user,
            token:resp.data.token
        })
        localStorage.setItem('Authen',JSON.stringify(resp.data))
        toNavigate("/")
        

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
            <h1>Sign in</h1>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
   
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email'
    required />
  </div>
  <div className="mb-3">
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" id="exampleInputPassword1" placeholder='Password' 
    required />
  </div>
 <div>
  <button type="forgetPassword" className="btn btn-success " onClick={()=>{toNavigate("/forgotPassword")}}>forget password</button>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
</form>



            
        </div>

    </Layout>
    
  )
}

export default Login