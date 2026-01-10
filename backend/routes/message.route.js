import express from "express"
import { creaateMessage, Getmessages } from "../controllers/message.controller.js";
import { AuthmiddleWare } from "../middlewares/auth.middleware.js";
export const Messagerouter = express.Router();

Messagerouter.post("/newmessage", creaateMessage)

Messagerouter.get("/:chatId", AuthmiddleWare, Getmessages)


