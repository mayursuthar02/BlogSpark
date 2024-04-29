const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  blogImg: {
    type: String, // Assuming you store the image URL
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Sets the default value to the current date
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
