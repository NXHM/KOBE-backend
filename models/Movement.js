const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movement = sequelize.define('Movement', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    freezeTableName: true
  });

  return Movement;
};
