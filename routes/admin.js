<<<<<<< HEAD
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/add-product => GET
 router.get('/add-product', adminController.getAddProduct );

// // /admin/products => GET
  router.get('/products', adminController.getProducts); 

// // /admin/add-product => POST
 router.post('/add-product', adminController.postAddProduct);

 router.get('/edit-product/:productId', adminController.getEditProduct); 

// // /admin/add-product => POST
router.post('/edit-product', adminController.postEditProduct);

// // /admin/remove-product => POST
router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;
=======
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/add-product => GET
 router.get('/add-product', adminController.getAddProduct );

// // /admin/products => GET
  router.get('/products', adminController.getProducts); 

// // /admin/add-product => POST
 router.post('/add-product', adminController.postAddProduct);

 router.get('/edit-product/:productId', adminController.getEditProduct); 

// // /admin/add-product => POST
router.post('/edit-product', adminController.postEditProduct);

// // /admin/remove-product => POST
router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;
>>>>>>> 58dbb0b7dbfef9105531a0ceb479ce8b8c01ca4e