import React from 'react'
import Layout from '../Layout'
import { useCart } from '../../../context/AddToCart'
import { useAuth } from '../../../context/Authenticate'
import { useNavigate } from 'react-router-dom'
// import { Checkbox } from 'antd';

const AddToCardPage = () => {
  const navigate=useNavigate()
  const [cart,setCart]=useCart()
  const [authen,useAuthen]=useAuth()

  
  // cart.forEach(element => {
  //   console.log(element._id)
  // })

  const removeFromCart=(cid)=>{
    try{
      var yourCart=[...cart];
      var index=yourCart.findIndex((i)=>i._id===cid)
      yourCart.splice(index,1);
      setCart(yourCart)
      localStorage.setItem('cart',JSON.stringify(yourCart))

    }catch(e){
      console.log(e)
    }
    }

   
 const totalCost=()=>{
  var total =0
  cart?.map(item =>{total=total+item.price})
  return total.toLocaleString("en-IN",{
    style:'currency',
    currency:'INR'

  })
 }
  
  return (

<Layout>
    <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-3'>
              {`Hi ${authen?.token && authen?.user?.name}`}
            </h1>
            <h5 className='text-center'>
              {`you have ${cart.length } products in your cart ${authen?.token?"":"please login to proceed"} `}
             </h5>
          </div>
          <div className="row">
          <div className="col-md-6">
            {cart?.map((c) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`http://localhost:4000/api/v1/content/contentImage/${c._id}`}
                    className="card-img-top"
                    alt={c.name}
                    style={{height:"130px",width:"100px"}}
                    

                  />
                </div>
                <div className=" col-md-8" >
                  <p >{c.name}</p>
                  <p>{c.description.substring(0, 30)}</p>
                  <p>Price : {c.price}</p>
              <button className='btn btn-danger' onClick={()=>{
                removeFromCart(c._id)
              }}>remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h2>Total:{totalCost()}</h2>
            </div>

        </div>
    </div>
    </div>
</Layout>  )
}

export default AddToCardPage




