import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import multer from "multer";
import User from "./models/User.js";
import Post from "./models/Post.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadMiddleware = multer({ dest: "uploads/" });
const salt = bcrypt.genSaltSync(10);


app.use(
  cors({
    origin: "https://blogverse-phi.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

await mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  app.get("/", (req, res) => {
    res.send("API is working");
  });
  

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});



app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  if (!userDoc) {
    return res.status(400).json("User not found");
  }

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if(passOk){
    jwt.sign({username,id:userDoc._id},JWT_SECRET,{},(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).json({
          id:userDoc._id,
          username,
        });
    })
  }
  else{
    res.status(400).json('wrong credentials')
  }
});

app.get('/profile',(req,res) =>{
    const { token } = req.cookies;
   
  
    jwt.verify(token,JWT_SECRET,{},(err,info) =>{
        if(err) throw err;
        
        res.json(info)
    })
})
  

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(postDoc);
  });
});


app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});



app.put('/post',uploadMiddleware.single('file'),async (req,res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await postDoc.set({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    await postDoc.save();

    res.json(postDoc);
  });
})



app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});


app.delete("/post/:id",async (req,res) =>{
   const token = req.cookies.token;

   jwt.verify(token,JWT_SECRET, {}, async (err, info) => {
     if (err) return res.status(403).json("Invalid token");

     const post = await Post.findById(req.params.id);

     if (!post) return res.status(404).json("Post not found");

     if (post.author.toString() !== info.id) {
       return res.status(403).json("You can delete only your own posts");
     }

     await Post.findByIdAndDelete(req.params.id);
     res.status(200).json("Post deleted");
   });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  