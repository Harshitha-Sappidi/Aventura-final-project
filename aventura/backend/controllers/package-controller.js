import { request, response } from 'express';
import * as packageService from '../services/package-service.js';
import { setError, setResponse } from './response-handler.js';


// Controller function to handle POST requests for creating packages
export const post = async (request, response) => {
    try {
        const payload = { ...request.body };
        const packageItem = await packageService.save(payload);
        if (!packageItem) {
            // Handle case where the package is not created
            response.status(400).json({ error: 'Package not created' });
        } else {
            setResponse(packageItem, response);
        }
    } catch (error) {
        setError(error, response);
    }
}

// Controller function to handle GET requests for searching packages
export const search = async (request, response) => {
    try {
        const query = {...request.query};
        const packages = await packageService.search(query);
        if (packages && packages.length > 0) {
            setResponse(packages, response);
        } else {
            response.status(404).json({ message: 'No packages found' }); // Return 404 if no packages are found
        }
    } catch (error) {
        setError(error, response)
    }
}

// Controller function to handle GET requests for filtering packages
export const filterSearch = async (request, response) => {
    try {
        const query = {...request.query};
        const packages = await packageService.filterSearch(query);
        if (packages && packages.length > 0) {
            setResponse(packages, response);
        } else {
            response.status(404).json({ message: 'No packages found' }); // Return 404 if no packages are found
        }
    } catch (error) {
        setError(error, response)
    }
}

// Controller function to handle GET requests for retrieving a single package by ID
export const get = async (request, response) => {
    try {
        const id = request.params.id;
        const packageItem = await packageService.getById(id);
        if (packageItem) {
            setResponse(packageItem, response);
        } else {
            response.status(404).json({ message: 'Package not found' }); // Return 404 if package is not found
        }
    } catch (error) {
        if (error.name === "CastError") {
            response.status(400).json({ error: "Wrong variable type for ID" });
        } else { 
            setError(error, response)
        }
    }
}

// Controller function to handle PUT requests for updating a package
export const put = async (request, response) => {
    try {
        const id = request.params.id;
        const payload = {...request.body};
        const packageItem = await packageService.update(id, payload);
        if (packageItem) {
            setResponse(packageItem, response);
        } else {
            response.status(404).json({ message: 'Package not found' }); // Return 404 if package is not found
        }
    } catch (error) {
        if (error.name === "CastError") {
            response.status(400).json({ error: "Wrong variable type for ID" });
        } else { 
            setError(error, response)
        }
    }
}

// Controller function to handle DELETE requests for removing a package
export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        await packageService.remove(id);
        setResponse({}, response);
    } catch (error) {
        if (error.name === "CastError") {
            response.status(400).json({ error: "Wrong variable type for ID" });
        } else { 
            setError(error, response)
        }
    }
}
