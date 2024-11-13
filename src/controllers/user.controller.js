import { User } from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).send({ username: user.username, email: user.email });
  } catch (error) {
    console.log(error?.message);
    res.status(500).send({ message: "failed to get user details" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user._id);
    user.username = username || user.username;
    user.email = email || user.email;
    if (password) {
      user.password = password;
    }
    await user.save();
    res.status(200).send({ message: "profile updated successfully", user });
  } catch (error) {
    res.status(500).send({ message: "failed to update user details" });
  }
};
