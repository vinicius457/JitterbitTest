# Jitterbit Order API

API REST desenvolvida em **Node.js + Express + PostgreSQL + Sequelize** para o desafio técnico da Jitterbit.

## Funcionalidades

- Criar um novo pedido
- Buscar pedido por `orderId`
- Listar todos os pedidos
- Atualizar pedido por `orderId`
- Deletar pedido por `orderId`
- Mapping automático do payload de entrada para o formato salvo no banco
- Validação básica dos dados
- Tratamento de erros com respostas HTTP adequadas

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Sequelize
- Nodemon

## Estrutura do projeto

```bash
src/
  config/
  controllers/
  middlewares/
  migrations/
  models/
  routes/
  services/
  utils/
  app.js
  server.js
```

## Endpoints

### Criar pedido

**POST** `/order`

Body:

```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```


## Respostas esperadas da API

- `201 Created` ao criar pedido
- `200 OK` ao buscar, listar, atualizar e deletar
- `400 Bad Request` para payload inválido
- `404 Not Found` quando pedido não existir
- `409 Conflict` ao tentar criar um pedido já existente
- `500 Internal Server Error` para erro interno
