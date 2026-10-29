// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const submit = document.getElementById("task-form");
const priorityselect = document.getElementById("priority-select");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const error = document.getElementById("error");
//נרשם בסוף כולל הבונוס
// function createTask(event) {
//     event.preventDefault();
//     if (taskInput.value.trim() !== "") {

//         let liTask = document.createElement("li");
//         liTask.className = `priority-${priorityselect.value}`;

//         let spanChild = document.createElement("span");
//         spanChild.className = "text";
//         spanChild.textContent = taskInput.value.trim();
//         let buttonChild = document.createElement("button");
//         buttonChild.className = "delete";
//         buttonChild.textContent = "x";

//         liTask.appendChild(spanChild);
//         liTask.appendChild(buttonChild);
//         taskList.appendChild(liTask);
//         error.hidden = true;
//         taskInput.value = "";
//         taskInput.focus();
//         leftTasks();
//     } else {
//         error.textContent = "Please type a task";
//         error.hidden = false;

//     }

// }
// submit.addEventListener('submit', createTask)


// Step 2: click a task to toggle the "done" class
// Step 3: delete with the x button (one listener on the ul - event delegation)

function handleTaskClick(event) {
    const task = event.target.closest("li");

    if (!task) return;

    if (event.target.classList.contains("delete")) {
        task.remove();
        leftTasks();
        return;
    }

    task.classList.toggle("done");
    leftTasks();
}

taskList.addEventListener("click", handleTaskClick);

// Step 4: "tasks left" counter
const left = document.getElementById("left");
function leftTasks() {
    let taskArr = taskList.querySelectorAll("li:not(.done)");
    // let taskArr=Array.from(taskList.querySelectorAll("li")).filter(x => !x.classList.contains("done"));
    left.textContent = taskArr.length;
    emptyListmassege();
}


// Step 5: filters (All / Active / Done)
const filters = document.getElementById("filters");

function filterTasks(event) {
    const buttonFilter = event.target.closest("button");

    if (!buttonFilter) {
        return;
    }

    const dataBTN = buttonFilter.dataset.filter;
    const tasks = taskList.querySelectorAll("li");

    // הסרה של המחלקה המקנה צבע
    filters.querySelectorAll("button").forEach(button => {
        button.classList.remove("active");
    });

    // מוסיף את המחלקה לאובייקט שנלחץ כעת
    buttonFilter.classList.add("active");

    // Filter tasks
    tasks.forEach(task => {
        const isDone = task.classList.contains("done");

        if (dataBTN === "all") {
            task.hidden = false;
        } else if (dataBTN === "active") {
            task.hidden = isDone;
        } else if (dataBTN === "done") {
            task.hidden = !isDone;
        }
    });
}

filters.addEventListener("click", filterTasks);
// Step 6: Clear completed
const clearDone = document.getElementById("clear-done");
function clearAllDone() {
    const tasks = taskList.querySelectorAll("li");
    tasks.forEach(task => {
        const isDone = task.classList.contains("done");
        if (isDone) {
            task.remove();
        }
    });
    leftTasks();

}
clearDone.addEventListener('click', clearAllDone)
// Step 7: show the empty message only when there are no tasks

const empty = document.getElementById("empty");
function emptyListmassege() {
    const tasks = taskList.querySelectorAll("li");
    if (tasks.length > 0)
        empty.hidden = true;
    else {
        empty.hidden = false;
    }
}
// Bonus: block duplicate tasks ("This task already exists")

function createTask(event) {
    event.preventDefault();

    const newTaskText = taskInput.value.trim();

    if (newTaskText === "") {
        error.textContent = "Please type a task";
        error.hidden = false;
        return;
    }

    // Check duplicate tasks
    const tasks = taskList.querySelectorAll("li .text");

    const isDuplicate = Array.from(tasks).some(task =>
        task.textContent.trim().toLowerCase() ===
        newTaskText.toLowerCase()
    );

    if (isDuplicate) {
        error.textContent = "This task already exists";
        error.hidden = false;
        return;
    }

    // יוצר משימה
    const liTask = document.createElement("li");
    liTask.className = `priority-${priorityselect.value}`;

    const spanChild = document.createElement("span");
    spanChild.className = "text";
    spanChild.textContent = newTaskText;

    const buttonChild = document.createElement("button");
    buttonChild.className = "delete";
    buttonChild.textContent = "x";
    buttonChild.type = "button";

    liTask.appendChild(spanChild);
    liTask.appendChild(buttonChild);
    taskList.appendChild(liTask);

    error.hidden = true;
    taskInput.value = "";
    taskInput.focus();
    const activeFilter = filters.querySelector("button.active");

    if (activeFilter && activeFilter.dataset.filter === "done") {
        liTask.hidden = true;
    }

    leftTasks();
}

submit.addEventListener('submit', createTask)

leftTasks();
