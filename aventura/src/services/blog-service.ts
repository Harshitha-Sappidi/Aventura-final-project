import { Blog, CommentItem, ReplyItem } from "../models/blog";


const API_URL = 'http://localhost:3000/blogs';


// Function to fetch a single blog by ID
export const fetchBlogById = async (id: string): Promise<Blog> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const fetchAllBlogs = async (): Promise<Blog[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Return the JSON response parsed as an array of Blog objects
};
// Create a new blog on the server
export const createBlog = async (blogData: Omit<Blog, 'id'>): Promise<Blog> => {
    const response = await fetch(API_URL, {
        method: 'POST', // Use POST method to create a new blog
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData) 
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the newly created blog as a Blog object
};

// Update an existing blog on the server

export const updateBlog = async (blogData: Blog): Promise<Blog> => {
    const response = await fetch(`${API_URL}/${blogData.id}`, {
        method: 'PUT', // Use PUT method to update an existing blog
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json(); // Return the updated blog as a Blog object
};

// Delete a blog from the server
export const deleteBlog = async (blogId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${blogId}`, {
        method: 'DELETE' // Use DELETE method to remove the blog
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};
