const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Month = sequelize.define('Month', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return Month;
};
