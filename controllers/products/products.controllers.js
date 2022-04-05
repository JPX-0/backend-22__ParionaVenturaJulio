const MockApi = require(`../../models/apiTest/MockApi`);
const MemoryProductsDao = require("../../models/daos/products/MemoryProductsDaos");

const productsApi = new MemoryProductsDao();
const apiTest = new MockApi();

const getProductsController = (req, res, next) => {
  try {
    res.status(200).json({ success: true, result: productsApi.getAll() });
  }
  catch(error) {
    next(error.message);
  }
}

const getProductByIdController = (req, res, next) => {
  try {
    const { id } = req.params;
    if(id && isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
    const productsResponse = productsApi.getById(id); 
    res.status(200).json({ success: true, result: productsResponse });
  }
  catch(error) {
    next(error.message);
  }
}

const saveProductController = (req, res, next) => {
  try {
    const { nameProduct, priceProduct, imageProduct } = req.body;
    if(!nameProduct || !priceProduct || !imageProduct) return res.status(400).json({ success: false, error: `Wrong body format` });
    const newProduct = productsApi.save({ nameProduct, priceProduct, imageProduct });
    res.status(200).json({ success: true, result: `Product ${newProduct} correctly stored` });
  }
  catch(error) {
    next(error.message);
  }
}

const updateProductController = (req, res, next) => {
  try {
    const { params: { id }, body: { nameProduct, priceProduct, imageProduct } } = req;
    if(isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
    if(!nameProduct || !priceProduct || !imageProduct) return res.status(400).json({ success: false, error: `Wrong body format` });
    const updatedProduct = productsApi.update(id, { nameProduct, priceProduct, imageProduct });
    if(updatedProduct) return res.status(200).json({ success: true, result: `Product updated successfully` });
    else return res.status(404).json({ success: false, error: `Product not found` });
  }
  catch(error) {
    next(error.message);
  }
}

const deleteProductController = (req, res, next) => {
  try {
    const { id } = req.params;
    if(isNaN(+id)) return res.status(400).json({ success: false, error: `The ID must be a valid number` });
    const deletedProduct = productsApi.delete(id);
    if(deletedProduct) return res.status(200).json({ success: true, result: `Product correctly eliminated` });
    else return res.status(404).json({ success: false, result: `Product not found` });
  }
  catch(error) {
    next(error.message);
  }
};

const populateProductsController = (req, res, next) => {
  try {
    const { qty } = req.query;
    if(qty && isNaN(+qty)) return res.status(400).json({ success: false, error: `The query [qty] must be a valid number` });
    res.json(apiTest.populate(qty));
  }
  catch(error) {
    next(error.message);
  }
}

module.exports = {
  getProductsController,
  getProductByIdController,
  saveProductController,
  updateProductController,
  deleteProductController,
  populateProductsController,
}