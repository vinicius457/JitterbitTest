const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Items', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'orderId',
    references: {
      model: 'Order',
      key: 'orderId',
    },
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'productId',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'quantity',
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'price',
  },
}, {
  tableName: 'Items',
});

module.exports = Item;
