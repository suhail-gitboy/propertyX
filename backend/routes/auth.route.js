import express from "express"
import { GoogleLoginController, GoogleLoginHostController, GoogleRegisterController, LoginController, logout, Refreshtokenaccess, RegisterASHostController, RegisterController } from "../controllers/auth.controller.js"


export const Authroute = express.Router()


Authroute.post("/register", RegisterController)
Authroute.post("/login", LoginController)
Authroute.post("/googlelogin", GoogleLoginController)
Authroute.post("/googleregister", GoogleRegisterController)
Authroute.post("/register/host", RegisterASHostController)
Authroute.post("/google/host", GoogleLoginHostController)
Authroute.get("/refresh", Refreshtokenaccess)
Authroute.post("/logout", logout)