// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// Task array
let tasks = [];

// Add Task
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    tasks.push(newTask);
    taskInput.value = ""; // Clear input field
    renderTasks();
  }
});

// Toggle Task Completion and Delete
taskList.addEventListener("click", (e) => {
  const taskId = e.target.closest("li").dataset.id;

  if (e.target.classList.contains("toggle-complete")) {
    tasks = tasks.map((task) =>
      task.id === parseInt(taskId) ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
  }

  if (e.target.classList.contains("delete-task")) {
    tasks = tasks.filter((task) => task.id !== parseInt(taskId));
    renderTasks();
  }
});

// Filter Tasks
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderTasks();
  });
});

// Render Tasks
function renderTasks() {
  const filter = document.querySelector(".filter-btn.active").dataset.filter;
  taskList.innerHTML = ""; // Clear list

  tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
    })
    .forEach((task) => {
      const li = document.createElement("li");
      li.className = `list-group-item ${task.completed ? "completed" : ""}`;
      li.dataset.id = task.id;

      li.innerHTML = `
        <span>${task.name}</span>
        <div>
          <button class="btn btn-sm btn-outline-success toggle-complete">
            ${task.completed ? "Undo" : "Complete"}
          </button>
          <button class="btn btn-sm btn-outline-danger delete-task">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
}
