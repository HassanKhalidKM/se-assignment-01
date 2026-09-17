/**
 * TaskFlow — Task Manager Application
 * Author : Muhammad Hassan Khalid (FA25-BCS-132)
 * Course : Software Engineering Assignment 01
 */

/* ─── State ──────────────────────────────────────────────────────────────── */
var STORAGE_KEY = 'taskflow_tasks';
var currentFilter = 'all';
var tasks = [];

/* ─── DOM References ─────────────────────────────────────────────────────── */
var form           = document.getElementById('task-form');
var taskInput      = document.getElementById('task-input');
var taskList       = document.getElementById('task-list');
var emptyState     = document.getElementById('empty-state');
var pendingCount   = document.getElementById('pending-count');
var taskCountLabel = document.getElementById('task-count-label');
var clearBtn       = document.getElementById('clear-completed-btn');
var filterBtns     = document.querySelectorAll('.filter-btn');

/* ─── Persistence ────────────────────────────────────────────────────────── */
// BUG: intentional syntax error for CI failure demo
var broken = (;
function loadTasks() {
  var stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      tasks = [];
    }
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/* ─── Task Helpers ───────────────────────────────────────────────────────── */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function createTask(text) {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function addTask(text) {
  if (!text || !text.trim()) { return; }
  var task = createTask(text);
  tasks.unshift(task); // newest first
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(function (t) {
    if (t.id === id) {
      return Object.assign({}, t, { completed: !t.completed });
    }
    return t;
  });
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(function (t) { return !t.completed; });
  saveTasks();
  render();
}

/* ─── Filtering ──────────────────────────────────────────────────────────── */
function getFilteredTasks() {
  if (currentFilter === 'active') {
    return tasks.filter(function (t) { return !t.completed; });
  }
  if (currentFilter === 'completed') {
    return tasks.filter(function (t) { return t.completed; });
  }
  return tasks;
}

/* ─── Render ─────────────────────────────────────────────────────────────── */
function buildTaskElement(task) {
  var li       = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' completed' : '');
  li.setAttribute('role', 'listitem');
  li.dataset.id = task.id;

  // Checkbox
  var checkbox       = document.createElement('button');
  checkbox.className = 'task-checkbox';
  checkbox.setAttribute('aria-label', task.completed ? 'Mark incomplete' : 'Mark complete');
  checkbox.setAttribute('aria-pressed', String(task.completed));
  checkbox.addEventListener('click', function () { toggleTask(task.id); });

  // Text
  var span       = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // Delete button
  var del       = document.createElement('button');
  del.className = 'delete-btn';
  del.setAttribute('aria-label', 'Delete task: ' + task.text);
  del.textContent = '✕';
  del.addEventListener('click', function () { deleteTask(task.id); });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(del);
  return li;
}

function render() {
  var filtered    = getFilteredTasks();
  var pendingNum  = tasks.filter(function (t) { return !t.completed; }).length;
  var totalLabel  = tasks.length === 1 ? '1 task' : tasks.length + ' tasks';

  // Update header badge
  pendingCount.textContent = String(pendingNum);

  // Update footer count
  taskCountLabel.textContent = totalLabel;

  // Clear list
  taskList.innerHTML = '';

  // Show empty state?
  if (filtered.length === 0) {
    emptyState.classList.add('visible');
    // Tweak empty message based on filter
    var title    = emptyState.querySelector('.empty-title');
    var subtitle = emptyState.querySelector('.empty-subtitle');
    if (currentFilter === 'completed') {
      title.textContent    = 'No completed tasks';
      subtitle.textContent = 'Complete some tasks to see them here.';
    } else if (currentFilter === 'active') {
      title.textContent    = 'All done!';
      subtitle.textContent = 'No pending tasks — great job! 🎉';
    } else {
      title.textContent    = 'No tasks yet';
      subtitle.textContent = 'Add your first task above to get started!';
    }
  } else {
    emptyState.classList.remove('visible');
    var fragment = document.createDocumentFragment();
    filtered.forEach(function (task) {
      fragment.appendChild(buildTaskElement(task));
    });
    taskList.appendChild(fragment);
  }
}

/* ─── Event Listeners ────────────────────────────────────────────────────── */
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var text = taskInput.value;
  if (!text.trim()) { return; }
  addTask(text);
  taskInput.value = '';
  taskInput.focus();
});

clearBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    currentFilter = btn.dataset.filter;

    // Update ARIA pressed states and active class
    filterBtns.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    render();
  });
});

/* ─── Init ───────────────────────────────────────────────────────────────── */
loadTasks();
render();
