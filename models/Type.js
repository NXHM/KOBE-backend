const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Type = sequelize.define("Type", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
        }
    );

    Type.associate = function(models) {
        Type.hasMany(models.Category), {
            foreignKey: "type_id"
        };
    };
};
