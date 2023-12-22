module.exports = (sequelize, DataTypes) => {
    const Furniture = sequelize.define('Furniture', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        quantitySold: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}