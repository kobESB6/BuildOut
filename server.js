const { User }= require('./models');
const express = require('express');
const db = require('./config/connection');  // Connect to MongoDB
const routes = require('./routes');  // Import all routes


const PORT = process.env.PORT || 3001;  // Use PORT from environment or default to 3001
const app = express();

// Middleware to parse incoming requests with URL-encoded and JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the API routes
app.use('/api', routes);

// Start the server once the database connection is open
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});


    
   
 