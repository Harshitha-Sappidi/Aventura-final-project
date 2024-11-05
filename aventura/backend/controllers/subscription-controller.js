import * as subscriptionService from '../services/subscription-service.js'; // Adjust the import path if needed
import { setError, setResponse } from './response-handler.js';

// Controller function to handle POST requests for subscribing to the newsletter
export const post = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const result = await subscriptionService.subscribe({ email });

        if (result.status === 409) {
            // Handle email already subscribed case
            return res.status(409).json({ error: result.message });
        } else if (result.status === 201) {
            // Successfully created subscription
            return res.status(201).json(result.data);
        } else {
            // Handle other unknown errors
            return res.status(500).json({ error: 'Subscription failed due to unknown error' });
        }
    } catch (error) {
        setError(error, res);
    }
}