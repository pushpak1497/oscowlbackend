import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    // console.log(token);

    if (!token) {
      res.status(401).send({ message: "Unauthorized Request" });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      res.status(401).send({ message: "Invalid Access Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error while verifying JWT token", error);
    res.status(401).send(error?.message);
  }
};
