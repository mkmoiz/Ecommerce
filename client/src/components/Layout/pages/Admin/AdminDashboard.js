import React from 'react'
import Layout from '../../Layout'
import MenuofAdmin from '../../MenuofAdmin'
import { useAuth } from '../../../../context/Authenticate'

const AdminDashboard = () => {
    const [authen]=useAuth()
  return (
    <Layout>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-3'>
                    <MenuofAdmin/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75 p-3'>
                        <h4>AdminName:{authen?.user?.name}</h4>
                        <h4>AdminEmail:{authen?.user?.email}</h4>
                        <h4>AdminPhone:{authen?.user?.phone}</h4>

                </div>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard