const express = require('express');
const dotenv = require('dotenv');

// Load config.env file so we can use the variables above
dotenv.config({ path: './config/config.env' });

// Initialise app variable
const app = express();

// To run a server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
