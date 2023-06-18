require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASSWORD,
  database: process.env.TEST_DB_NAME,
};
