const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Product = require("../models/products");
const Variant = require("../models/variants");
const { Op } = require("sequelize");
exports.getAllProducts = async (req, res) => {
  try {
    const query = await sequelize.query(
      `
      SELECT
        p.name,
        p.description,
        v.name AS variantName,
        v.stockCount,
        ROUND((p.price + v.additionalCost), 2) AS totalPrice
      FROM
        mirrar.products p
      INNER JOIN
        mirrar.variants v ON p.id = v.ProductId;
      `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    res.status(200).json({ data: query });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'Internal error' });
  }
};



exports.postProducts = async (req, res) => {
  try {
    const requestData = req.body;

    if (Array.isArray(requestData)) {
      // Case: Multiple products with multiple variants for each product
      const createdProducts = [];

      for (const productData of requestData) {
        const { name, description, price, variants } = productData;

        // Create a new product using the Product model
        const createdProduct = await Product.create({
          name,
          description,
          price,
        });

        // Create variants if they exist
        if (Array.isArray(variants)) {
          const createdVariants = [];

          for (const variantData of variants) {
            const { variantName, sku, stockCount, additionalCost } =
              variantData;

            // Create a new variant associated with the product
            const createdVariant = await Variant.create({
              name: variantName,
              sku,
              stockCount,
              additionalCost,
              productId: createdProduct.id, // Associate the variant with the created product
            });

            createdVariants.push(createdVariant);
          }

          createdProducts.push({
            product: createdProduct,
            variants: createdVariants,
          });
        } else {
          // Case: Multiple product with single variant
          const { variantName, sku, stockCount, additionalCost } = variants;

          // Create a new variant associated with the product
          const createdVariant = await Variant.create({
            name: variantName,
            sku,
            stockCount,
            additionalCost,
            productId: createdProduct.id, // Associate the variant with the created product
          });

          createdProducts.push({
            product: createdProduct,
            variants: [createdVariant],
          });
        }
      }

      res.status(201).json({ data: createdProducts });
    } else {
      //single product with multiple variants
      const { name, description, price, variants } = req.body;

      // Create a new product using the Product model
      const createdProduct = await Product.create({
        name,
        description,
        price,
      });

      // Create variants if they exist
      if (Array.isArray(variants)) {
        const createdVariants = [];

        for (const variantData of variants) {
          const { variantName, sku, stockCount, additionalCost } = variantData;

          // Create a new variant associated with the product
          const createdVariant = await Variant.create({
            name: variantName,
            sku,
            stockCount,
            additionalCost,
            productId: createdProduct.id, // Associate the variant with the created product
          });

          createdVariants.push(createdVariant);
        }

        res.status(201).json({
          data: { product: createdProduct, variants: createdVariants },
        });
      } else {
        // Case: Single product with single variant
        const { variantName, sku, stockCount, additionalCost } = variants;

        // Create a new variant associated with the product
        const createdVariant = await Variant.create({
          name: variantName,
          sku,
          stockCount,
          additionalCost,
          productId: createdProduct.id, // Associate the variant with the created product
        });

        res.status(201).json({
          data: { product: createdProduct, variants: [createdVariant] },
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProductData = req.body;

    // Find the product by ID
    const product = await Product.findByPk(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Update the product fields with the new data
    product.name = updatedProductData.name || product.name;
    product.description = updatedProductData.description || product.description;
    product.price = updatedProductData.price || product.price;

    // Save the updated product
    await product.save();

    // Check if variants are included in the update data
    if (updatedProductData.variants) {
      // Iterate through the variants and update each one
      for (const updatedVariantData of updatedProductData.variants) {
        const variantId = updatedVariantData.id;

        // Find the variant by ID
        const variant = await Variant.findByPk(variantId);

        // Check if the variant exists and belongs to the product
        if (variant && variant.ProductId === product.id) {
          // Update the variant fields with the new data
          variant.name = updatedVariantData.name || variant.name;
          variant.sku = updatedVariantData.sku || variant.sku;
          variant.stockCount =
            updatedVariantData.stockCount || variant.stockCount;
          variant.additionalCost =
            updatedVariantData.additionalCost || variant.additionalCost;

          // Save the updated variant
          await variant.save();
        }
      }
    }

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by its ID and include the associated variants using the alias
    const product = await Product.findOne({
      where: { id: productId },
      include: [{ model: Variant, as: "Variants" }],
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    // Delete the associated variants
    await Variant.destroy({ where: { ProductId: productId } });

    // Delete the product
    await product.destroy();

    res
      .status(200)
      .json({ msg: "Product and associated variants deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error" });
  }
};
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    // Search for products matching the search term in name, description, or variant name
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${q}%` } },
          { description: { [Op.like]: `%${q}%` } },
          { "$Variants.name$": { [Op.like]: `%${q}%` } },
        ],
      },
      include: {
        model: Variant,
        as: "Variants",
        attributes: ["name", "additionalCost", "sku", "stockCount"],
      },
      attributes: ["id", "name", "description", "price"],
    });

    const productsWithTotalPrice = products.map((product) => {
      const variants = product.Variants.map((variant) => {
        const totalPrice = product.price + variant.additionalCost;
        return {
          name: variant.name,
          totalPrice,
          sku: variant.sku,
          stockCount: variant.stockCount,
        };
      });

      return {
        name: product.name,
        description: product.description,
        variants,
      };
    });

    res.json({ data: productsWithTotalPrice });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal error" });
  }
};
