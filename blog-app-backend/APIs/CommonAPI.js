import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const { sign } = jwt;

export const commonApp = exp.Router();

config();


// REGISTER USER
commonApp.post(
  "/users",
  upload.single("profileImageUrl"),

  async (req, res) => {

    let cloudinaryResult;

    try {

      const allowedRoles = ["USER", "AUTHOR"];

      const newUser = req.body;

      // CHECK ROLE
      if (!allowedRoles.includes(newUser.role)) {

        return res.status(400).json({
          message: "Invalid role",
        });

      }

      // CHECK EXISTING USER
      const existingUser = await UserModel.findOne({
        email: newUser.email,
      });

      if (existingUser) {

        return res.status(400).json({
          message: "User already exists",
        });

      }

      // UPLOAD IMAGE
      if (req.file) {

        cloudinaryResult =
          await uploadToCloudinary(req.file.buffer);

        newUser.profileImageUrl =
          cloudinaryResult.secure_url;

      }

      // HASH PASSWORD
      newUser.password = await hash(
        newUser.password,
        12
      );

      // SAVE USER
      const newUserDoc = new UserModel(newUser);

      await newUserDoc.save();

      res.status(201).json({
        message: "User created successfully",
      });

    } catch (err) {

      console.log("Registration Error:", err);

      // DELETE CLOUDINARY IMAGE IF ERROR
      if (cloudinaryResult?.public_id) {

        await cloudinary.uploader.destroy(
          cloudinaryResult.public_id
        );

      }

      res.status(500).json({
        message: err.message,
      });

    }

  }
);


// LOGIN USER
commonApp.post("/login", async (req, res) => {

  try {

    console.log("Login Request:", req.body);

    const { email, password } = req.body;

    // CHECK EMPTY FIELDS
    if (!email || !password) {

      return res.status(400).json({
        message: "Email and password required",
      });

    }

    // FIND USER
    const user = await UserModel.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email",
      });

    }

    // VERIFY PASSWORD
    const isMatched = await compare(
      password,
      user.password
    );

    if (!isMatched) {

      return res.status(400).json({
        message: "Invalid password",
      });

    }

    // GENERATE TOKEN
    const token = sign(

      {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        profileImageUrl:
          user.profileImageUrl,
      },

      process.env.SECRET_KEY,

      {
        expiresIn: "1h",
      }

    );

    // SAVE TOKEN IN COOKIE
    res.cookie("token", token, {

      httpOnly: true,

      secure: true,

      sameSite: "none",

    });

    // REMOVE PASSWORD FROM RESPONSE
    let userObj = user.toObject();

    delete userObj.password;

    // SEND RESPONSE
    res.status(200).json({

      message: "Login success",

      payload: userObj,

    });

  } catch (err) {

    console.log("Login Error:", err);

    res.status(500).json({
      message: err.message,
    });

  }

});


// LOGOUT USER
commonApp.get("/logout", (req, res) => {

  res.clearCookie("token", {

    httpOnly: true,

    secure: true,

    sameSite: "none",

  });

  res.status(200).json({
    message: "Logout success",
  });

});


// CHECK AUTH
commonApp.get(

  "/check-auth",

  verifyToken("USER", "AUTHOR", "ADMIN"),

  (req, res) => {

    res.status(200).json({

      message: "authenticated",

      payload: req.user,

    });

  }

);


// CHANGE PASSWORD
commonApp.put(

  "/password",

  verifyToken("USER", "AUTHOR", "ADMIN"),

  async (req, res) => {

    try {

      const {
        currentPassword,
        newPassword,
      } = req.body;

      // SAME PASSWORD CHECK
      if (currentPassword === newPassword) {

        return res.status(400).json({

          message:
            "New password cannot be same as current password",

        });

      }

      // FIND USER
      const user = await UserModel.findById(
        req.user.id
      );

      // VERIFY CURRENT PASSWORD
      const isMatch = await compare(
        currentPassword,
        user.password
      );

      if (!isMatch) {

        return res.status(401).json({

          message:
            "Current password incorrect",

        });

      }

      // HASH NEW PASSWORD
      user.password = await hash(
        newPassword,
        10
      );

      await user.save();

      res.status(200).json({

        message:
          "Password updated successfully",

      });

    } catch (err) {

      console.log("Password Change Error:", err);

      res.status(500).json({
        message: err.message,
      });

    }

  }

);