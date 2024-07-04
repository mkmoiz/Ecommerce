import React from 'react'
import Layout from '../Layout'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <Layout>
      <div className='pnf'>
      <h1 className='pnf-head'>404</h1>
      <h2 className='pnf-para'>sorry! page not found</h2>
      <Link to='/' className='pnf-btn'>Home</Link>
    </div>
    </Layout>

  )
}

export default NotFound