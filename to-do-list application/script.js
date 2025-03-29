document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  let taskList = document.getElementById("taskList");
  let li = document.createElement("li");
  li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <span class="delete" onclick="deleteTask(this)">❌</span>
    `;

  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
}

function toggleComplete(task) {
  task.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(task) {
  task.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.innerText.replace("❌", "").trim(),
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.innerHTML = `
            <span onclick="toggleComplete(this)">${task.text}</span>
            <span class="delete" onclick="deleteTask(this)">❌</span>
        `;
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}
