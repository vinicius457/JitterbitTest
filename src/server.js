const dotenv = require('dotenv');
const app = require('./app');
const sequelize = require('./config/database');

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL realizada com sucesso.');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error.message);
    process.exit(1);
  }
}

startServer();
