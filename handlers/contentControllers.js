import { privateDecrypt } from "crypto"
import productModel from "../models/productModel.js"
import fs, { symlink } from 'fs'
import slugify from "slugify"

export const createContentControllers=async(req,res)=>{
    try{
        console.log(req.fields)
        const {name,slug,description,price,category,quantity,shipping}=req.fields//fields is used because we are using express-formidable
        const {image} =req.files
        //validation
       if(!name){
        return res.status(500).send({message:"name is required"})
        }
        if(!description){
            return res.status(500).send({message:"description is required"})
            }
            if(!price){
                return res.status(500).send({message:"price is required"})
                }
                if(!category){
                    return res.status(500).send({message:"category is required"})
                    }
                    if(!quantity){
                        return res.status(500).send({message:"quantity required"})
                        }
                        if(image && image.size>10000000){
                            return res.status(500).send({message:"image is required and should be less than 1mb"})
                            }
     const contents=new productModel({...req.fields,slug:slugify(name)})
    if(image){
        contents.image.data=fs.readFileSync(image.path)
        contents.image.contentType=image.type
    }

    await contents.save()
    res.status(201).send({
        success:true,
        message:"product creation success",
        contents
    })
    



    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in creating content or product;"
        })
    }
}

//to get the contents
export const getContentController=async(req,res)=>{
try{
    const contents=await productModel.find({}).populate('category').select("-image").limit(12).sort({createdAt:-1})
    res.status(200).send({

        success:true,
        totalProducts:contents.length,
        message:"The contents",
        contents
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error in getting contents",
        error
    })
}
}


//to get single product
export const getSingleContentController=async(req,res)=>{
try{
    const content=await productModel.findOne({slug:req.params.slug}).select("-image").populate("category")
    res.status(200).send({
        success:true,
        message:"success in accesing single product",
        content
    })
}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:"error while accesing product",
        error
    })
}
}

//to get image
export const contentImageController=async(req,res)=>{
  try{
  const content=await productModel.findById(req.params.cid).select("image")
  if(content.image.data){
    res.set("Content-type",content.image.contentType)
    return res.status(200).send(content.image.data)
  }
  }catch(error){
    console.log(error)
    res.status(500).send({
        success:true,
        message:"error in accesing the image",
        error
    })
  }
}

//to delete
export const deleteContentController=async(req,res)=>{
    try{
    await productModel.findByIdAndDelete(req.params.cid).select("-image")
    res.status(200).send({
        success:true,
        message:"success in deletion"
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in deletion",
            error

        })
    }

    
}

//to update
export const updateContentController = async (req, res) => {
    try {
        
      const {name, description, price, category, quantity, shipping } =
        req.fields;
      const { image } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !price:
          return res.status(500).send({ error: "Price is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !quantity:
          return res.status(500).send({ error: "Quantity is Required" });
          case image && image.size > 10000000:
            return res
              .status(500)
              .send({ error: "image is Required and should be less then 1mb" });
        }
    
        const contents = await productModel.findByIdAndUpdate(
          req.params.cid,
          { ...req.fields, slug: slugify(name) },
          { new: true }
        );
        if (image) {
          contents.image.data = fs.readFileSync(image.path);
          contents.image.contentType = image.type;
        }
        await contents.save();
        res.status(201).send({
          success: true,
          message: "Product Updated Successfully",
          contents,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Updtion of product",
        });
      }
    }

  //to filter
  export const contentFilterController=async(req,res)=>{
 
  
    try {
      const { check, radio } = req.body;
      let arguements = {};
      if (check.length > 0) arguements.category = check;
      if (radio.length) arguements.price = { $gte: radio[0], $lte: radio[1] };
      

      const contents = await productModel.find(arguements);
      res.status(200).send({
        success: true,
        contents,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error in Filtering Products",
        error,
      });
    }

  }

  //limited content controller
  export const limitedContentController=async(req,res)=>{
    try{
    const total=await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success:true,
      message:"success",
      total

    })
    }catch(error){
      console.log(error)
      res.status(400).send({
        success:false,
        message:"error in accessing limited conten"
      })
    }
  }

  //content list on page
  export const contentListController=async(req,res)=>{
    try{
  const forOneContent=6
  const page=req.params.page?req.params.page:1
   const contents =await productModel.find({}).select("-image").skip((page-1)*forOneContent).limit(forOneContent).sort({createdAt:-1})
   res.status(200).send({
    success:true,
    message:"success in limiting the content",
    contents
   })
    }catch(error){
     console.log(error),
     res.status(400).send({
      success:true,
      message:"error in page control",
      error
     })
    }
 


  }


  //search controlller
  export const contentSearchController=async(req,res)=>{
    try{
      console.log(req.params)
      const {keyword}=req.params
      const received=await productModel.find({
        $or :[
          {name:{$regex:keyword,$options:"i"}},
          {description:{$regex:keyword,$options:"i"}}


        ]
      }).select("-image")
      res.json(received)

      
    }catch(error){
      console.log(error)
      res.status(400).send({
        success:false,
        message:"error in searching",error
      })
    }

  }


  //similar content controller
export const similarContentController=async(req,res)=>{
  try {
    const { cid, catId } = req.params;
    const contents = await productModel
      .find({
        category: catId,
        _id: { $ne: cid },
      })
      .select("-image")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      contents,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
}