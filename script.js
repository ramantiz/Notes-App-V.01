document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // 🔹 Fetch tasks from backend and display them
    async function fetchTasks() {
        try {
            const response = await fetch("http://localhost:5002/api/tasks");
            const tasks = await response.json();
            renderTasks(tasks);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    // 🔹 Render tasks in the UI
    function renderTasks(tasks) {
        taskList.innerHTML = ""; // Clear existing tasks

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.title}</span>
                <button class="task-btn complete-btn" onclick="toggleComplete(${task.id}, ${!task.completed})">✔</button>
                <button class="task-btn delete-btn" onclick="deleteTask(${task.id})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    // 🔹 Add a new task (POST request)
    addTaskBtn.addEventListener("click", async () => {
        const title = taskInput.value.trim();
        if (title === "") return; // Ignore empty input

        try {
            const response = await fetch("http://localhost:5002/api/tasks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title })
            });

            if (response.ok) {
                taskInput.value = ""; // Clear input after adding
                fetchTasks(); // Refresh task list
            }
        } catch (error) {
            console.error("Error adding task:", error);
        }
    });

    // 🔹 Toggle task completion (PUT request)
    window.toggleComplete = async (id, completed) => {
        try {
            await fetch(`http://localhost:5002/api/tasks/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed })
            });
            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // 🔹 Delete a task (DELETE request)
    window.deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5002/api/tasks/${id}`, {
                method: "DELETE"
            });
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // 🔹 Load tasks on page load
    fetchTasks();
});
