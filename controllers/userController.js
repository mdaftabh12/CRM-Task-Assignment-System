import userModel from "../models/userModel.js";
import teamModel from "../models/teamModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

//=========  User register  =========//

const register = async (req, res) => {
  try {
    let { email, password, conformPassword, fullName } = req.body;
    let image = req.file ? req.file.path : null;
    let check = await userModel.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).json({
        success: false,
        message:
          "This email is already registered. Please use a different email address.",
      });
    }
    if (password !== conformPassword) {
      return res.status(400).json({
        success: false,
        message:
          "The passwords provided do not match. Please make sure your passwords match.",
      });
    }
    let hashPassword = await bcrypt.hash(password, 10);

    let user = await userModel.create({
      email: email,
      password: hashPassword,
      fullName: fullName,
      image: image,
    });
    let token = jwt.sign({ _id: user._id }, "SECRETEKEY");
    user._doc.token = token;
    return res.status(201).json({
      success: true,
      message: "You have been successfully registered.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User login  =========//

const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let data = await userModel.findOne({ email: email });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "The email or password you entered is incorrect.",
      });
    }
    if (data.disable) {
      return res.status(400).json({
        success: false,
        message:
          "Your account has been temporarily disabled. Please contact support for assistance.",
      });
    }
    let comparePassword = await bcrypt.compare(password, data.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "The email or password you entered is incorrect.",
      });
    }
    var token = jwt.sign({ _id: data._id }, "SECRETEKEY");
    data._doc.token = token;
    return res.status(200).json({
      success: true,
      message: "Welcome back! You have successfully logged in.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User logout  =========//

const logout = async (req, res) => {
  try {
    res.clearCookie("authorization");
    return res.status(200).json({
      success: true,
      message: "You have been successfully logged out.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User update  =========//

const updateUser = async (req, res) => {
  try {
    let { fullName, phoneNumber, gender } = req.body;
    let image = req.file ? req.file.path : null;
    let userId = req.userId;
    if (image && userId.image != null) {
      await fs.unlink(userId.image, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
    let user = await userModel.findByIdAndUpdate(
      { _id: userId._id },
      {
        $set: {
          fullName: fullName,
          phoneNumber: phoneNumber,
          gender: gender,
          image: image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Your profile has been successfully updated.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Forget password  =========//

const forgetPassword = async (req, res) => {
  try {
    let { email, password, conformPassword } = req.body;
    let data = await userModel.findOne({ email: req.body.email });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: "No user found with this email address.",
      });
    }

    if (password !== conformPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match. Please ensure your passwords match.",
      });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let check = await userModel.findOneAndUpdate(
      { email: email },
      { password: hashPassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Your password has been successfully updated.",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by userId  =========//

const getByUserId = async (req, res) => {
  try {
    let userId = req.userId;
    let teamId = [];
    let team = await teamModel.find();
    let user = userId._id;
    team.map((item) => {
      if (item.member.includes(user)) {
        teamId.push(item._id);
      }
    });
    await userModel.findByIdAndUpdate(
      { _id: user },
      {
        $set: {
          teamId: teamId,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: userId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all users  =========//

const getAllUser = async (req, res) => {
  try {
    let user = await userModel.find();
    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: "No users found. Please check again later.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User data has been successfully retrieved.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User disable  =========//

const disableUser = async (req, res) => {
  try {
    let userId = req.userId;
    let user = await userModel.findByIdAndUpdate(
      { _id: userId._id },
      {
        $set: {
          disable: !userId.disable,
        },
      },
      { new: true }
    );
    if (user.disable) {
      return res.status(200).json({
        success: true,
        message: "User has been disabled successfully.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User has been enabled successfully.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Export  =========//

export default {
  register,
  login,
  logout,
  updateUser,
  getByUserId,
  getAllUser,
  disableUser,
  forgetPassword,
};
