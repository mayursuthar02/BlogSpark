const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

mongoose.connect(process.env.MONGODB_URL);
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB', err.message);
})

module.exports = mongoose.connection;
