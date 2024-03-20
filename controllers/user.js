const DB = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = DB.User;

const createUser = async (req, res) => {
  try {
    const { name, email, mobile, address, city, state, postcode, password } =
      req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      name,
      email,
      mobile,
      address,
      city,
      state,
      postcode,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User Created",
      result: createdUser,
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
    console.log("user", user)
    const payload = {
      user
    }
    const token = jwt.sign(payload, "SECRET_KEY");
    user = {
      ...user.dataValues,
      token
    }
    return res.status(200).json({
      message: "Login Successful",
      user
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
  getAllusers,
  login,
};
