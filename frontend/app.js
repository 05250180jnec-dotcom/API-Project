// Define the API URL (relative because we are serving from the same origin)
const API_URL = '/tasks';

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');

// Fetch and render tasks on load
document.addEventListener('DOMContentLoaded', fetchTasks);

// Handle form submission (Create Task)
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });

    if (!response.ok) throw new Error('Failed to create task');

    taskInput.value = ''; // Clear input
    fetchTasks(); // Refresh list
  } catch (error) {
    showError(error.message);
  }
});

// Fetch all tasks (Read)
async function fetchTasks() {
  loading.classList.remove('hidden');
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    
    const tasks = await response.json();
    renderTasks(tasks);
    errorMessage.classList.add('hidden');
  } catch (error) {
    showError(error.message);
  } finally {
    loading.classList.add('hidden');
  }
}

// Render tasks to the screen
function renderTasks(tasks) {
  taskList.innerHTML = ''; // Clear current list

  if (tasks.length === 0) {
    taskList.innerHTML = '<li style="justify-content:center; color:#7f8c8d;">No tasks yet. Add one above!</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <div class="task-content">
        <input type="checkbox" ${task.completed ? 'checked' : ''} 
               onchange="toggleTask(${task.id}, this.checked)">
        <span class="task-title">${task.title}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskList.appendChild(li);
  });
}

// Toggle task completion status (Update)
async function toggleTask(id, completed) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });

    if (!response.ok) throw new Error('Failed to update task');
    
    fetchTasks(); // Refresh list to update styling
  } catch (error) {
    showError(error.message);
  }
}

// Delete a task (Delete)
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete task');
    
    fetchTasks(); // Refresh list
  } catch (error) {
    showError(error.message);
  }
}

// Helper to show errors
function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
  setTimeout(() => errorMessage.classList.add('hidden'), 3000);
}