import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv"
import Stripe from "stripe";
import { Server } from "socket.io";
dotenv.config()
const app = express();

app.use(express.json())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://propertyxrealestate.netlify.app",
  "https://6965080394ee87334c7b88e3--propertyxrealestate.netlify.app",
  "https://property-x-618e.vercel.app"
];


app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: allowedOrigins,

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("/*", cors());
// mongoose connection 
import "./config/db.js"
import { Authroute } from "./routes/auth.route.js";
import { UseRoute } from "./routes/user.routes.js";
import { PropertyRoute } from "./routes/property.routes.js";
import { BookingRoute } from "./routes/Booking.route.js";
import { Conversatiionrouter } from "./routes/conversation.routes.js";
import { Messagerouter } from "./routes/message.route.js";


app.use("/auth", Authroute)
app.use("/user", UseRoute)
app.use("/property", PropertyRoute)
app.use("/booking", BookingRoute)
app.use("/conversation", Conversatiionrouter)
app.use("/message", Messagerouter)


app.get("/geocode", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ error: "missing query" });

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;

    const response = await fetch(url, {
      headers: {

        "User-Agent": "MyHotelApp/1.0 (email@example.com)",
        "Accept-Language": "en"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "server failed" });
  }
});


const PORT = process.env.PORT || 8000;

const EXpressserver = app.listen(PORT, () => console.log("Server running on port 8000"));


const io = new Server(EXpressserver, {
  cors: { origin: allowedOrigins, credentials: true }
})


let onlineUsers = []
io.on("connection", (socket) => {

  console.log("its connected");


  socket.on("newuserjoin", (userId) => {
    console.log(userId);
    socket.userId = userId;

    onlineUsers = onlineUsers.filter(
      (u) => u.userId !== userId
    );
    onlineUsers.push({
      userId,
      socketId: socket.id
    })


    io.emit("getallonlineusers", onlineUsers)



  })

  socket.on("sendmessages", (res) => {
    console.log("onrecpientid", res.Recipientid);


    const user = onlineUsers?.find((users) => users?.userId == res?.Recipientid)
    console.log("userrrrecipientifuser", user);
    console.log("from sended data", res);

    if (user) {
      io.to(user?.socketId).emit("getMessages", res)
    }



  })





  socket.on("disconnect", () => {
    if (!socket.userId) return;
    onlineUsers = onlineUsers.filter(
      (u) => u.userId !== socket.userId
    );

    io.emit("getallonlineusers", onlineUsers)

  })



})




