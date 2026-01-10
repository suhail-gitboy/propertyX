import express from "express"
import { GoogleLoginController, GoogleLoginHostController, LoginController, RegisterASHostController, RegisterController } from "../controllers/auth.controller.js"
import { FollowUser, GETsingleuser, Totalusers, UnfollowUser, UpdateUserprofile, UserANDtheirproperty } from "../controllers/user.controller.js"
import { AuthmiddleWare } from "../middlewares/auth.middleware.js"
import { CloudinaryStorageUpload } from "../middlewares/upload.middleware.js"
import { Adminmiddlware } from "../middlewares/Adminmiddleware.js"


export const UseRoute = express.Router()


UseRoute.put("/update/profile", AuthmiddleWare, CloudinaryStorageUpload.single("picture"), UpdateUserprofile)
UseRoute.get("/alluser", Adminmiddlware, Totalusers)

UseRoute.get("/allproperty/:id", UserANDtheirproperty)

UseRoute.get("/get/:id", GETsingleuser)
UseRoute.put("/follow/:id", AuthmiddleWare, FollowUser);
UseRoute.put("/unfollow/:id", AuthmiddleWare, UnfollowUser);