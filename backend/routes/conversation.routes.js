import express from "express";
import { Conversationstart, Getallmessagedpeople, Getalluserdata } from "../controllers/conversation.controller.js";
import { AuthmiddleWare } from "../middlewares/auth.middleware.js";

export const Conversatiionrouter = express.Router();

Conversatiionrouter.post("/alluser/data", Getalluserdata)
Conversatiionrouter.post("/:recipientId", AuthmiddleWare, Conversationstart)
Conversatiionrouter.get("/:id", AuthmiddleWare, Getallmessagedpeople)
