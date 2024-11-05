import {Order}  from "../models/order";

const API_URL = 'http://localhost:3000/orders';

// Function to fetch a single order by ID
export const fetchOrderById = async (id: string): Promise<Order> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

// Function to fetch all orders
export const fetchAllOrders = async (): Promise<Order[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Return the JSON response parsed as an array of Order objects
};

// Function to create a new order on the server
export const createOrder = async (orderData: Omit<Order, '_id'>): Promise<Order> => {
    const response = await fetch(API_URL, {
        method: 'POST', // Use POST method to create a new order
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData) 
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the newly created order as an Order object
};

// Function to update an existing order on the server
export const updateOrder = async (orderData: Order): Promise<Order> => {
    const response = await fetch(`${API_URL}/${orderData._id}`, {
        method: 'PUT', // Use PUT method to update an existing order
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the updated order as an Order object
};

// Function to delete an order from the server
export const deleteOrder = async (orderId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${orderId}`, {
        method: 'DELETE' // Use DELETE method to remove the order
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

// Function to fetch orders by user ID
export const fetchOrdersByUserId = async (userId: string): Promise<Order[]> => {
    const response = await fetch(`${API_URL}?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
};


