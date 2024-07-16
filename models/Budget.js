module.exports = (sequelize, DataTypes) => {
    const Budget = sequelize.define(
        'Budget',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            category_id: { // Añadir el campo category_id
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Category', // name of the target model
                    key: 'id', // key in the target model that we're referencing
                }
            },
            month_id: { // Añadir el campo month_id
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Month', // name of the target model
                    key: 'id', // key in the target model that we're referencing
                }
            },
            user_id: { // Añadir el campo user_id
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
    
    return Budget;
  };
  