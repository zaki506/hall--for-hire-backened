const { emit } = require("nodemon");
const DB = require("../models");
const { Op, where } = require("sequelize");
require("dotenv").config();

const HallsModel = DB.Halls;

const createHall = async (req, res) => {
    try {
        const {
            title,
            desc,
            vendor_id,
            capacity,
            street,
            city,
            state,
            zip,
            phone1,
            phone2,
            email,
            std_code,
            landline
        } = req.body;


        let createdHall = await HallsModel.create({
            title,
            desc,
            vendor_id,
            capacity,
            street,
            city,
            state,
            zip,
            phone1,
            phone2,
            email,
            std_code,
            landline
        });

        return res.status(201).json({
            message: "Halls created successfully",
            result: createdHall
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const listAllHalls = async (req, res) => {
    try {
        const halls = await HallsModel.findAll({})
        return res.status(200).json({
            message: "All halls fetched successfully !",
            count: halls.length,
            result: halls
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        })
    }
}

const listVendorsHalls = async (req, res, next) => {
    const id = req.params.id
    try {
        const halls = await HallsModel.findAll({
            where: {
                vendor_id: id,
            }
        })
        if(halls.length === 0) {
            return res.status(404).json({
                message: "No halls found for the vendor!",
                result: halls
            })
        }
        return res.status(200).json({
            message: "Halls for the given vendor fetched !",
            result: halls
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createHall,
    listAllHalls,
    listVendorsHalls
}