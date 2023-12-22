function applyRelations(sequelize) {
    const { User, Furniture, Material, Manufacturer, Category } = sequelize.models

    //#region Furniture
    Furniture.belongsToMany(Material, { through: 'FurnitureMaterial', as: 'materials' })
    Furniture.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' })
    Furniture.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' })
    //#endregion

    //#region Material
    Material.belongsToMany(Furniture, { through: 'FurnitureMaterial', as: 'furnitures' })
    Material.belongsToMany(Manufacturer, { through: 'ManufacturerMaterial', as: 'manufacturers' })
    //#endregion

    //#region User
    User.hasMany(Furniture, { as: 'furnitures', foreignKey: 'creatorId' })
    //#endregion

    //#region Manufacturer
    Manufacturer.belongsToMany(Material, { through: 'ManufacturerMaterial', as: 'materials' })
    //#endregion

    //#region Category
    Category.hasMany(Furniture, { as: 'furnitures', foreignKey: 'categoryId' })
    //#endregion
}

module.exports = { applyRelations }