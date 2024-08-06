// WBzgQsaAsdZWyerW
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/users');
const cors = require('cors')
mongoose.connect(
    "mongodb+srv://ehsangood1382:WBzgQsaAsdZWyerW@cls.hzyer62.mongodb.net/Resume?retryWrites=true&w=majority&appName=CLS",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(express.json());
app.use(cors());


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



// ehsan.good1382@gmail.com
app.delete("/deleteUser/:username", async (req, res) => {
    try {
        const result = await UserModel.deleteOne({ username: req.params.username });
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