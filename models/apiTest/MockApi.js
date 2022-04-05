const MemoryContainer = require("../containers/MemoryContainer");
const { createProductItem } = require('../../utils/test');

class MockApi extends MemoryContainer {
  constructor() {
    super("test");
  } 

  populate(qty = 5) {
    const mockedItems = [];
    for(let i = 1; i <= +qty; i++) {
      const newItem = createProductItem();
      const savedItem = this.save(newItem);
      mockedItems.push(savedItem);
    }
    return mockedItems;
  }
}

module.exports = MockApi;