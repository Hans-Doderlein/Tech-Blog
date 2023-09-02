const Sequelize = require("sequelize");
require("dotenv").config();

//sets up connection to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    port: 8000,
  }
);

module.exports = sequelize;
