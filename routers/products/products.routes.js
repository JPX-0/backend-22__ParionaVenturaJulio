const express = require('express');
const { 
  getProductsController, 
  getProductByIdController, 
  saveProductController, 
  updateProductController, 
  deleteProductController,
} = require('../../controllers/products/products.controllers');
const errorMiddleware = require('../../middlewares/errorMiddleware');

const router = express.Router();

// Routes
router.get('/', getProductsController);
router.get('/:id', getProductByIdController);
router.post('/', saveProductController);
router.put('/:id', updateProductController);
router.delete('/:id', deleteProductController);

// error middleware
router.use(errorMiddleware);


module.exports = router;