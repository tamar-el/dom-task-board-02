// Exercise 2 - Task Board
// Write all your code in this file. Read README.md for the full instructions.
// Run the tests with: npm test

// Step 1: add a task on submit (no reload, clear + focus the input, "Please type a task" error)
const submit = document.getElementById("task-form");
const priorityselect = document.getElementById("priority-select");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const error= document.getElementById("error");

function createTask(event) {
    event.preventDefault();
    if (taskInput.value.trim() !== "") {

        let liTask = document.createElement("li");
        liTask.className = `priority-${priorityselect.value}`;

        let spanChild = document.createElement("span");
        spanChild.className = "text";
        spanChild.textContent = taskInput.value.trim();
        let buttonChild = document.createElement("button");
        buttonChild.className = "delete";
        buttonChild.textContent = "x";

        liTask.appendChild(spanChild);
        liTask.appendChild(buttonChild);
        taskList.appendChild(liTask);
        error.hidden = true;
        taskInput.value = "";
        taskInput.focus();
    }else{
        error.textContent="Please type a task";
        error.hidden=false;

    }

}
submit.addEventListener('submit', createTask)


// Step 2: click a task to toggle the "done" class
// Step 3: delete with the x button (one listener on the ul - event delegation)

function handleTaskClick(event) {
    const task = event.target.closest("li");

    if (!task) return;

    if (event.target.classList.contains("delete")) {
        task.remove();
        return;
    }

    task.classList.toggle("done");
}

taskList.addEventListener("click", handleTaskClick);

// Step 4: "tasks left" counter

// Step 5: filters (All / Active / Done)

// Step 6: Clear completed

// Step 7: show the empty message only when there are no tasks

// Bonus: block duplicate tasks ("This task already exists")
