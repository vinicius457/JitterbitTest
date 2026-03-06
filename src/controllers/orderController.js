const orderService = require('../services/orderService');
const { validateOrderPayload } = require('../utils/validators');

async function createOrder(req, res, next) {
  try {
    const errors = validateOrderPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const createdOrder = await orderService.createOrder(req.body);
    return res.status(201).json(createdOrder);
  } catch (error) {
    return next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOrderById(orderId);
    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await orderService.listOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const errors = validateOrderPayload(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { orderId } = req.params;
    const updatedOrder = await orderService.updateOrder(orderId, req.body);
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const result = await orderService.deleteOrder(orderId);
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createOrder,
  getOrderById,
  listOrders,
  updateOrder,
  deleteOrder,
};
