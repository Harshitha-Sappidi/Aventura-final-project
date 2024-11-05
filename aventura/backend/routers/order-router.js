// routes/order-router.js

import express from 'express';
import * as orderController from '../controllers/order-controller.js';

const router = express.Router();

// Define routes for the root path ('/orders')
// POST request to create a new order
// GET request to search for orders based on userId
router.route('/')
    .post(orderController.post)
    .get(orderController.fetchAll);

// Define routes for paths with a specific order ID ('/orders/:id')
// GET request to retrieve a specific order by ID
// PUT request to update a specific order by ID
// DELETE request to remove a specific order by ID
router.route('/:id')
    .get(orderController.get)
    .put(orderController.put)
    .delete(orderController.remove);



export default router;
