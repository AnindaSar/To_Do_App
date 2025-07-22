document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskTitleInput = document.getElementById("task-title");
    const taskDescriptionInput = document.getElementById("task-description");
    const pendingTasksList = document.getElementById("pending-tasks");
    const completedTasksList = document.getElementById("completed-tasks");

    function createTaskElement(title, description, timestamp) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        const taskContent = document.createElement("div");
        taskContent.innerHTML = `
            <strong>${title}</strong><br>
            ${description}<br>
            <small>Added: ${timestamp}</small>
        `;

        const taskButtons = document.createElement("div");
        taskButtons.classList.add("task-buttons");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("btn", "green");
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener("click", () => {
            taskItem.classList.add("completed");
            completedTasksList.appendChild(taskItem);
            taskButtons.removeChild(completeBtn);
        });

        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "blue");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            const newTitle = prompt("Edit Task Title:", title);
            const newDescription = prompt("Edit Task Description:", description);
            if (newTitle) taskContent.querySelector("strong").textContent = newTitle;
            if (newDescription) taskContent.innerHTML = `
                <strong>${newTitle || title}</strong><br>
                ${newDescription}<br>
                <small>Added: ${timestamp}</small>
            `;
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "red");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => taskItem.remove());

        taskButtons.append(completeBtn, editBtn, deleteBtn);
        taskItem.append(taskContent, taskButtons);

        return taskItem;
    }

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskTitleInput.value;
        const description = taskDescriptionInput.value;
        const timestamp = new Date().toLocaleString();

        const taskItem = createTaskElement(title, description, timestamp);
        pendingTasksList.appendChild(taskItem);

        taskTitleInput.value = "";
        taskDescriptionInput.value = "";
    });
});
