import express from "express"
import { Addcomment, Addlike, Addtowishlist, Approval, Deletecomment, GEtAllpropertyinfinte, GetpropertySaved, Hideproperty, Listpropertyall, NewpropertyUpload, RejectApproval, RemoveApproved, removeproperty, SingleProperty, Updatecomment, Updateproperty, Vectorindex } from "../controllers/property.controller.js"
import { AuthmiddleWare } from "../middlewares/auth.middleware.js"
import { CloudinaryStorageUpload } from "../middlewares/upload.middleware.js"
import { Adminmiddlware } from "../middlewares/Adminmiddleware.js"

export const PropertyRoute = express.Router()

// vectorsearch
PropertyRoute.get("/getfull", GEtAllpropertyinfinte)
PropertyRoute.post("/vector", Vectorindex)
PropertyRoute.get("/getall", Listpropertyall)

// Admin routes
PropertyRoute.put("/approve/:id", Adminmiddlware, Approval)
PropertyRoute.put("/reject/:id", Adminmiddlware, RejectApproval)
PropertyRoute.put("/remove/:id", Adminmiddlware, RemoveApproved)
PropertyRoute.put("/hide/:id", Hideproperty)
PropertyRoute.delete("/delete/:id", Adminmiddlware, removeproperty)

// Property operations
PropertyRoute.post("/new/property", AuthmiddleWare, CloudinaryStorageUpload.array("images", 8), NewpropertyUpload)
PropertyRoute.put("/update/:id", AuthmiddleWare, CloudinaryStorageUpload.array("images", 8), Updateproperty)
PropertyRoute.put("/like/:id", AuthmiddleWare, Addlike)

// Wishlist
PropertyRoute.get("/wishlist/get", AuthmiddleWare, GetpropertySaved)
PropertyRoute.post("/wishlist/:id", AuthmiddleWare, Addtowishlist)

// Comments
PropertyRoute.put("/addcomment/:id", AuthmiddleWare, Addcomment)
PropertyRoute.put("/updatecomment/:id/:commentId", AuthmiddleWare, Updatecomment)
PropertyRoute.put("/deletecomment/:id/:commentId", AuthmiddleWare, Deletecomment)

// Dynamic route LAST
PropertyRoute.get("/:id", SingleProperty)
