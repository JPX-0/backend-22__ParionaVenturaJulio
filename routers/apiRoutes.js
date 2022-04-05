const express = require(`express`);
const usersRoutes = require(`./messages/messages.routes`);
const testRoutes = require(`./test/test.routes`);
const productsRoutes = require(`./products/products.routes`);

const router = express.Router();

// Routes
router.use(`/products-test`, testRoutes);
router.use(`/products`, productsRoutes);
router.use(`/messages`, usersRoutes);

module.exports = router;