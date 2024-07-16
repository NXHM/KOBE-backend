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
            type_id: {  // Añadir el campo type_id
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Type', // name of the target model
                    key: 'id', // key in the target model that we're referencing
                }
            },
            user_id: {  // Añadir el campo user_id
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'User', // name of the target model
                    key: 'id', // key in the target model that we're referencing
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );
    
    return Category;
};
