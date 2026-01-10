import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv"
import Stripe from "stripe";
dotenv.config()
const app = express();

app.use(express.json())


app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"]
}));

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
        // ✅ Must have a valid User-Agent with your app name and contact info
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




app.listen(8000, () => console.log("Server running on port 8000"));
