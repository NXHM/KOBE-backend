module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define(
        "Type",
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

    return Type;
};
