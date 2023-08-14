import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Users from "../models/authSchema.js";

//SignUp
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await Users.findOne({ email: email });

    //Check if email already exists or not ?
    if (existingUser) {
      return res.status(404).json({ message: "User already exists!" });
    }

    // Hash password and save user to DB
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await Users.create({
      name,
      email,
      password: hashedPassword,
    });

    // Assign Token
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({
      status: "Success",
      token,
      message: "User created",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "SOmething went wrong" });
  }
};

//LogIn
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email: email });

    //Check User on Basis of Email
    if (!existingUser) {
      return res.status(404).json({ message: "Incorrect Credentials" });
    }

    // Compare Password
    const correctPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!correctPassword) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send Token
    res.status(201).json({
      status: "Success",
      token,
      user: existingUser,
    });
  } catch (err) {
    res.status(500).json({ message: "SOmething went wrong" });
  }
};

//Change Password
export const changePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { id, curr_password, new_password } = req.body;
    const existingUser = await Users.findById(id);

    if (!existingUser) throw new Error("No user found!");

    //exisiting user
    const correctpassword = await bcrypt.compare(
      curr_password,
      existingUser.password
    );

    //check if old and new password were same?
    if(curr_password===new_password) throw new Error ("old and new password are same please try a new password...")
    //Incorrect Password
    if (!correctpassword) throw new Error("Incorrect Password...");

    //correct password then geenerate new password
    const newPassword = await bcrypt.hash(new_password, 12);

    existingUser.password = newPassword;
    await existingUser.save();

    res.status(200).json("Password changed");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong changing your password" });
  }
};
