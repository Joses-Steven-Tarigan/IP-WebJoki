'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};