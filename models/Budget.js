module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return Budget;
};
