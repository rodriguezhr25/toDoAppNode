const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema =  new Schema({
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    dueDate:{
      type: Date,
      required: true,
      min: '2021-11-30',
      max: '2100-01-01'
    },
    description:{
      type: String,
      required: true
    },
    userId:{
      type: Schema.Types.ObjectId,
      ref: 'User',
    
    }

});

module.exports = mongoose.model('Todo', itemSchema);

