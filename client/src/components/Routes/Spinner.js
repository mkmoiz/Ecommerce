import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 



const Spinner = ({path='login'}) => {
  const navigate=useNavigate();

  const[counter,setCounter]=useState(6)
  
useEffect(()=>{
  const timer=setInterval(()=>{setCounter((previousValue)=>--previousValue)},1000)
  counter===0 &&navigate(`/${path}`)
  return()=>clearInterval(timer)
},[counter,navigate,path])

  return (
    
    <>
    <div>
    <h5 className='text-success text-center ' style={{paddingTop:'100px'}}>redirecting,please wait {counter} and login</h5> 
   </div> 
   <div className="align-items-center d-flex justify-content-center "style={{height:"40vh",}}>
   <div className="spinner-border text-success" role="status">
    <span className="visually-hidden">Loading...</span>
   </div>
</div>

    </>
  )
}

export default Spinner