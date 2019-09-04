const productRoute = require('express').Router();
const productService = require('../webServices/productController');
const auth = require('../middlewares/auth');

productRoute.post('/addProduct', auth.basicAuthUser, auth.verifyToken, productService.addProduct);
productRoute.post('/deleteProduct', auth.basicAuthUser, auth.verifyToken, productService.deleteProduct);
productRoute.post('/modifyProduct', auth.basicAuthUser, auth.verifyToken, productService.modifyProduct);
productRoute.post('/getProductList',  productService.getProductList);
productRoute.post('/buyProduct', auth.basicAuthUser, auth.verifyToken, productService.buyProduct);

module.exports = productRoute;

