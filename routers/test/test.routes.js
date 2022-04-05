const express = require('express');
const { populateProductsController } = require('../../controllers/products/products.controllers');
const errorMiddleware = require('../../middlewares/errorMiddleware');

const router = express.Router();

// Routes
router.get('/', populateProductsController);

// error middleware
router.use(errorMiddleware);


module.exports = router;