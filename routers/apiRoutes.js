const express = require(`express`);
const usersRoutes = require(`./messages/messages.routes`);
const testRoutes = require(`./test/test.routes`);

const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes
router.use(`/products-test`, testRoutes);
router.use(`/messages`, usersRoutes);

module.exports = router;