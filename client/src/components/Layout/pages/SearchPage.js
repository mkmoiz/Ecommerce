import React from 'react'
import Layout from '../Layout'
import { useSearch } from '../../../context/Search'

const SearchPage = () => {
    const[text,setText]=useSearch()
  return (
    <Layout title={"result-search"}>
        <div className='container'>
            <div className='text-center'>
                <h3>Search Results</h3>
                <p>{text?.received.length<1?"Not found":`look here ${text?.received.length} ` }</p>
            </div>
            <div className='d-flex flex-wrap mt-3'>
            {text?.received.map(c=>(
                  <div className="card m-2" style={{width: '18rem'}} key={c._id}>
    <img  src={`http://localhost:4000/api/v1/content/contentImage/${c._id}`} className="card-img-top" alt={c.name} />
    <div className="card-body">
      <h5 className="card-title">{c.name}</h5>
      <p className="card-text">{c.description.substring(0, 15)}..</p>
      <p className="card-text">₹{c.price}</p>
      <button className='btn btn-primary'>Details</button>
      <button className='btn btn-secondary ms-2'>Add to cart</button>

    </div>
</div>

        
        ))}
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage