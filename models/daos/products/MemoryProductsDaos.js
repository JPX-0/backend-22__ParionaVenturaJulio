const MemoryContainer = require('../../containers/MemoryContainer');

class MemoryProductsDao extends MemoryContainer {
  constructor() {
    super('products');
  }
}

module.exports = MemoryProductsDao;