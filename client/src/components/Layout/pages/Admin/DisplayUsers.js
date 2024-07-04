import React from 'react'
import MenuofAdmin from '../../MenuofAdmin'
import Layout from '../../Layout'

const DisplayUsers = () => {
  return (
    <Layout title={'dashboard-displayUsers'}>
    <div className='container-fluid m-3 p-3'> 
    <div className='row'>
        <div className='col-md-3'>
            <MenuofAdmin/>
        </div>
        <div className='col-md-9'>
            <h1>All users</h1>
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default DisplayUsers