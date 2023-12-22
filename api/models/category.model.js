module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}