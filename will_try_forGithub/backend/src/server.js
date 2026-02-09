import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"

import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import dataRoutes from "./routes/data.route.js";

import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

app.use(express.json({ limit: "5mb" })); // req.body
console.log('ENV.CLIENT_URL:', ENV.CLIENT_URL);
console.log('NODE_ENV:', ENV.NODE_ENV);


app.use(cors({
    origin: ENV.CLIENT_URL,
    credentials: true
}));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/data", dataRoutes);


// make ready for deployment
// if (ENV.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")))

//     app.get("*", (_, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
//     })
// }

app.listen(3000, () => {
    console.log("Server running on port: " + PORT);
    connectDB();

});
