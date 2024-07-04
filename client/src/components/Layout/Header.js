import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import { useAuth } from '../../context/Authenticate'
import {toast} from 'react-hot-toast'
import SearchBar from '../forms/SearchBar'
import { Badge } from 'antd'
// import {MdLocalGroceryStore} from 'react-icons/md';
import { useCart } from '../../context/AddToCart'

const Header = () => {
  const[cart]=useCart()//   destructuring globalized hook
  // console.log(cart)

   const[Authen,setAuthen]=useAuth()
   const handleSignOut=()=>{
       setAuthen({
        ...Authen,
        user:null,
        token:'',
       })
      localStorage.removeItem('Authen')
      toast.success("Logout successful")//not working maybe problem in node modules using alert instead look at last
      alert("Logout successful")
   }


  return (
  <>
 <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/"  className="navbar-brand" href="#">🛍️Khan's store</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchBar/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link " aria-current="page" href="#">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/category" className="nav-link " aria-current="page" href="#">Category</NavLink>
        </li>
       { !Authen.user?
       (<> <li className="nav-item">
       <NavLink to="/register" className="nav-link" >Sign up</NavLink>
     </li>
     <li className="nav-item">
       <NavLink to="/login" className="nav-link" >Login</NavLink>
     </li> </>):
       (<>
     <li className="nav-item dropdown">
  <NavLink  className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {Authen?.user?.name}
  </NavLink >
  <ul className="dropdown-menu">
    <li><NavLink to={`/dashboard/${Authen?.user?.role===1?"admin":"user"}`}  className="dropdown-item" >Dashboard</NavLink ></li>
    <li className="nav-item">
       <NavLink className="dropdown-item" onClick={handleSignOut} to="/login" >Logout</NavLink>
     </li>
  </ul>
</li>

     
     
       </>) }
        <li className="nav-item">

          <NavLink to="/cart" className="nav-link"  >
          <Badge count={cart?.length} showZero style={{background:"green",size:"10px"}}>

            🛒
            </Badge>
            </NavLink>
        </li>
      </ul>
      {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
    </div>
  </div>
</nav>

  </> 
  )
}

export default Header