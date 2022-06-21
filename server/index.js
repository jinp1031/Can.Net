const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversation");
const msgRoute = require("./routes/message");
const multer = require("multer");
const path = require("path");

dotenv.config();

//database
mongoose.connect(process.env.MONGO_URL, ()=> {
  console.log("Database is connected")
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", msgRoute);

//upload files
const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, "public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
});
const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
  try{
    return res.status(200).send("File uploaded!")
  }catch(err){
    console.log(err);
    return res.status(500).send("File uploaded failed!")
  }
})


//run backend
app.listen(8800,() => {
  console.log("Backend is running")
})