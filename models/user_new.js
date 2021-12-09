const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    todoList: {
        items:
            [
                {
                    todoId: { 
                        type: Schema.Types.ObjectId , 
                        ref: 'Todo' , 
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },                  
                    dueDate:{
                        type: Date,
                        required: true,
                        min: '2021-11-30',
                        max: '2100-01-01'
                    },                  
                }
            ]

    }
 

});

userSchema.methods.addToList = function(todo) {
    const updatedTodoItems = [...this.todoList.items];
    updatedTodoItems.push(
            {
                todoId: todo._id,
                title: todo.title,
                dueDate: todo.dueDate
            });


    const updatedTodo = {
        items: updatedTodoItems
    };
    this.todoList = updatedTodo;
    return this.save();
};

userSchema.methods.deleteItemFromList = function(todoId){
    const updatedTodoItems = this.todoList.items.filter(item => {
        return item.todoId.toString() !== todoId.toString();
    });
    this.todoList.items = updatedTodoItems;
    return this.save();
};

userSchema.methods.clearList = function() {
    this.todoList = { items: [] };
    return this.save();
  };
  
module.exports = mongoose.model('User', userSchema);
