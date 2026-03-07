const { Order, Item, sequelize } = require('../models');
const { mapOrderPayload } = require('../utils/orderMapper');

async function createOrder(payload) {
  const mappedOrder = mapOrderPayload(payload);

  const existingOrder = await Order.findByPk(mappedOrder.orderId);
  if (existingOrder) {
    const error = new Error('Já existe um pedido com esse orderId.');
    error.statusCode = 409;
    throw error;
  }

  const transaction = await sequelize.transaction();

  try {
    const order = await Order.create({
      orderId: mappedOrder.orderId,
      value: mappedOrder.value,
      creationDate: mappedOrder.creationDate,
    }, { transaction });

    const items = mappedOrder.items.map((item) => ({
      orderId: mappedOrder.orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await Item.bulkCreate(items, { transaction });
    await transaction.commit();

    return getOrderById(order.orderId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function getOrderById(orderId) {
  const order = await Order.findByPk(orderId, {
    include: [{ model: Item, as: 'items' }],
    order: [[{ model: Item, as: 'items' }, 'id', 'ASC']],
  });

  if (!order) {
    const error = new Error('Pedido não encontrado.');
    error.statusCode = 404;
    throw error;
  }

  return order;
}

async function listOrders() {
  return Order.findAll({
    include: [{ model: Item, as: 'items' }],
    order: [['creationDate', 'DESC'], [{ model: Item, as: 'items' }, 'id', 'ASC']],
  });
}

async function updateOrder(orderId, payload) {
  const mappedOrder = mapOrderPayload(payload);

  const order = await Order.findByPk(orderId);
  if (!order) {
    const error = new Error('Pedido não encontrado.');
    error.statusCode = 404;
    throw error;
  }

  const transaction = await sequelize.transaction();

  try {
    await Order.update({
      value: mappedOrder.value,
      creationDate: mappedOrder.creationDate,
    }, {
      where: { orderId },
      transaction,
    });

    await Item.destroy({ where: { orderId }, transaction });

    const newItems = mappedOrder.items.map((item) => ({
      orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    await Item.bulkCreate(newItems, { transaction });
    await transaction.commit();

    return getOrderById(orderId);
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function deleteOrder(orderId) {
  const order = await Order.findByPk(orderId);

  if (!order) {
    const error = new Error('Pedido não encontrado.');
    error.statusCode = 404;
    throw error;
  }

  await Order.destroy({ where: { orderId } });

  return {
    message: 'Pedido removido com sucesso.',
  };
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
};
