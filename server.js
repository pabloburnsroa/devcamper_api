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

// Route files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

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
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

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
