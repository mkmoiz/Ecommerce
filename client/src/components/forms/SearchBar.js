import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const SearchBar = () => {
const navigate=useNavigate() 

  const[text,setText]=useSearch()
  
  //  console.log(text)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/content/search/${text.keyword}`
      );
      console.log(data)
      setText({ ...text, received: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={text.keyword}
          onChange={(e) => setText({ ...text, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};


export default SearchBar