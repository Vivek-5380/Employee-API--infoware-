const express = require('express');
const { Op } = require('sequelize');
const Employee  = require('../Models/Employee');
const EmergencyContact = require('../Models/EmergencyContact');

// Define a router to handle the API endpoints
const router = express.Router();

// Middleware function to handle errors
const handleError = require("../middleware/middleware");

// Middleware function to paginate results
const paginateResults = require("../middleware/middleware");

// API endpoint to create a new employee with multiple contact details
router.post('/', async (req, res) => {
    try {
        // Create the employee and emergency contact records
        const { fullName, jobTitle, phoneNumber, email, address, city, state } = req.body;
        const employee = await Employee.create({ fullName, jobTitle, phoneNumber, email, address, city, state });
        const { primaryName, primaryPhoneNumber, primaryRelationship, secondaryName, secondaryPhoneNumber, secondaryRelationship } = req.body;
        const emergencyContact = await EmergencyContact.create({ primaryName, primaryPhoneNumber, primaryRelationship, secondaryName, secondaryPhoneNumber, secondaryRelationship });

        // Associate the emergency contact with the employee
        await employee.setEmergencyContact(emergencyContact);

        // Return the newly created employee record
        res.json({ employee });
    } catch (error) {
        console.error(error);
        handleError(res, 500, 'Unable to create employee.');
    }
});

// API endpoint to list employees with pagination
router.get('/', paginateResults, async (req, res) => {
    try {
        // Retrieve employees with pagination
        const { limit, offset } = req.pagination;
        const employees = await Employee.findAll({ limit, offset, include: EmergencyContact });

        // Return the list of employees
        res.json({ employees });
    } catch (error) {
        console.error(error);
        handleError(res, 500, 'Unable to retrieve employees.');
    }
});

// API endpoint to update an employee
router.put('/:id', async (req, res) => {
    try {
        // Retrieve the employee record
        const employee = await Employee.findByPk(req.params.id, { include: EmergencyContact });
        if (!employee) {
            return handleError(res, 404, 'Employee not found.');
        }

        // Update the employee record
        const { fullName, jobTitle, phoneNumber, email, address, city, state } = req.body;
        employee.set({ fullName, jobTitle, phoneNumber, email, address, city, state });
        await employee.save();

        // Update the emergency contact record
        const { primaryName, primaryPhoneNumber, primaryRelationship, secondaryName, secondaryPhoneNumber, secondaryRelationship } = req.body;
        const emergencyContact = employee.emergencyContact;
        emergencyContact.set({ primaryName, primaryPhoneNumber, primaryRelationship, secondaryName, secondaryPhoneNumber, secondaryRelationship });
        await emergencyContact.save();

        // Return the updated employee record
        res.json({ employee });
    } catch (error) {
        console.error(error);
        handleError(res, 500, 'Unable to update employee.');
    }
});

// DELETE /employees/:id
router.delete('/:id', async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (!employee) {
            return handleError(res, 404, 'Employee not found.');
        }
        await employee.destroy();
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        handleError(res, 500, 'Unable to delete employee.');
    }
});


module.exports = router;