const express = require('express');
// Initialise the router
const router = express.Router();

// Bring in the methods from '../controllers/bootcamps.js'
const {
  getBootcamps,
  getBootcamp,
  updateBootcamp,
  createBootcamp,
  deleteBootcamps,
} = require('../controllers/bootcamps');

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamps);

// Export the router
module.exports = router;
