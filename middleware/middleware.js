const express = require('express');

// Define a router to handle the API endpoints
const router = express.Router();

// Middleware function to handle errors
function handleError(res, status, message) {
    res.status(status).json({ error: message });
}

// Middleware function to paginate results
function paginateResults(req, res, next) {
    console.log();
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    req.pagination = { limit, offset };
    next();
}

module.exports  = handleError;
module.exports = paginateResults;