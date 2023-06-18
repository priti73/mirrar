const { expect } = require('chai');
const sinon = require('sinon');
const  updateProduct  = require('../controllers/products');

describe('updateProduct', () => {
  it('should update a product and its variants', async () => {
    // Mock the request and response objects
    const req = {
      params: {
        productId: 1,
      },
      body: {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 20,
        variants: [
          {
            id: 1,
            name: 'Updated Variant 1',
            sku: 'Updated SKU 1',
            stockCount: 10,
            additionalCost: 5,
          },
          {
            id: 2,
            name: 'Updated Variant 2',
            sku: 'Updated SKU 2',
            stockCount: 20,
            additionalCost: 10,
          },
        ],
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Mock the Product model's findByPk and save methods
    const product = {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 10,
      save: sinon.stub().resolves(),
    };

    const findByPkStub = sinon.stub().resolves(product);
    const Product = {
      findByPk: findByPkStub,
    };

    // Mock the Variant model's findByPk and save methods
    const variants = [
      {
        id: 1,
        name: 'Variant 1',
        sku: 'SKU 1',
        stockCount: 5,
        additionalCost: 2,
        save: sinon.stub().resolves(),
      },
      {
        id: 2,
        name: 'Variant 2',
        sku: 'SKU 2',
        stockCount: 15,
        additionalCost: 8,
        save: sinon.stub().resolves(),
      },
    ];

    const findByPkVariantStub = sinon.stub();
    findByPkVariantStub.withArgs(1).resolves(variants[0]);
    findByPkVariantStub.withArgs(2).resolves(variants[1]);

    const Variant = {
      findByPk: findByPkVariantStub,
    };

    // Call the updateProduct function and assert the response
    await updateProduct(req, res);

    // Assert the response
    expect(res.status.calledOnceWith(200)).to.be.true;
    expect(res.json.calledOnceWith({ msg: 'Product updated successfully' })).to.be.true;

    // Assert the updated product data
    expect(product.name).to.equal('Updated Product');
    expect(product.description).to.equal('Updated Description');
    expect(product.price).to.equal(20);
    expect(product.save.calledOnce).to.be.true;

    // Assert the updated variant data
    expect(variants[0].name).to.equal('Updated Variant 1');
    expect(variants[0].sku).to.equal('Updated SKU 1');
    expect(variants[0].stockCount).to.equal(10);
    expect(variants[0].additionalCost).to.equal(5);
    expect(variants[0].save.calledOnce).to.be.true;

    expect(variants[1].name).to.equal('Updated Variant 2');
    expect(variants[1].sku).to.equal('Updated SKU 2');
    expect(variants[1].stockCount).to.equal(20);
    expect(variants[1].additionalCost).to.equal(10);
    expect(variants[1].save.calledOnce).to.be.true;
  });

  it('should return a 404 error if the product is not found', async () => {
    // Mock the request and response objects
    const req = {
      params: {
        productId: 1,
      },
      body: {
        name: 'Updated Product',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Mock the Product model's findByPk method to return null
    const findByPkStub = sinon.stub().resolves(null);
    const Product = {
      findByPk: findByPkStub,
    };

    // Call the updateProduct function and assert the response
    await updateProduct(req, res);

    // Assert the response
    expect(res.status.calledOnceWith(404)).to.be.true;
    expect(res.json.calledOnceWith({ msg: 'Product not found' })).to.be.true;
  });

  it('should handle internal server errors', async () => {
    // Mock the request and response objects
    const req = {
      params: {
        productId: 1,
      },
      body: {
        name: 'Updated Product',
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Mock the Product model's findByPk method to throw an error
    const findByPkStub = sinon.stub().throws(new Error('Internal error'));
    const Product = {
      findByPk: findByPkStub,
    };

    // Call the updateProduct function and assert the response
    await updateProduct(req, res);

    // Assert the response
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ msg: 'Internal error' })).to.be.true;
  });
});
