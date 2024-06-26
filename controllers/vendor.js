const DB = require("../models");
const { Op } = require("sequelize");

const UserModel = DB.User;

const listAllVendors = async (req, res, next) => {
    try {
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

const deleteVendor = async (req, res, next) => {
    const id = req.params.id
    try {
        const vendor = await UserModel.findOne({
            where: {
                id: id,
            }
        })

        if (!vendor) {
            return res.status(404).json({
                message: "No vendor found !"
            })
        }

        await UserModel.destroy({
            where: {
                id: id
            }
        })

        return res.status(200).json({
            message: "Vendor Deleetd!"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    listAllVendors,
    deleteVendor
}