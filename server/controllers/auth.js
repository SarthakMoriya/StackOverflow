import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

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
    if (curr_password === new_password)
      throw new Error(
        "old and new password are same please try a new password..."
      );
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

//Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { useremail } = req.body;
    //check if user exists or not
    const user = await Users.findOne({ email: useremail });
    if (!user) throw new Error("No user exists with given email address!");

    // Create a transport object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sarthak8544@gmail.com",
        pass: "eedcgrvfaibawlql",
      },
    });

    // Generate OTP
    const otpCode = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
    });

    const mailOptions = {
      from: "sarthak8544@gmail.com",
      to: useremail, // User's email address
      subject: "OTP Verification",
      text: `Your OTP code is: ${otpCode}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Error sending email" });
      } else {
        console.log(info);
        return res.status(200).json({ message: "Email sent:", otp: otpCode });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error!", error: error.message });
  }
};

//New/Recover Password
export const newPassword = async (req, res) => {
  try {
    const { email, new_password } = req.body;
    console.log(email, new_password);
    //check if user exists or not
    const user = await Users.findOne({ email });
    if (!user) throw new Error("No user exists with given email address!");

    //Assuming otp was correct as per checked in frontend
    const hashedPassword = await bcrypt.hash(new_password, 12);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password Changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
