module.exports = (sequelize, DataTypes) => {
  const Month = sequelize.define(
      'Month',
      {
          id: {
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
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

  return Month;
};
