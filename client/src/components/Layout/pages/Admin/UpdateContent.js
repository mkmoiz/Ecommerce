import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import MenuofAdmin from "../../MenuofAdmin";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate,useParams} from "react-router-dom";


const { Option } = Select;

const UpdateContent = () => {
        
    const params=useParams();
        const navigate = useNavigate();
        const [categories, setCategories] = useState([]);
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState("");
        const [quantity, setQuantity] = useState("");
        const [shipping, setShipping] = useState("");
        const [image, setPhoto] = useState("");
        const[id,setId]=useState("");
        


        //to get single product
        const getSingleProduct=async()=>{
            try{
             const {data}=await axios.get(`http://localhost:4000/api/v1/content/getContent/${params.slug}`)
             
                // console.log(data);
                setName(data.content.name)
                setId(data.content._id)
                setDescription(data.content.description)
                setQuantity(data.content.quantity)
                setPrice(data.content.price)
                setShipping(data.content.shipping)
                setCategory(data.content.category._id)
             
            }catch(error){
                console.log(error)
                toast.error("error in accessing the product")
            }
        }



        //get all category
        const getAllCategory = async () => {
          try {
            const { data } = await axios.get("http://localhost:4000/api/v1/category/allCategory");
            if (data?.success) {
              setCategories(data?.list);
            }
          } catch (error) {
            console.log(error);
            toast.error("error in getting catgeory");
          }
        };

        useEffect(()=>{
            getSingleProduct()
           
        },[])
      
        useEffect(() => {
          getAllCategory();
        }, []);
      
        //create product function
        const handleUpdate = async (e) => {
          e.preventDefault();
          try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
           image && productData.append("image", image);
            productData.append("category", category);
            const { data } = await axios.put(
              `http://localhost:4000/api/v1/content/updateContent/${id}`,
              productData
            );if(data?.success){
            alert("product updation success")
            toast.success(data?.message)
            navigate("/dashboard/admin/products")
      
      
            }else{
               toast.error("product updation unsuccess")
        
            }
            }catch(err){
              console.log(err)
              toast.error("error in product updation")
            }
          }

//to delete
const handleDelete=async()=>{
    try{
    const {data}=await axios.delete(`http://localhost:4000/api/v1/content/deleteContent/${id}`)
    if(data?.success){
        console.log(data?.message)
        alert("succesful deletion")
        toast.success("succesful deletion")
        navigate("/dashboard/admin/products")
    }else{
        console.log("unsuccess")
        toast.error("not successful deletion")
    }

    }catch(error){
        console.log(error)
        toast.error("deletion unsuccess")
    }
}

  return (
    <Layout title={"Dashboard - update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <MenuofAdmin />
          </div>
          <div className="col-md-9">
            <h1>update Product</h1>
            <div className="m-1 w-75">
              <Select
                variant={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value)
                }} 
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload Photo"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                    //   loading="lazy"
                      src={`http://localhost:4000/api/v1/content/contentImage/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  variant={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }} value={shipping?"yes":"no"}
                  
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
  


export default UpdateContent