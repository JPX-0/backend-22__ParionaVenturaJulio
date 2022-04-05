const { ENV: { PERS } } = require('../../utils/config');

let MessagesDao;

switch(PERS) {
  case 'firebase':
    MessagesDao = require('./messages/FirebaseMessagesDao');
    // CartsDao = require('./carts/FirebaseCartsDao');
    break;
  default:
    throw new Error('Invalid persistent method');
}

module.exports = {
  MessagesDao
}