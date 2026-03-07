function normalizeDate(inputDate) {
  const date = new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function mapOrderPayload(payload) {
  return {
    orderId: payload.numeroPedido,
    value: payload.valorTotal,
    creationDate: normalizeDate(payload.dataCriacao),
    items: Array.isArray(payload.items)
      ? payload.items.map((item) => ({
          productId: Number(item.idItem),
          quantity: Number(item.quantidadeItem),
          price: Number(item.valorItem),
        }))
      : [],
  };
}

module.exports = {
  mapOrderPayload,
  normalizeDate,
};
