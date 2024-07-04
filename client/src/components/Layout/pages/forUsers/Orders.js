import React from 'react'
import Layout from '../../Layout'
import MenuofUsers from '../../MenuofUsers'

const Orders = () => {
  return (
    <Layout title={'theOrders'}>
    <div  className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col md-3'>
                <MenuofUsers/>
            </div>
            <div className='col-md-9'>Orders</div>
        </div>
        </div> 
    </Layout>

  )
}

export default Orders