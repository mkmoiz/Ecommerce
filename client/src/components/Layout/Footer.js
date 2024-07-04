import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer'>
    <div className='bg-success text-light p-3'>
    <h4 className='text-center'>&copy; moiz-khan 2024</h4>
    <p className='text-center' >
      <Link to='/connect'>Connect</Link>
      <Link to='/policy'>policy</Link>
      <Link to='/about'>about us</Link>
      
    </p>
    </div>
    </div>
  )
}

export default Footer