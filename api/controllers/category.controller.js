const db = require("../models/db.js")
const { Category } = db.models

exports.getAll = async (req, res, next) => {
    try {
        let categories = await Category.findAll({
            include: [
                {
                    association: 'furnitures',
                    include: [
                        {
                            association: 'materials',
                            include: [
                                { association: 'manufacturers' }
                            ]
                        },
                        { association: 'creator' },
                        { association: 'category' }
                    ]
                }
            ]
        })
        return res.status(200).json({
            categories: categories
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error."
        })
    }
}