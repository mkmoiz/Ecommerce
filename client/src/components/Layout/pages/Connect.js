import React from 'react'
import Layout from '../Layout'
import{BiMailSend,BiPhoneCall,BiSupport} from 'react-icons/bi'

const Connect = () => {
  return (
    <Layout>
      <div className="contactus ">
        
        
          <h1 className=" p-3 text-success text-center">CONTACT US</h1>
          <p className='para'>
            For any issues connect to us avialable 24/7
          </p>
          <p className="para">
            <BiMailSend /> : khan@ecommerceapp.com
          </p>
          <p className="para">
            <BiPhoneCall /> : 12-3456789
          </p>
          <p className="para">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      
    </Layout>
  
  )
}

export default Connect