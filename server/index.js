// WBzgQsaAsdZWyerW
// mongodb+srv://ehsangood1382:WBzgQsaAsdZWyerW@cls.hzyer62.mongodb.net/
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const UserResume = require('./models/Resume');
const cors = require('cors');
const multer = require('multer');
const path = require('path')


mongoose.connect(
    "mongodb+srv://ehsangood1382:WBzgQsaAsdZWyerW@cls.hzyer62.mongodb.net/Resume?retryWrites=true&w=majority&appName=CLS",
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(async () => {
    await UserResume.ensureIndexes();
});

app.use(express.json());
app.use(cors());
app.use(express.static('public'))

// upload image profile storage

const storageImageProfile = multer.diskStorage({
    destination : (req , file , cb )=>{
        cb(null, 'public/images')
    },
    filename : (req , file , cb )=>{
        cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
})
const uploadImageProfile = multer({
    storage  : storageImageProfile
})

// upload file storage

const storageuploadFile = multer.diskStorage({
    destination : (req , file , cb )=>{
        cb(null, 'public/doc')
    },
    filename : (req , file , cb )=>{
        cb(null , file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    },
})
const uploadFile = multer({
    storage  : storageuploadFile
})


app.post("/UploadFile" , uploadFile.single('file'), async (req , res)=>{
    const user = req.body;
    user.file = req.file.filename
    const newUser = new UserModel(user);
  try {
      const savedUser = await newUser.save();
      res.json(savedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }

})




app.post("/UploadImageProfile" , uploadImageProfile.single('imageAddress'), async (req , res)=>{
    const user = req.body;
    user.imageAddress = req.file.filename
    const newUser = new UserModel(user);
  try {
      const savedUser = await newUser.save();
      res.json(savedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }

})


app.get("/FindResume/:token", async (req, res) => {
    try {
        const resume = await UserResume.find({UserTokenRef: req.params.token});
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/GetAllResume", async (req, res) => {
    try {
        const resume = await UserResume.find({});
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post("/SearchItem/:searchparam", async (req, res) => {

    try {
        const search = await UserResume.find({ $text: { $search: req.params.searchparam } });
        res.json(search);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post("/addResume", async (req, res) => {
    const resume = req.body;
    const newUser = new UserResume(resume);
  try {
      const savedResume = await newUser.save();
      res.json(savedResume);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post("/deleteResume/:token", async (req, res) => {
    try {
        const resume = await UserResume.deleteOne({ usertokenref: req.params.token });
        res.json(resume);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/GetEmails", async (req, res) => {
    const Array = []
    try {
        const users = await UserModel.find({});
        users.map((item)=>{
            Array.push(item.email)
        })
        res.json(Array);
    } catch (err) {
        // res.status(500).json({ message: err.message });
    }
});

app.delete("/deleteUser/:token", async (req, res) => {
    try {
        const result = await UserModel.deleteOne({ token: req.params.token });
        if (result.deletedCount > 0) {
            res.json({ message: "User successfully deleted" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post("/addUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
  try {
      const savedUser = await newUser.save();
      res.json(savedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});


