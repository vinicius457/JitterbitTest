function validateOrderPayload(body) {
  const errors = [];

  if (!body || typeof body !== 'object') {
    errors.push('O body da requisição é obrigatório.');
    return errors;
  }

  if (!body.numeroPedido || typeof body.numeroPedido !== 'string') {
    errors.push('numeroPedido é obrigatório e deve ser uma string.');
  }

  if (body.valorTotal === undefined || Number.isNaN(Number(body.valorTotal))) {
    errors.push('valorTotal é obrigatório e deve ser numérico.');
  }

  if (!body.dataCriacao || Number.isNaN(new Date(body.dataCriacao).getTime())) {
    errors.push('dataCriacao é obrigatória e deve ser uma data válida.');
  }

  if (!Array.isArray(body.items) || body.items.length === 0) {
    errors.push('items deve ser um array com pelo menos 1 item.');
  } else {
    body.items.forEach((item, index) => {
      if (!item.idItem) {
        errors.push(`items[${index}].idItem é obrigatório.`);
      }
      if (item.quantidadeItem === undefined || Number.isNaN(Number(item.quantidadeItem))) {
        errors.push(`items[${index}].quantidadeItem deve ser numérico.`);
      }
      if (item.valorItem === undefined || Number.isNaN(Number(item.valorItem))) {
        errors.push(`items[${index}].valorItem deve ser numérico.`);
      }
    });
  }

  return errors;
}

module.exports = {
  validateOrderPayload,
};
