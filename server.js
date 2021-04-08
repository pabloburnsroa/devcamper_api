const express = require('express');
const dotenv = require('dotenv');
// Bring in 3rd party middleware Morgan
const morgan = require('morgan');

const errorHandler = require('./middleware/error');
// Connect MongoDB
const connectDB = require('./config/db');

// Load config.env file so we can use the variables above
dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

// Route files - bring the files in from bootcamps.js
const bootcamps = require('./routes/bootcamps');

// Initialise app variable
const app = express();

// Body parser
app.use(express.json());

// Development logger middleware - only run in dev env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount the router to specific URL
app.use('/api/v1/bootcamps', bootcamps);

// Error handler
app.use(errorHandler);

// To run a server
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
