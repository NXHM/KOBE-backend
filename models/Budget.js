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
          category_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: 'Category',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
          },
          month_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: 'Month',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
          },
          user_id: {
              type: DataTypes.INTEGER,
              allowNull: false,
              references: {
                  model: 'User',
                  key: 'id'
              },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE'
          }
      },
      {
          freezeTableName: true,
          timestamps: false,
          underscored: true,
      }
  );

  Budget.associate = (models) => {
      Budget.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
      Budget.belongsTo(models.Month, { foreignKey: 'month_id', as: 'month' });
      Budget.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Budget;
};
