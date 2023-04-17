require("dotenv").config();
const Sequelize = require('sequelize');

// Initialize Sequelize with your MySQL credentials and database name
const sequelize = new Sequelize('Employee', 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    
});


module.exports = sequelize;