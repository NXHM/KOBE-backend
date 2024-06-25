const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Category = sequelize.define(
        'Category',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
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
            underscored: true,
        }
    );
    
    return Category;
};
