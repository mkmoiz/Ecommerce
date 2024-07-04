import React from 'react'
import Layout from '../../Layout'
import MenuofAdmin from './../../MenuofAdmin';
import axios from 'axios';
import { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import {Link} from 'react-router-dom'

const Content = () => {
 
const[contents,setContents]=useState([])

const getAllProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/api/v1/content/getContent");
    setContents(data.contents);
  } catch (error) {
    console.log(error);
    toast.error("Someething Went Wrong");
  }
};

//lifecycle method


useEffect(() => {
  getAllProducts();
}, []);
return (
  <Layout>
    <div className="row">
      <div className="col-md-3">
        <MenuofAdmin />
      </div>
      <div className="col-md-9 ">
        <h1 className="text-center">All Products List</h1>
        <div className='d-flex'>
        {contents?.map(c=>(
          <Link className='remove-link' key={c._id} to={`/dashboard/admin/products/${c.slug}`}>
                <div className="card m-2" style={{width: '18rem'}} key={c._id}>
  <img  src={`http://localhost:4000/api/v1/content/contentImage/${c._id}`} className="card-img-top" alt={c.name} />
  <div className="card-body">
    <h5 className="card-title">{c.name}</h5>
    <p className="card-text">{c.description}</p>
  </div>
</div>

          </Link>
 
        ))}
        </div>
    
        
      </div>
    </div>
  </Layout>
);
};

export default Content;