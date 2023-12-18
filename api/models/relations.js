function applyRelations(sequelize) {
    const { User, Furniture, Material } = sequelize.models

    //#region Furniture
    Furniture.belongsToMany(Material, { through: 'FurnitureMaterial' })
    //#endregion

    //#region Material
    Material.belongsToMany(Furniture, { through: 'FurnitureMaterial' })
    //#endregion

    //#region User
    Furniture.belongsTo(User, { as: 'creator' })
    //#endregion
}

module.exports = { applyRelations }