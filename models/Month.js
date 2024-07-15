module.exports = (sequelize, DataTypes) => {
  const Month = sequelize.define(
      'Month',
      {
          id: {
              allowNull: false,
              primaryKey: true,
              type: DataTypes.INTEGER,
          },
          name: {
              type: DataTypes.STRING,
              allowNull: false,
              unique: true,
          }
      },
      {
          freezeTableName: true,
          timestamps: false,
          underscored: true,
      }
  );

  Month.associate = (models) => {
      Month.hasMany(models.Budget, { foreignKey: 'month_id', as: 'budgets' });
  };

  return Month;
};
