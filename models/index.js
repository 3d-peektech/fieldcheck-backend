// models/index.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Example model imports (optional)
// db.User = require('./user.model')(sequelize, Sequelize);
// db.Company = require('./company.model')(sequelize, Sequelize);

module.exports = db;
