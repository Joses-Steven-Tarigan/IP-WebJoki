'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false

    },
    price : {
      type: DataTypes.INTEGER,
      allowNull: false

    }, 
    amount: {
      type: DataTypes.INTEGER
    },
    serviceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};