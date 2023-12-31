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
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.ENUM('Wood', 'Metal', 'Plastic', 'Glass', 'Other'),
        },
        isEcoFriendly: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        creatorId : {
            type: DataTypes.UUID,
            allowNull: true,
        },
        cost : {
            type: DataTypes.INTEGER,
        }
    },
        {
            timestamps: true,
            freezeTableName: true,
        },
    )
}