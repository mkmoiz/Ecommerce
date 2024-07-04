import React ,{useEffect, useState}from 'react'
import Layout from '../../Layout'
import MenuofUsers from '../../MenuofUsers'
import axios from 'axios';
import toast from 'react-hot-toast';
import MenuofAdmin from './../../MenuofAdmin';
import { useAuth } from '../../../../context/Authenticate';

const Profile = () => {
//api
  const[authen,setAuthen]=useAuth()


//states
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");




  const handleSubmit=async(e)=>{
    e.preventDefault();  
   try{
    const resp=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address});
    if(resp && resp.data.success){
        toast.success(resp.data.message)//toast not working look after it instead using alert.
        alert("succesfully registered")

    }else{
        toast.error(resp.data.message)
    }
   }catch(error){
    toast.error("something went wrong")
   }
}
useEffect(()=>{
  const{name,email,phone,address}=authen?.user;
  setName(name);
  setEmail(email);
  setPhone(phone)
  setAddress(address)
})
  return (
    <Layout title={'theProfile'}>
    <div  className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col md-3'>
                <MenuofUsers/>
            </div>
            <div className='col-md-9'>
            <div className='register'>
            <h1>Profile</h1>
<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Name' 
    required />
  </div>
  <div className="mb-3">
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email' disabled
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
 
 
  <button type="submit" className="btn btn-primary">update</button>
</form>
        </div>
            </div>

        </div>
        </div> 
    </Layout>
  )
}

export default Profile