import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

import initRoutes from './routers/index.js';

const init = (app) => {
    app.use(cors()); // enable all request from diff domains (CORS -> Cross Origin Resourse Sharing)
    app.use(express.json()); // Handling JSON Payloads
    app.use(express.urlencoded()); // Handling encoded urls

    // Connecting to MongDB
    mongoose.connect(process.env.MONGO_CONNECTION)
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((err) => {
            console.error('MongoDB connection error:', err);
        });

    initRoutes(app); // Initialize the routes
}

export default init;