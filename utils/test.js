const faker = require(`faker`);

faker.locale = `es`;

const createProductItem = () => {
  return {
    nameProduct: faker.commerce.product(),
    priceProduct: faker.commerce.price(),
    imageProduct: faker.image.business()
  }
};

module.exports = { createProductItem };