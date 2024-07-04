import React from 'react'
import Layout from '../../Layout'
import { useAuth } from '../../../../context/Authenticate'
import MenuofUsers from '../../MenuofUsers'




const DashBoard = () => {
  const[authen]=useAuth()
  return (<>
    <Layout title={"userDashboard"}>
    <div  className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col md-3'>
                <MenuofUsers/>
            </div>
            <div className='col-md-9'>
              <h3>Name:{authen?.user?.name}</h3>
              <h3>email:{authen?.user?.email}</h3>
              <h3>address:{authen?.user?.address}</h3>

            </div>
        </div>
        </div>
    </Layout>
    </>
  )
}

export default DashBoard