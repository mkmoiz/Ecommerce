import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


export const createCategoryController=async(req,res)=>{
try{
  const {name}=req.body
  if(!name){
      return  res.status(401).send({message:'Name is required'})
  }
  const existingCategory=await categoryModel.findOne({name})
    if(existingCategory){
        return res.status(200).send({
        success:true,
        message:"category already exists"
        })
    }
    const category=await new categoryModel({name, slug:slugify(name)}).save()
     res.status(200).send({
        success:true,
        message:'new category added',
        category
     })


}catch(err){
    console.log(err)
    res.status(500).send({
        success:false,
        err,
        message:"error is category"
    })
}
};

//update category controller
export const updateCategoryController=async(req,res)=>{
    try{
        const {name}=req.body
        const {id}=req.params
        const category=await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})//note third parameter is required in  order to update
        res.status(200).send({
            success:true,
            message:"category update is success",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error while updating',
            error
        })
    }
}


//to get categories
export const categoryController=async(req,res)=>{
    try{
    const  list=await categoryModel.find({})
    res.status(200).send({
        success:true,
        message:"Categories List",
        list
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }
}

//to get single category
export const singleCategoryController=async(req,res)=>{
try{
   const category=await categoryModel.findOne({slug:req.params.slug})
   res.status(200).send({
    success:true,
    message:"listing single category successfull",
    category
   })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in getting single category"
    })
}
}

//to deletle
export const deleteController=async(req,res)=>{
try{
   const {id}=req.params
   await categoryModel.findByIdAndDelete(id)
   res.status(200).send({
    success:true,
    message:'succesful deletion'
    
   })

}catch(error){
    console.log(error);
    res.status(500).send({
        success:false,
        message:"error in deletion",
        error
    })
}

}