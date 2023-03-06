require('dotenv').config();
const process = require('process');
const mongoose = require('mongoose');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

async function connect(app) {
  try {
    await mongoose.connect(DB_ADDRESS, {
      useNewUrlParser: true,
    });
    console.log('Server connected to Mongo');

    await app.listen(PORT);
    console.log(`Server listening ${PORT}`);
  } catch (err) {
    console.log(`Произошла ошибка ${err.name} - ${err.message}`);
  }
}

module.exports = {
  PORT,
  DB_ADDRESS,
  connect,
};
