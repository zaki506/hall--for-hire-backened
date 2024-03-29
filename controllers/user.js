const DB = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenModel = DB.Token;
const { sendEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const { json } = require("body-parser");
require("dotenv").config();

const UserModel = DB.User;

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      address,
      city,
      state,
      postcode,
      password,
      verified,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let createdUser = await UserModel.create({
      name,
      email,
      mobile,
      address,
      city,
      state,
      postcode,
      password: hashedPassword,
      verified,
    });

    const token = await TokenModel.create({
      userId: createdUser.id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const url = `${process.env.BASE_URL}users/${createdUser.id}/verify/${token.token}`;

    await sendEmail(createdUser.email, "Verify Email", url);
    return res.status(201).json({
      message: "An email has been sent to your account, please verify!",
      // result: createdUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAllusers = async (req, res) => {
  try {
    const users = await UserModel.findAll({});
    return res.status(200).json({
      message: "Users fetched",
      result: users,
      count: users.length,
    });
    // });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "No account exist with the given email id",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(500).json({
        message: "Invalid Password",
      });
    }
    console.log("user", user);
    const payload = {
      user,
    };
    const token = jwt.sign(payload, "SECRET_KEY");
    user = {
      ...user.dataValues,
      token,
    };

    if (!user.verified) {
      let emailToken = await TokenModel.findOne({
        where: {
          userId: user.id,
        },
      });

      if (!emailToken) {
        const token = await TokenModel.create({
          userId: user.id,
          token: crypto.randomBytes(32).toString("hex"),
        });

        const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;

        await sendEmail(user.email, "Verify Email", url);
      }
    }
    return res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const verifyToken = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid Link",
      });
    }

    const token = await TokenModel.findOne({
      where: {
        userId: user.id,
        token: req.params.token,
      },
    });

    if (!token) {
      return (
        res.status(404),
        json({
          message: "Invalid Token !",
        })
      );
    }

    await user.set({
      verified: true,
    });
    await token.remove();
    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (err) {
    return (
      res.status(500),
      json({
        message: err.message,
      })
    );
  }
};

module.exports = {
  createUser,
  getAllusers,
  login,
  verifyToken,
};
