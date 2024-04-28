const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../models/user");

const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const key = jwt.verify(token, process.env.SECRET_KEY)
        console.log('key', key);
        const user = await UserModel.findOne({
            email: key.email
        })
        console.log('user :', user);
        if (user.type === "admin") {
            next()
        } else {
            return res.status(403).json({
                message: "You're not authorized to access this route",
                code: 403
            })
        }
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized",
            code: 403
        })
    }
}

const checkVendor = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const key = jwt.verify(token, process.env.SECRET_KEY)
        console.log('key', key);
        const user = await UserModel.findOne({
            email: key.email
        })
        console.log('user :', user);
        if (user.type === "vendor") {
            next()
        } else {
            return res.status(403).json({
                message: "You're not authorized to access this route",
                code: 403
            })
        }
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized",
            code: 403
        })
    }
}

module.exports = {
    checkAdmin,
    checkVendor
}