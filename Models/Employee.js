const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const EmergencyContact = require("./EmergencyContact");

class Employee extends Model {}

// Define the first model: Employee
Employee.init({
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'Employee'
    }

);

// Establish a relationship between the two models
Employee.hasOne(EmergencyContact);

module.exports = Employee;