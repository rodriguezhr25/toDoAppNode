const Todo = require('../models/todo');

const moment = require('moment');
//new
const { validationResult } = require('express-validator/check');
exports.getAddTodo = (req, res, next) => {
    res.render('admin/edit-todo', {
        pageTitle: 'Add ToDo Item',
        path: '/admin/add-item',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    })

};
exports.getEditTodo = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const todoId = req.params.todoId;
    Todo.findById(todoId)
        .then(todo => {
            if (!todo) {
                return res.redirect('/');
            }
            console.log(todo);
            res.render('admin/edit-todo', {
                pageTitle: 'Edit Item',
                path: '/admin/edit-todo',
                editing: editMode,
                todo: todo,
                moment: moment,
                hasError: false,
                errorMessage: null,
                validationErrors: []
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

}


exports.postAddTodo = (req, res, next) => {

    const title = req.body.title;
    const subject = req.body.subject;
    const type = req.body.type;
    const dueDate = req.body.dueDate;
    const description = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('admin/edit-todo', {
            pageTitle: 'Add Item',
            path: '/admin/add-todo',
            editing: false,
            hasError: true,
            todo: {
                title: title,
                subject: subject,
                type: type,
                dueDate: dueDate,
                description: description

            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const todo = new Todo({
        // _id: new mongoose.Types.ObjectId('5badf72403fd8b5be0366e81'),
        title: title,
        subject: subject,
        type: type,
        dueDate: dueDate,
        description: description,
        userId: req.user
    });
    todo
        .save()
        .then(result => {
            // console.log(result);
            console.log('Item added');
            res.redirect('/admin/todos');
        })
        .catch(err => {

            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postEditTodo = (req, res, next) => {
    const todoId = req.body.todoId;
    const title = req.body.title;
    const subject = req.body.subject;
    const type = req.body.type;
    const dueDate = req.body.dueDate;
    const description = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-todo', {
            pageTitle: 'Edit Todo',
            path: '/admin/edit-todo',
            editing: true,
            hasError: true,
            todo: {
                title: updatedTitle,
                subject: subject,
                type: type,
                dueDate: dueDate,
                description: description,
                _id: todoId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    Todo.findById(todoId)
        .then(todo => {
            if (todo.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            todo.title = title;
            todo.subject = subject;
            todo.type = type;
            todo.dueDate = dueDate;
            todo.description = description;
            return todo.save().then(result => {
                console.log('UPDATED ITEM!');
                res.redirect('/admin/todos');
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getTodoList = (req, res, next) => {

    Todo.find({ userId: req.user._id })
        .then(items => {

            res.render('admin/todo-list', {
                todoItems: items,
                pageTitle: 'Todo List',
                path: '/admin/todos',
                moment: moment
            });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.getTodoActive = (req, res, next) => {

    Todo.find({ 'status': false, userId: req.user._id })
        .then(items => {

            res.render('admin/todo-list', {
                todoItems: items,
                pageTitle: 'Todo Actives',
                path: '/admin/active',
                moment: moment
            });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.getTodoCompleted = (req, res, next) => {

    Todo.find({ 'status': true, userId: req.user._id })
        .then(items => {

            res.render('admin/todo-list', {
                todoItems: items,
                pageTitle: 'Todo List',
                path: '/admin/completed',
                moment: moment
            });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
exports.postDeleteTodo = (req, res, next) => {
    const todoId = req.body.todoId;

    Todo.deleteOne({ _id: todoId, userId: req.user._id })
        .then(() => {
            console.log('DESTROYED ITEM');
            res.redirect('/admin/todos');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
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
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });


};