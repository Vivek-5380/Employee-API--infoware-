const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/database');

class EmergencyContact extends Model {}

// Define the second model: EmergencyContact
EmergencyContact.init({
    primaryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryRelationship: {
        type: DataTypes.STRING,
        allowNull: false
    },
    secondaryName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    secondaryPhoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    secondaryRelationship: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        sequelize,
        modelName: 'EmergencyContact'
    }
);

module.exports= EmergencyContact;