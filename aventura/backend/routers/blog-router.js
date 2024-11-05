import express from 'express';
import * as blogController from '../controllers/blog-controller.js';

const router = express.Router();

// Define routes for the root path ('/')
// POST request to create a new blog 
// GET request to search for blogs
router.route('/')
    .post(blogController.post)
    .get(blogController.search);

// Define routes for paths with a specific blog ID ('/:id')
// GET request to retrieve a specific blog by ID
// PUT request to update a specific blog by ID
// DELETE request to remove a specific blog by ID
router.route('/:id')
    .get(blogController.get)
    .put(blogController.put)
    .delete(blogController.remove);

export default router;
