import express from "express"
import { Addcomment, Addlike, Addtowishlist, Approval, Deletecomment, GetpropertySaved, Hideproperty, Listpropertyall, NewpropertyUpload, RejectApproval, RemoveApproved, removeproperty, SingleProperty, Updatecomment, Updateproperty, Vectorindex } from "../controllers/property.controller.js"
import { AuthmiddleWare } from "../middlewares/auth.middleware.js"
import { CloudinaryStorageUpload } from "../middlewares/upload.middleware.js"
import { Adminmiddlware } from "../middlewares/Adminmiddleware.js"

export const PropertyRoute = express.Router()

// vectorsearch

PropertyRoute.post("/vector", Vectorindex)


PropertyRoute.post("/new/property", AuthmiddleWare, CloudinaryStorageUpload.array("images", 8), NewpropertyUpload)
PropertyRoute.put("/update/:id", AuthmiddleWare, CloudinaryStorageUpload.array("images", 8), Updateproperty)

PropertyRoute.get("/getall", Listpropertyall)


// admin side

PropertyRoute.put("/approve/:id", Adminmiddlware, Approval)

PropertyRoute.put("/reject/:id", Adminmiddlware, RejectApproval)
PropertyRoute.put("/remove/:id", Adminmiddlware, RemoveApproved)
PropertyRoute.put("/hide/:id", Hideproperty)
PropertyRoute.delete("/delete/:id", Adminmiddlware, removeproperty)

// getSingleproperty

PropertyRoute.get("/:id", SingleProperty)

PropertyRoute.put("/like/:id", AuthmiddleWare, Addlike)


// addtowishlist
PropertyRoute.get("/wishlist/get", AuthmiddleWare, GetpropertySaved)
PropertyRoute.post("/wishlist/:id", AuthmiddleWare, Addtowishlist)



// comments

PropertyRoute.put("/addcomment/:id", AuthmiddleWare, Addcomment)
PropertyRoute.put("/updatecomment/:id/:commentId", AuthmiddleWare, Updatecomment)
PropertyRoute.put("/deletecomment/:id/:commentId", AuthmiddleWare, Deletecomment)


