const MockApi = require(`../../models/apiTest/MockApi`);

const apiTest = new MockApi();

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

module.exports = { populateProductsController };