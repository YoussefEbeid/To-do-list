document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list');
    const newTaskInput = document.getElementById('new-task');

    // Load tasks from local storage (optional)
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to render the tasks
    function renderTodos() {
        todoList.innerHTML = '';

        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.isCompleted ? 'completed' : '';
            li.innerHTML = `
        <span>${todo.title}</span>
        <div>
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

            // Complete task event
            li.querySelector('.complete-btn').addEventListener('click', () => {
                todos[index].isCompleted = !todos[index].isCompleted;
                saveAndRenderTodos();
            });

            // Delete task event
            li.querySelector('.delete-btn').addEventListener('click', () => {
                todos.splice(index, 1);
                saveAndRenderTodos();
            });

            todoList.appendChild(li);
        });
    }

    // Function to save tasks to local storage (optional)
    function saveAndRenderTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    // Add a new task
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newTask = newTaskInput.value.trim();
        if (newTask === '') return;

        todos.push({ title: newTask, isCompleted: false });
        newTaskInput.value = '';
        saveAndRenderTodos();
    });

    // Initial render
    renderTodos();
});
