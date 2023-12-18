module.exports = (sequelize, DataTypes) => {
    const Material = sequelize.define('Material', {
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
        isEcoFriendly: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}