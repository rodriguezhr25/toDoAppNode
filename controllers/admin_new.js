const Todo = require('../models/todo');

const moment = require('moment');
//new

exports.getAddTodo = (req, res, next) => {
    res.render('admin/edit-todo', {
        pageTitle: 'Add ToDo Item',
        path: '/admin/add-item',
        editing: false
    })

};

exports.postAddTodo = (req, res, next) => {

    const title = req.body.title;
    const subject = req.body.subject;
    const type = req.body.type;
    const dueDate = req.body.dueDate;
    const description = req.body.description;
 
    const todo = new Todo(
        { title: title,
          subject: subject, 
          type: type, 
          dueDate: dueDate,
          description: description,  
          userId: req.user
        }
    );
    todo.save()
        .then(result => {
            // console.log(result);
            console.log('Item added');
            
           res.redirect('/admin/todos');
        })
        .catch(err => {
            console.log(err);
        });
};
exports.getTodoList = (req, res, next) => {
    
    Todo.find()
    .then(items => {

        res.render('admin/todo-list',
            {
                todoItems: items,
                pageTitle: 'Todo List',
                path: '/admin/todos',
                moment: moment 
            });
    }).catch(err => {
        console.log(err);
    })
        .catch(err => console.log(err));
};
exports.getTodoActive = (req, res, next) => {
    
    Todo.find({'status' : false})
    .then(items => {

        res.render('admin/todo-list',
            {
                todoItems: items,
                pageTitle: 'Todo Actives',
                path: '/admin/active',
                moment: moment 
            });
    }).catch(err => {
        console.log(err);
    })
        .catch(err => console.log(err));
};
exports.getTodoCompleted = (req, res, next) => {
    
    Todo.find({'status' : true})
    .then(items => {

        res.render('admin/todo-list',
            {
                todoItems: items,
                pageTitle: 'Todo List',
                path: '/admin/completed',
                moment: moment 
            });
    }).catch(err => {
        console.log(err);
    })
        .catch(err => console.log(err));
};
exports.postDeleteTodo = (req, res, next) => {
    const todoId = req.body.todoId;

  
      Todo.findOneAndRemove(todoId)
        .then(result => {
            res.redirect('/admin/todos');
        })
        .catch(err => console.log(err)); 
};


exports.postCompleteTodo = (req, res, next) => {
    const todoId = req.body.todoId;
    
   
   
    Todo.findById(todoId)
    .then(item => {
        item.status = true; 
       
        return item.save()
    })
    .then(result => {
        console.log('Updated item');
        res.redirect('/admin/todos');
    })
    .catch(err => {
            console.log(err);
    });


};
