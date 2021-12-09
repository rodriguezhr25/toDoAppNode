
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin_new');

const router = express.Router();
const moment = require('moment');

// /admin/add-product => GET
 router.get('/add-todo', adminController.getAddTodo );

// // /admin/products => GET
  router.get('/todos', adminController.getTodoList); 
  router.get('/active', adminController.getTodoActive); 
  router.get('/completed', adminController.getTodoCompleted); 
// // /admin/add-product => POST
 router.post('/add-todo', adminController.postAddTodo);

 router.post('/delete-item', adminController.postDeleteTodo);

 router.post('/complete-item', adminController.postCompleteTodo);
// router.get('/edit-product/:productId', adminController.getEditProduct); 

// // /admin/add-product => POST
//router.post('/edit-product', adminController.postEditProduct);

// // /admin/remove-product => POST
//router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;

