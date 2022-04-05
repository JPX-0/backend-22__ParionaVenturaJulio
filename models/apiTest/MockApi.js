const { v4: uuid } = require(`uuid`);
const { createProductItem } = require('../../utils/test');

class MockApi {
  constructor() {
    this.items = [];
  }
  populate(qty = 5) { // Genera 5 objetos de prueba.
    const mockedItems = [];
    for(let i = 1; i <= +qty; i++) {
      const newItem = createProductItem();
      const savedItem = this.save(newItem);
      mockedItems.push(savedItem);
    }
    return mockedItems;
  }
  save(item) {
    const newItem = {
      id: uuid(),
      ...item
    }
    this.items.push(newItem);
    return newItem;
  }
}

module.exports = MockApi;