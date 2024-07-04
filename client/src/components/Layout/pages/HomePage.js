import React,{useState,useEffect} from 'react'
import Layout from '../Layout'
import axios from 'axios'
import { Checkbox,Radio } from 'antd'
import { Amount } from '../../Amount'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../../context/AddToCart'
import toast from 'react-hot-toast'

const HomePage = () => {
  const navigate=useNavigate()
  const[cart,setCart]=useCart();




    const [content,setContent]=useState([]);
    const[check,setCheck]=useState([]);
    const[radio,setRadio]=useState([]);
    const[categories,setCategories]=useState([]);
    const [total,setTotal]=useState(0)
    const[page,setPage]=useState(1)
    const[load,setLoad]=useState(false)





  // console.log(authenticate)  used earlier to view authentication login 

  // to get categories
  const toGetCategories=async()=>{
      try{
         const {data}=await axios.get("http://localhost:4000/api/v1/category/allCategory")
         setCategories(data?.list)
      }catch(error){
        console.log(error)
      }
  }
//lifecycle method
useEffect(()=>{
  toGetCategories()
},[])

// to get the content
const togetContent=async()=>{
  try{
    setLoad(true)
    const {data}=await axios.get(`http://localhost:4000/api/v1/content/contentList/${page}`)
    setLoad(false)
    setContent(data?.contents)
  }catch(error){
    setLoad(false)
    console.log(error)

  }
}


  //get limited content
  const getTotal=async()=>{
    try{
    const {data}=await axios.get("http://localhost:4000/api/v1/content/limitedContent")
    setTotal(data?.total)
    }catch(error){
      console.log(error)
    }
  }

//to work on load button
const loadOn=async()=>{
  try{
setLoad(true)
const {data}=await axios.get(`http://localhost:4000/api/v1/content/contentList/${page}`)
    setLoad(false)
    setContent([...content,...data?.contents])
    
  }catch(error){
    setLoad(false)
    console.log(error)
  }
}


  
// lifecylce
useEffect(()=>{
  if(page===1){
    return;
  }
  loadOn()
    // eslint-disable-next-line

},[page])



useEffect(()=>{
  getTotal()

},[])


//handle the checkbox 

const handleFilter = (value, id) => {
  let all = [...check];
  if (value) {
    all.push(id);
  } else {
    all = all.filter((c) => c !== id);
  }
  setCheck(all);
};







//lifecycle
useEffect(()=>{
  if(!check.length || !radio.length) togetContent()
  
  // console.log(content)
  // eslint-disable-next-line
},[check.length,radio.length])

useEffect(()=>{
  if(check.length || radio.length) toGetFilter()
  // eslint-disable-next-line

},[check,radio])

  const toGetFilter = async () => {
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/content/contentFilter", {
        check,
        radio,
      });
      setContent(data?.contents);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <Layout title={"All products"}>
      <div className='container-fluid mt-3 row'>
    <div className='col-md-3'>
     <h6 className='text-center'>Filter by category</h6>
     <div className='d-flex flex-column'>
      {categories?.map(cat=>(
        <Checkbox key={cat._id} onChange={(e)=>handleFilter(e.target.checked,cat._id)} >{cat.name}</Checkbox>
      ))}
     </div>
     <h6 className='text-center'>Filter by category</h6>
     <div className='d-flex flex-column'>
      <Radio.Group onChange={e=>setRadio(e.target.value)}>{
        Amount.map((a)=>(
          <div key={a.id}>
          <Radio value={a.range}>{a.name}</Radio>
          </div>
        ))
        }</Radio.Group>
     </div>
     <div className='d-flex flex column'>
      <button className="btn btn-success m-4" onClick={()=>window.location.reload()}>Reset</button>
     </div>
    </div>
      <div className='col-md-9'>
      {/* {JSON.stringify(radio,null,4)} */}

       <h1 className='text-center'>All product</h1>
       <div className='flex-wrap d-flex'>
       {content?.map(c=>(
                  <div className="card m-2" style={{width: '18rem'}} key={c._id}>
    <img  src={`http://localhost:4000/api/v1/content/contentImage/${c._id}`} className="card-img-top" alt={c.name} />
    <div className="card-body">
      <h5 className="card-title">{c.name}</h5>
      <p className="card-text">{c.description.substring(0, 15)}..</p>
      <p className="card-text">₹{c.price}</p>
      <button className='btn btn-primary' onClick={()=>{
         navigate(`/content/${c.slug}`)
      }}>Details</button>
      <button className='btn btn-secondary ms-2' onClick={()=>{
        
     setCart([...cart,c])
     localStorage.setItem('cart',JSON.stringify([...cart,c]))
     toast.success("Added to cart") }}>Add to cart</button>

    </div>
</div>

        
        ))}
       </div>
       <div>
        <div className='m-3 p-4'>
          {content && content.length< total && (
            <button className='btn btn-warning' onClick={(e)=>{
              e.preventDefault()
              setPage(page+1);
            }}>{load?"Loading..":"Loadmore"}</button>
          )}

        </div>
       </div>
    </div>
    </div>
    </Layout>
    
    </>
      
  )
}

export default HomePage;





