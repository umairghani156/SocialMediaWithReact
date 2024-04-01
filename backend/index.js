import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import { dbConnection } from "./db/config.js";
import userRoute from "./routes/user.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

const app = express();
// n8l07udBYdsKW4c6

dotenv.config();
dbConnection()

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images")
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer()
app.post("/api/upload",upload.single("file"),(req,res)=>{
    try{
     return res.status(200).json("File uploaded successfully.")
    }catch(err){
        console.log(err);
    }
})
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


app.listen(8800,()=>{
    console.log("Backend server is running!");
})