function addTask() {
    let taskInput = document.getElementById("taskInput");
    let reminderInput = document.getElementById("reminderTime");
    let taskValue = taskInput.value.trim();
    let reminderTime = reminderInput.value;
    let reminderSound = document.getElementById("reminderSound");

    if (taskValue === "") {
        alert("Please enter a task!");
        return;
    }

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    let formattedTime = reminderTime ? formatTime(reminderTime) : "No Reminder";

    li.innerHTML = `
        <div class="task-info">
            <span class="task-text">${taskValue}</span>
            <span class="task-time">${formattedTime}</span>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="markCompleted(this)">Complete</button>
            <button class="remove-btn" onclick="removeTask(this)">Remove</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";
    reminderInput.value = "";

    // Set reminder if time is provided
    if (reminderTime) {
        let reminderTimestamp = new Date(reminderTime).getTime();
        let currentTime = new Date().getTime();
        let delay = reminderTimestamp - currentTime;

        if (delay > 0) {
            setTimeout(() => {
                if (!li.classList.contains("completed")) {
                    reminderSound.play(); // 🔊 Play sound
                    alert(`🔔 Reminder: ${taskValue}`);
                }
            }, delay);
        } else {
            alert("Reminder time must be in the future!");
        }
    }
}

function removeTask(button) {
    let li = button.parentElement.parentElement;
    li.remove();
}

function markCompleted(button) {
    let li = button.parentElement.parentElement;
    li.classList.toggle("completed");

    // Change button text and disable it after marking complete
    if (li.classList.contains("completed")) {
        button.innerText = "Completed";
        button.style.backgroundColor = "#28a745";
        button.style.cursor = "default";
        button.disabled = true;
    }
}

// Function to format time to a readable format
function formatTime(time) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}
