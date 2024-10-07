const ToDo = require('../models/ToDo');

// Get all tasks
const getTodos = async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new task
const addTodo = async (req, res) => {
    const { title } = req.body;

    try {
        const newTodo = new ToDo({
            title,
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update task (toggle complete)
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { isCompleted } = req.body;

    try {
        const todo = await ToDo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Task not found' });

        todo.isCompleted = isCompleted;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete task
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await ToDo.findById(id);
        if (!todo) return res.status(404).json({ message: 'Task not found' });

        await todo.remove();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo,
};
