const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    field: 'orderId',
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'value',
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'creationDate',
  },
}, {
  tableName: 'Order',
});

module.exports = Order;
