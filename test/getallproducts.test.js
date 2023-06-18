const { expect } = require('chai');
const sinon = require('sinon');
const sequelize = require('../util/database');
const { getAllProducts } = require('../controllers/products');

describe('getAllProducts', () => {
  it('should return a list of products with their variants and total prices', async () => {
    // Mock the response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the getAllProducts function
    await getAllProducts({}, res);

    // Assert the response
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.have.property('data').that.is.an('array');
    
  });
});

