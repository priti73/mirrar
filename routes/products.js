const route=require("express").Router();
const productsController=require("../controllers/products")

route.get("/products",productsController.getAllProducts)
route.post('/products', productsController.postProducts);
route.patch('/products/:productId', productsController.updateProduct);
route.delete('/products/:id', productsController.deleteProduct);
route.get('/search', productsController.searchProducts);

module.exports=route