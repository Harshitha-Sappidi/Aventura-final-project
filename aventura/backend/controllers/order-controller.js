import { request, response } from 'express';
import * as orderService from '../services/order-service.js'; // Adjust import path if needed
import { setError, setResponse } from './response-handler.js';

// Controller function to handle POST requests for creating orders
export const post = async (req, res) => {
    try {
        const payload = { ...req.body };
        const order = await orderService.save(payload);
        if (!order) {
            res.status(400).json({ error: 'Order not created' });
        } else {
            setResponse(order, res);
        }
    } catch (error) {
        setError(error, res);
    }
}

// Controller function to handle GET requests for fetching all orders
export const fetchAll = async (req, res) => {
    try {
        const query = { ...req.query };
        const orders = await orderService.fetchAll(query);
        if (orders && orders.length > 0) {
            setResponse(orders, res);
        } else {
            res.status(404).json({ message: 'No orders found' });
        }
    } catch (error) {
        setError(error, res);
    }
}

// Controller function to handle GET requests for retrieving a single order by ID
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await orderService.getById(id);
        if (order) {
            setResponse(order, res);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}




// Controller function to handle PUT requests for updating an order
export const put = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = { ...req.body };
        const order = await orderService.update(id, payload);
        if (order) {
            setResponse(order, res);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}

// Controller function to handle DELETE requests for removing an order
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await orderService.remove(id);
        setResponse({}, res);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}



