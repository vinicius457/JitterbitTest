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

## Como rodar o projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o arquivo `.env`

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Depois ajuste os dados do PostgreSQL.

### 3. Crie o banco de dados

Crie no PostgreSQL um banco chamado `jitterbit_orders`.

### 4. Rode as migrações

```bash
npm run db:migrate
```

### 5. Inicie a aplicação

```bash
npm run dev
```

A API ficará disponível em:

```bash
http://localhost:3000
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

### Buscar pedido por ID

**GET** `/order/:orderId`

Exemplo:

```bash
GET /order/v10089015vdb-01
```

### Listar pedidos

**GET** `/order/list`

### Atualizar pedido

**PUT** `/order/:orderId`

### Deletar pedido

**DELETE** `/order/:orderId`

## Exemplo de mapping

Payload recebido:

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

Payload salvo:

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
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
