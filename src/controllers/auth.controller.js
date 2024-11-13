import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User Already exists");
    }
    const user = await User.create({ username, email, password });
    console.log(user);
    const createdUser = await User.findById(user._id).select("-password");
    console.log(createdUser);
    return res
      .status(201)
      .send({ message: "User Registered Successfully", createdUser });
  } catch (error) {
    console.log(error?.message);
    return res.status(500).send({ message: "failed to register User" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }
    const isPasswordMatched = await user.isPasswordCorrect(password);
    // console.log(isPasswordMatched);
    if (!isPasswordMatched) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
    // console.log(token);
    res.status(200).send({ message: "LoggedIn Successfully", token });
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "Failed to login" });
  }
};
