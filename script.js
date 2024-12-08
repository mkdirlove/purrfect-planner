// Array to store all tasks
let tasks = [];

/**
 * Sorts tasks based on priority and deadline.
 * - Tasks with higher priority are placed first.
 * - If priorities are the same, earlier deadlines come first.
 * @param {Array} tasks - Array of task objects to sort.
 * @returns {Array} - Sorted array of tasks.
 */
function prioritySort(tasks) {
  return tasks.sort((a, b) => {
    if (a.priority === b.priority) {
      // Sort by deadline if priorities are equal
      return new Date(a.deadline) - new Date(b.deadline);
    }
    // Sort by priority (higher priority comes first)
    return b.priority - a.priority;
  });
}

/**
 * Adds a new task to the list.
 * - Retrieves user inputs for task name, priority, and deadline.
 * - Validates inputs, adds task to the list, sorts by priority and deadline.
 * - Clears input fields after adding the task.
 */
function addTask() {
  const taskInput = document.getElementById("task-input"); // Task description input
  const priorityInput = document.getElementById("priority-input"); // Priority level input
  const deadlineInput = document.getElementById("deadline-input"); // Deadline date input

  // Trim task name and parse inputs
  const task = taskInput.value.trim();
  const priority = parseInt(priorityInput.value); // Convert priority to an integer
  const deadline = new Date(deadlineInput.value); // Convert deadline to Date object

  // Validate inputs: Task description and deadline must be provided
  if (task && deadlineInput.value) {
    // Create a new task object
    const newTask = { task, priority, deadline, done: false };
    tasks.push(newTask); // Add the new task to the list
    tasks = prioritySort(tasks); // Sort the tasks by priority and deadline

    renderTaskTable(); // Refresh the task table
  }

  // Clear input fields after adding the task
  taskInput.value = "";
  deadlineInput.value = "";
}

/**
 * Renders the tasks in the table.
 * - Clears the current table rows and re-renders tasks from the list.
 * - Dynamically generates table rows with task details and action buttons.
 */
function renderTaskTable() {
  const taskTable = document.getElementById("task-table").getElementsByTagName("tbody")[0];
  taskTable.innerHTML = ""; // Clear the existing table rows

  // Loop through the tasks and add a row for each task
  tasks.forEach((task, index) => {
    const row = taskTable.insertRow(); // Create a new row in the table

    // Determine priority text and CSS class for styling
    const priorityText = task.priority === 1 ? "Low" : task.priority === 2 ? "Medium" : "High";
    const priorityClass = task.priority === 1 ? "priority-low" : task.priority === 2 ? "priority-medium" : "priority-high";

    // Insert task details and action buttons in the row
    row.innerHTML = `
      <td>${task.task}</td>
      <td class="${priorityClass}">${priorityText}</td>
      <td>${task.deadline.toLocaleDateString()}</td>
      <td>
        <!-- Toggle Done/Undo Button -->
        <button class="button is-small is-success" onclick="toggleDone(${index})">
          <i class="fas ${task.done ? 'fa-undo' : 'fa-check'}"></i>
        </button>
        <!-- Delete Task Button -->
        <button class="button is-small is-danger" onclick="deleteTask(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;
  });
}

/**
 * Toggles the "done" status of a task.
 * - Updates the task's `done` property to mark it as completed or undo the completion.
 * - Refreshes the task table to reflect changes.
 * @param {number} index - Index of the task to toggle.
 */
function toggleDone(index) {
  tasks[index].done = !tasks[index].done; // Toggle the `done` status
  renderTaskTable(); // Refresh the task table
}

/**
 * Deletes a task from the list.
 * - Removes the task at the given index from the `tasks` array.
 * - Refreshes the task table to reflect the changes.
 * @param {number} index - Index of the task to delete.
 */
function deleteTask(index) {
  tasks.splice(index, 1); // Remove task from the list
  renderTaskTable(); // Refresh the task table
}
