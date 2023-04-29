const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { authenticate } = require("../middleware/authenticate");

userRouter.post("/register", async (req, res) => {
  let userCheck = await UserModel.findOne({ email });
  if (userCheck) {
    return res.send("Already registered");
  }

  const { name, email, password, address } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, encrypted) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({
          name,
          email,
          password: encrypted,
          address,
        });
        await user.save();
        res.send("Registered");
      }
    });
  } catch (error) {
    res.send("Error while registering");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    const hashed_password = user?.password;

    bcrypt.compare(password, hashed_password, (err, result) => {
      if (result) {
        const token = jwt.sign({ userID: user._id }, "coder");
        res.send({ message: "Logged in Successfully", token });
      } else {
        res.send("Wrong Credentials");
      }
    });
  } catch (error) {
    res.send("Error", error);
  }
});
userRouter.patch("/user/:id/reset", authenticate, async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  console.log("hi");
  const user = await UserModel.findOne({ _id: id });
  try {
    if (user.userID == req.body.userID) {
      await UserModel.findByIdAndUpdate({ _id: id }, payload);
    } else {
      res.send("Not authorize");
    }
  } catch (error) {
    res.send("You are not authorize");
  }
});

module.exports = { userRouter };
