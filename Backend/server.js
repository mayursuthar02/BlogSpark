// Import Modules
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dbConnection = require('./db/connection')
const routes = require('./routes/routes')

require('dotenv').config(); // Load environment variables from .env file

// Create an instance of Express
const app = express();
// MiddleWare
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.static('public'));
// In your server code (e.g., Node.js with Express)
app.use((req, res, next) => {
    // Set cache-control headers to disable caching
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    next();
  });
  

// Use the routes
app.use('/', routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});