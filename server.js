const express = require('express');
const dotenv = require('dotenv');
// Bring in 3rd party middleware Morgan
const morgan = require('morgan');
// Route files - bring the files in from bootcamps.js
const bootcamps = require('./routes/bootcamps');

// Load config.env file so we can use the variables above
dotenv.config({ path: './config/config.env' });

// Initialise app variable
const app = express();

// Development logger middleware - only run in dev env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount the router to specific URL
app.use('/api/v1/bootcamps', bootcamps);

// To run a server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
