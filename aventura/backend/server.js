import express from "express";
import dotenv from 'dotenv';
import initApp from './app.js';

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize the application with the Express instance
initApp(app);

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));