



import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import toast from "react-hot-toast";
import axios from "axios";
import MenuofAdmin from "../../MenuofAdmin";
import CategoryForm from "../../../forms/CategoryForm";
import {Modal} from 'antd'





const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/category/createCategory", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somthing went wrong in input form");
    }
  };


  //upate 
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/category/updateCategory/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is updated`);
        setSelected(null);
        setUpdateName("");
        setIsModalOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/v1/category/allCategory");
      if (data.success) {
        setCategories(data.list);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  //to delete
  const handleDelete = async (id) => {
    
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/category/deleteCategory/${id}`,
        
      );
      const deletedName="Category"
      if (data.success) {
        toast.success(`${deletedName} is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };



  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuofAdmin />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((cat) => (
                    <>
                      <tr>
                        <td key={cat._id}>{cat.name}</td>
                        <td>
                          <button
                            className="btn btn-success ms-2" onClick={()=>{setIsModalOpen(true);
                            setUpdateName(cat.name); setSelected(cat)}} >
                            Edit
                          </button>
                          <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(cat._id)
                               
                          }}>delete</button>
                         
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
        <Modal onCancel={()=>setIsModalOpen(false)} footer={null}open={isModalOpen}>
            <CategoryForm value={updateName} setValue={setUpdateName} handleSubmit={handleUpdate}/>
        </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;