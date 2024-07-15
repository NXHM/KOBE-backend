module.exports = (sequelize, DataTypes) => {
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
            type_id: { // Clave foránea
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Types',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            user_id: { // Nuevo campo user_id
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    Category.associate = (models) => {
        Category.belongsTo(models.Type, { foreignKey: 'type_id', as: 'type' });
        Category.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        Category.hasMany(models.Budget, { foreignKey: 'category_id', as: 'budgets' });
    };

    return Category;
};
