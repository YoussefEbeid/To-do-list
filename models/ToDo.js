const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Export the model
module.exports = mongoose.model('ToDo', ToDoSchema);
