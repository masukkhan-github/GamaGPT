import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import { chatRouter } from "./routes/chat.routes.js";
import mongoose from 'mongoose';

const __dirname = path.resolve();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" })); 
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api", chatRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
  connectDB();
});

const connectDB = async(req,res)=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected with database!")
  } catch (error) {
    console.log("Failed to connect with Db", error);
  }
}


