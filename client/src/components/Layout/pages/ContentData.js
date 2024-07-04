import React from 'react'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Layout from '../Layout'
const ContentData = () => {

    const params=useParams()
    // console.log(params)
    const[content,setContent]=useState({})
    const[similarContent,setSimilarContent]=useState([])



//to get content
    const getContent =async()=>{
        try{
     const {data}=await axios.get(`http://localhost:4000/api/v1/content/getContent/${params.slug}`)
     
     setContent(data?.content)
     getSimilarContent(data?.content?._id,data?.content?.category?._id)
    //  console.log(data)
        }catch(e){
       console.log(e)
        }
    }

    //lifecycle method to get details
useEffect(()=>{
    if(params?.slug) getContent()
},[params.slug])


//to recommend similar content
const getSimilarContent=async(cid,catId)=>{
  try{
    const {data}=await axios.get(`http://localhost:4000/api/v1/content/similar/${cid}/${catId}`)
    setSimilarContent(data?.contents)
    // console.log(data?.contents)
  }catch(error){
    console.log(error)
  }
}



  return (<Layout>
   <div className='row container mt-3'>
    <div className='col-md-6'>    
    <div className="card m-2" style={{width: '18rem', height:"12rem"}} >
  <img  src={`http://localhost:4000/api/v1/content/contentImage/${content._id}`} className="card-img-top" alt={content.name} />
  <div className="card-body">
    
  </div>
</div>
    </div>
  <div className="col-md-6 ">
    <h2>Details</h2>
   <h6 className="card-title m-1">Product:  {content.name}</h6>
    <h6 className="card-text m-1">Description:  {content.description}</h6>
    <h6 className="card-text m-1">quantity:  {content.quantity}</h6>
<h6 className="card-text m-1">Category: {content?.category?.name}</h6>
<button className='btn btn-secondary mt-2'>Add to cart</button>

<hr/>
    </div>
    <div className='m-5 '>You may like this to</div>
    <div className='flex-wrap d-flex'>
       {similarContent?.map(c=>(
                  <div className="card m-2" style={{width: '18rem'}} key={c._id}>
    <img  src={`http://localhost:4000/api/v1/content/contentImage/${c._id}`} className="card-img-top" alt={c.name} />
    <div className="card-body">
      <h5 className="card-title">{c.name}</h5>
      <p className="card-text">{c.description.substring(0, 15)}..</p>
      <p className="card-text">₹{c.price}</p>
   
      
      <button className='btn btn-secondary ms-2'>Add to cart</button>

    </div>
</div>

        
        ))} 
       </div>
   </div>
   
    </Layout>
  )
}

export default ContentData