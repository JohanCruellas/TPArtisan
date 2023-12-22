module.exports = (sequelize, DataTypes) => {
    const Manufacturer = sequelize.define('Manufacturer', {
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
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}