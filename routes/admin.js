
const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin_new');

const router = express.Router();
const moment = require('moment');


 router.get('/add-todo', adminController.getAddTodo );
  router.get('/edit-todo/:todoId', adminController.getEditTodo); 
  router.get('/todos', adminController.getTodoList); 
  router.get('/active', adminController.getTodoActive); 
  router.get('/completed', adminController.getTodoCompleted); 

 router.post('/add-todo', adminController.postAddTodo);
 router.post('/edit-todo', adminController.postEditTodo);
 router.post('/delete-item', adminController.postDeleteTodo);

 router.post('/complete-item', adminController.postCompleteTodo);


// // /admin/add-product => POST
//router.post('/edit-product', adminController.postEditProduct);

// // /admin/remove-product => POST
//router.post('/delete-product', adminController.postDeleteProduct);
module.exports = router;

