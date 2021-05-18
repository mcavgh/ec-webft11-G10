const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  // defino el modelo
  sequelize.define('review', {
    title: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    reviewText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
};