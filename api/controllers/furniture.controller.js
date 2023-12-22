const db = require("../models/db.js")
const { Furniture } = db.models

exports.getAll = async (req, res, next) => {
    try {
        let furnitures = await Furniture.findAll({
            include: [
                { association: 'materials',
                    include: [
                        { association: 'manufacturers' }
                    ] },
                { association: 'creator' },
                { association: 'category'}
            ]
        })
        return res.status(200).json({
            furnitures: furnitures
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.create = async (req, res, next) => {
    try {
        const { name, description, price, category, materials } = req.body
        let furniture = await Furniture.create({
            name: name,
            description: description,
            price: price,
            categoryId: category?.id,
            creatorId: req.userId
        })
        await furniture.setMaterials(materials.map(material => material.id))
        return res.status(200).json({
            furniture: furniture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        let furniture = await Furniture.findOne({
            where: {
                id: id
            }
        })
        if (!furniture) {
            return res.status(404).json({
                message: "Furniture not found."
            })
        }
        const { name, description, price, category, materials, quantitySold } = req.body
        furniture.name = name
        furniture.description = description
        furniture.price = price
        furniture.categoryId = category?.id
        furniture.quantitySold = quantitySold
        await furniture.save()
        await furniture.setMaterials(materials.map(material => material?.id))
        return res.status(200).json({
            furniture: furniture
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}