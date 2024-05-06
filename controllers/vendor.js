const DB = require("../models");
const { Op } = require("sequelize");

const UserModel = DB.User;

const listAllVendors = async (req, res, next) => {
    try {
        console.log('Reaching --->');
        const vendors = await UserModel.findAll({
            where: {
                role: "vendor",
            }
        })
        return res.status(200).json({
            message: "Vendors fetched successfully",
            result: vendors
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        })

    }
}

module.exports = {
    listAllVendors
}