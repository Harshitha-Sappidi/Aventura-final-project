import { request, response } from 'express';
import * as blogService from '../services/blog-service.js'; // Adjust import path if needed
import { setError, setResponse } from './response-handler.js';

// Controller function to handle POST requests for creating blogs
export const post = async (req, res) => {
    try {
        const payload = { ...req.body };
        const blog = await blogService.save(payload);
        if (!blog) {
            res.status(400).json({ error: 'Blog not created' });
        } else {
            setResponse(blog, res);
        }
    } catch (error) {
        setError(error, res);
    }
}

// Controller function to handle GET requests for searching blog 
export const search = async (req, res) => {
    try {
        const query = { ...req.query };
        const blogs = await blogService.search(query);
        if (blogs && blogs.length > 0) {
            setResponse(blogs, res);
        } else {
            res.status(404).json({ message: 'No blogs found' });
        }
    } catch (error) {
        setError(error, res);
    }
}



// Controller function to handle GET requests for retrieving a single blog by ID
export const get = async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await blogService.getById(id);
        if (blog) {
            setResponse(blog, res);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}

// Controller function to handle PUT requests for updating a blog
export const put = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = { ...req.body };
        const blog = await blogService.update(id, payload);
        if (blog) {
            setResponse(blog, res);
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}

// Controller function to handle DELETE requests for removing a blog post
export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await blogService.remove(id);
        setResponse({}, res);
    } catch (error) {
        if (error.name === "CastError") {
            res.status(400).json({ error: "Wrong variable type for ID" });
        } else {
            setError(error, res);
        }
    }
}
