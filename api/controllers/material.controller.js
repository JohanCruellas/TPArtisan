const db = require("../models/db.js")
const { Material } = db.models

exports.getAll = async (req, res, next) => {
    try {
        let materials = await Material.findAll()
        return res.status(200).json({
            materials: materials
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}