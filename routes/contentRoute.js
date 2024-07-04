import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { contentFilterController, contentImageController, contentListController, contentSearchController, createContentControllers, deleteContentController, getContentController, getSingleContentController, limitedContentController, similarContentController, updateContentController } from "../handlers/contentControllers.js";
import formidable from "express-formidable";
const router=express.Router()

//for product creation
router.post("/createContent",requireSignIn,isAdmin,formidable(),createContentControllers)

//to get products
router.get('/getContent',getContentController)

//to get the single product
router.get("/getContent/:slug",getSingleContentController)


//to get the photo
router.get("/contentImage/:cid",contentImageController)
export default router;


//to delete
router.delete("/deleteContent/:cid",deleteContentController)  //cid->passing the id
// to update
router.put("/updateContent/:cid",formidable(),updateContentController)


//to filter
router.post("/contentFilter",contentFilterController)
//to get limited content
router.get("/limitedContent",limitedContentController)
//search content
router.get("/search/:keyword",contentSearchController)

//content for every page
router.get("/contentList/:page",contentListController)
//similar products recommandation
router.get("/similar/:cid/:catId",similarContentController)