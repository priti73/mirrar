const { expect } = require('chai');
const { omit } = require('lodash');
const sinon = require('sinon');
const { postProducts } = require('../controllers/products');

describe('postProducts', () => {
  it('should create a single product with a single variant', async () => {
    // Mock the request and response objects
    const req = {
      body: {
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
        variants: [
          {
            variantName: 'Variant 1',
            sku: 'SKU 1',
            stockCount: 5,
            additionalCost: 2,
          },
        ],
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Call the postProducts function and assert the response
    await postProducts(req, res);

    // Assert the response
    const expectedResponse = {
      data: {
        product: {
          id: 1,
          name: 'Product 1',
          description: 'Description 1',
          price: 10,
        },
        variants: [
          {
            id: 1,
            name: 'Variant 1',
            sku: 'SKU 1',
            stockCount: 5,
            additionalCost: 2,
            productId: 1,
          },
        ],
      },
    };

    expect(res.status.calledOnceWith(201)).to.be.true;
    expect(res.json.calledOnce).to.be.true;
    expect(omit(res.json.firstCall.args[0], [
      'data.product._changed',
      'data.product._options',
      'data.product._previousDataValues',
      'data.product.isNewRecord',
      'data.product.uniqno',
      'data.variants._changed',
      'data.variants._options',
      'data.variants._previousDataValues',
      'data.variants.isNewRecord',
      'data.variants.uniqno',
    ])).to.deep.equal(expectedResponse);
  });
});
