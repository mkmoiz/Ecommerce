import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuofAdmin = () => {
  return (

    <>
    <div className="text-center">
   <div className="list-group">
<h4>Admin Center</h4>
  <NavLink to="/dashboard/admin/createCategory" className="list-group-item list-group-item-action">Create Category </NavLink>
  <NavLink to="/dashboard/admin/createProduct" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>

  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
</div>
</div> 
    </>
    
  )
}

export default MenuofAdmin