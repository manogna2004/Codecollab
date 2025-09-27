const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController');
const protect = require('../middleware/auth'); // Import the protect middleware
const router = express.Router();

// All project routes require authentication
router.route('/')
    .get(protect, getProjects)    // GET /api/projects (Fetch all user projects)
    .post(protect, createProject); // POST /api/projects (Create a new project)

module.exports = router;
