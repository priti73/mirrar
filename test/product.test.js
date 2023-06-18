// Import necessary modules and dependencies
const { expect } = require('chai');
const Product = require('../models/products');
const Variant = require('../models/variants');

describe('Product and Variant Model', () => {
  //Test Product creation and retrieval
  describe('Product', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test description',
        price: 9.99,
      };

      const createdProduct = await Product.create(productData);

      expect(createdProduct.name).to.equal(productData.name);
      expect(createdProduct.description).to.equal(productData.description);
      expect(createdProduct.price).to.equal(productData.price);
    });

    it('should retrieve the created product', async () => {
      const productName = 'Test Product';

      const retrievedProduct = await Product.findOne({
        where: { name: productName },
      });

      expect(retrievedProduct.name).to.equal(productName);
    });
  });

  // // Test Variant creation and retrieval
  // describe('Variant', () => {
  //   it('should create a new variant associated with a product', async () => {
  //     const productData = {
  //       name: 'Test Product2',
  //       description: 'This is a test description for the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ipsum at ipsum consequat aliquet. In hendrerit cursus est, at commodo tellus facilisis nec.',
  //       price: 9.99,
  //     };

  //     const createdProduct = await Product.create(productData);
  //     const variantData = {
  //       name: 'Test Variant',
  //       sku: 'TV-SKU',
  //       stockCount: 9, // Make sure the value is assigned correctly
  //       additionalCost: 2.99,
  //       ProductId: createdProduct.id,
  //     };

  //     const createdVariant = await Variant.create(variantData);
  //     console.log("?////////////////",createdVariant)

  //     expect(createdVariant.name).to.equal(variantData.name);
  //     expect(createdVariant.sku).to.equal(variantData.sku);
  //     expect(createdVariant.stockCount).to.equal(variantData.stockCount);
  //     expect(createdVariant.additionalCost).to.equal(variantData.additionalCost);
  //     expect(createdVariant.ProductId).to.equal(variantData.ProductId);
  //   });

  //   it('should retrieve the created variant', async () => {
  //     const variantName = 'Test Variant';

  //     const retrievedVariant = await Variant.findOne({
  //       where: { name: variantName },
  //     });

  //     expect(retrievedVariant.name).to.equal(variantName);
  //   });
  // });
});
