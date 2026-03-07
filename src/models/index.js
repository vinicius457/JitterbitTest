const sequelize = require('../config/database');
const Order = require('./Order');
const Item = require('./Item');

Order.hasMany(Item, {
  foreignKey: 'orderId',
  as: 'items',
  onDelete: 'CASCADE',
});

Item.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order',
});

module.exports = {
  sequelize,
  Order,
  Item,
};
