import mongoose from "mongoose";
import config from "./schema-config.js";

// Define the schema for Author
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const replyItemSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  commenterName: {
    type: String,
    required: true,
  },
  commenterPhoto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

// Define the schema for CommentItem
const commentItemSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  commenterName: {
    type: String,
    required: true,
  },
  commenterPhoto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  replies: [{
    type: [replyItemSchema],
    required: false
  }]
});

// Define the schema for Blog
const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: authorSchema,
  comments: [commentItemSchema],
}, config);

// Create the Blog model using blogSchema
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
