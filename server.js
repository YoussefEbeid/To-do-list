const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/todos', todoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
