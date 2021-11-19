<<<<<<< HEAD
const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

 router.get('/products/:productId', shopController.getProduct);

 router.get('/cart', shopController.getCart);

 router.post('/cart', shopController.postCart);

 router.post('/cart-delete-item', shopController.postCartDeleteProduct);

 router.post('/create-order', shopController.postOrder);

 router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout); 

=======
const path = require('path');

const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop');

 router.get('/', shopController.getIndex);

 router.get('/products', shopController.getProducts);

 router.get('/products/:productId', shopController.getProduct);

 router.get('/cart', shopController.getCart);

 router.post('/cart', shopController.postCart);

 router.post('/cart-delete-item', shopController.postCartDeleteProduct);

 router.post('/create-order', shopController.postOrder);

 router.get('/orders', shopController.getOrders);

//router.get('/checkout', shopController.getCheckout); 

>>>>>>> 58dbb0b7dbfef9105531a0ceb479ce8b8c01ca4e
module.exports = router;