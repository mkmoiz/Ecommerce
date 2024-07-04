import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteController, singleCategoryController, updateCategoryController } from "../handlers/CategoryController.js";


//routes for creating category
const router=express.Router()
router.post('/createCategory',requireSignIn,isAdmin,createCategoryController)


//route for updating category
router.put('/updateCategory/:id',requireSignIn,isAdmin,updateCategoryController)

//route for listing categories
router.get("/allCategory",categoryController)
 
//single category router
router.get("/singleCategory/:slug",singleCategoryController)
// to delete
router.delete("/deleteCategory/:id",requireSignIn,isAdmin,deleteController);

export default router 