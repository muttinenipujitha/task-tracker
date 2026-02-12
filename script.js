// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage on startup
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = ''; // Clear current list

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Inner HTML for the list item
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <span class="status">${task.completed ? 'Completed' : 'Pending'}</span>
        `;

        // Add click event to toggle completion
        li.addEventListener('click', () => {
            toggleTask(index);
        });

        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = ''; // Clear input
    taskInput.focus();
}

// Function to toggle task status
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to save to LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add task
taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial render
renderTasks();