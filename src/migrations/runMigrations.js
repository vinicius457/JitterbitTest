const sequelize = require('../config/database');
const { Order, Item } = require('../models');

async function runMigrations() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco estabelecida com sucesso.');

    await Order.sync();
    await Item.sync();

    console.log('Tabelas criadas com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao criar tabelas:', error.message);
    process.exit(1);
  }
}

runMigrations();
