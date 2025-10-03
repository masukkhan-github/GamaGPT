import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ parse JSON bodies

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

app.post("/test", async (req, res) => {
});
