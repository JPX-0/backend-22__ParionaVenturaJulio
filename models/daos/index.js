const { ENV: { PERS } } = require('../../config');

let ProductsDao;

switch(PERS) {
  case 'firebase':
    ProductsDao = require('./menssages/FirebaseMessagesDao');
    // CartsDao = require('./carts/FirebaseCartsDao');
    break;
  case 'mongo':
    // ProductsDao = require('./menssages/MongoProductsDao');
    // CartsDao = require('./carts/MongoCartsDao');
    break;
  case 'file':
    break;
  default:
    throw new Error('Invalid persistent method');
}

module.exports = {
  ProductsDao
}