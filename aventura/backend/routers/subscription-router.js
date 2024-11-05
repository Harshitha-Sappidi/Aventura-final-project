import express from 'express';
import * as subscriptionController from '../controllers/subscription-controller.js';

const router = express.Router();

// Define routes for the root path ('/')
// POST request to create a new subscription
// GET request to retrieve all subscriptions 
router.route('/')
    .post(subscriptionController.post);

export default router;
