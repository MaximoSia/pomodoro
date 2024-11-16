const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const taskSelector = document.getElementById('selected-task');

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert('Task cannot be empty!');

  const li = createTaskElement(taskText);
  tasksList.appendChild(li);

  const option = document.createElement('option');
  option.value = taskText;
  option.textContent = taskText;
  taskSelector.appendChild(option);

  taskInput.value = '';
}

// Function to create a task element
function createTaskElement(taskText) {
  const li = document.createElement('li');
  li.className = 'task-item';

  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;
  taskSpan.className = 'task-text';
  taskSpan.addEventListener('click', () => enableEditMode(li, taskSpan));

  const editButton = document.createElement('button');
  editButton.className = 'edit-task';
  editButton.innerHTML = '✏️'; // Pencil emoji as the icon
  editButton.title = 'Edit task';
  editButton.addEventListener('click', () => enableEditMode(li, taskSpan));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-task';
  deleteButton.addEventListener('click', () => deleteTask(li, taskText));

  li.appendChild(taskSpan);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  return li;
}

// Function to enable edit mode (same as before)
function enableEditMode(taskElement, taskSpan) {
  const taskText = taskSpan.textContent;

  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskText;
  input.className = 'edit-task-input';

  const acceptButton = document.createElement('button');
  acceptButton.textContent = 'Accept';
  acceptButton.className = 'accept-edit';
  acceptButton.addEventListener('click', () => saveTaskEdit(taskElement, input, taskSpan));

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveTaskEdit(taskElement, input, taskSpan);
    }
  });

  taskElement.replaceChild(input, taskSpan);
  taskElement.insertBefore(acceptButton, taskElement.querySelector('.delete-task'));
  input.focus();
}

// Function to save edited task (same as before)
function saveTaskEdit(taskElement, input, taskSpan) {
  const newText = input.value.trim();
  if (!newText) return alert('Task cannot be empty!');

  const oldText = taskSpan.textContent;
  taskSpan.textContent = newText;

  // Update task selector
  const options = Array.from(taskSelector.options);
  const optionToUpdate = options.find(option => option.value === oldText);
  if (optionToUpdate) {
    optionToUpdate.value = newText;
    optionToUpdate.textContent = newText;
  }

  taskElement.replaceChild(taskSpan, input);
  const acceptButton = taskElement.querySelector('.accept-edit');
  if (acceptButton) taskElement.removeChild(acceptButton);
}

// Function to delete a task (same as before)
function deleteTask(taskElement, taskText) {
  tasksList.removeChild(taskElement);

  const options = Array.from(taskSelector.options);
  const optionToRemove = options.find(option => option.value === taskText);
  if (optionToRemove) {
    taskSelector.removeChild(optionToRemove);
  }
}

// Add event listeners
addTaskButton.addEventListener('click', addTask);

// Add event listener for "Enter" key on task input
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
