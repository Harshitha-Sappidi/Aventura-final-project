import Blog from "../models/blog.js";

// Service function to save a new blog 
export const save = async (newBlog) => {
    const blogItem = new Blog(newBlog);
    return await blogItem.save(); // "blogItem.save();" -> this will return a promise object
}

// Service function to search for blog posts based on query parameters
export const search = async (query = {}) => {
    const result = await Blog.find(query).exec();
    return result;
}   

// Service function to retrieve a blog post by ID
export const getById = async (id) => {
    const blogItem = await Blog.findById(id).exec();
    return blogItem;
}

// Service function to update a blog post by ID
export const update = async (id, updatedBlog) => {
    const blogItem = await Blog.findByIdAndUpdate(id, updatedBlog, { new: true }).exec();
    return blogItem;
}

// Service function to remove a blog post by ID
export const remove = async (id) => {
    const blogItem = await Blog.findByIdAndDelete(id).exec();
    return blogItem;
}
