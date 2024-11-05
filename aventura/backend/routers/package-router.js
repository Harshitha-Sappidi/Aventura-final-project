import express from "express";
import * as packageController from '../controllers/package-controller.js';

const router = express.Router();


// Define routes for the root path ('/')
// POST request to create a new package
// GET request to search for packages
router.route('/')
    .post(packageController.post)
    .get(packageController.search);

// Define route for the filter path ('/filter')
// GET request to filter packages based on query parameters
router.route('/filter')
    .get(packageController.filterSearch)

// Define routes for paths with a specific package ID ('/:id')
// GET request to retrieve a specific package by ID
// PUT request to update a specific package by ID
// DELETE request to remove a specific package by ID
router.route('/:id')
    .get(packageController.get)
    .put(packageController.put)
    .delete(packageController.remove)

export default router;