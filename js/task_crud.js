const btn_addTask = document.querySelector(".btn-add-task");
document.onload = loadTasks();

import { dataParser } from './data_parser.js';

function addTask(name, remainingTime, conclusionDate) {
    const taskList = document.querySelector(".task-list");

    var newTaskElement =
    `
    <tr class="task" taskID=${nextTaskId} taskDate=${conclusionDate}>
        <td class="task-name align-middle">${name}</td>
        <td class="task-date align-middle">${remainingTime}</td>
        <td class="controls">
            <div class="btn-group" style="box-sizing: border-box">
                <button class="btn btn-success"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bookmark-check-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm6.854 5.854a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/></svg></button>

                <button class="btn btn-warning" onclick="editTask(${nextTaskId})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg></button>
                
                <button class="btn btn-danger" onclick="deleteTask(${nextTaskId})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>

                <button class="btn btn-primary"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-clock-history" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/><path fill-rule="evenodd" d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/><path fill-rule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/></svg></button>
            </div>
        </td>
        </tr>
    `
    taskList.innerHTML += newTaskElement;
    nextTaskId++;
}

function deleteTask(taskID) {
    // Delete li where taskID="id"
    document.querySelector("[taskID='"+taskID+"']").remove();
    localStorage.removeItem(taskID);


}

function refreshTasks() {
    tasks = document.querySelectorAll(".task");

    // For each task...
    for(var element of tasks) {
        var taskDate = element.getAttribute("taskDate");

        // Gets string with time remaining based on taskDate
        var refreshedTimeRemaining = dataParser(new Date(taskDate));
        // Selects <p> textContent from task
        document.querySelector(`[taskDate="${taskDate}"] .task-date`).textContent = refreshedTimeRemaining;
        
    }
}


// Editing tags work by enabling the popup, setting the hidden input with the id of the task to be edited
function editTask(id) {
    const task = document.querySelector("tr[taskID='"+id+"']");
    const popup = document.querySelector(".editor-popup");

    popup.style.display = "grid";
    popup.querySelector(".task-editor-id").setAttribute('taskID', id);

    // Task editor inputs will be equal to the props of the task to be edited
    popup.querySelector(".input-task-edit-name").value = task.querySelector(".task-name").textContent;
    popup.querySelector(".input-task-edit-date").value = task.getAttribute("taskDate");
    
}

function saveTasks() {

    var tasks = document.querySelectorAll(".task");

    for (task of tasks) {
        var taskName  = task.querySelector(".task-name").textContent;
        var taskDate  = task.getAttribute("taskDate");
        var taskID    = task.getAttribute('taskID');
        var taskProps = {"taskName": taskName, "taskDate": taskDate};

        localStorage.setItem(taskID, JSON.stringify(taskProps));

    }
}

function loadTasks() {

    // Gets tasks stored locally, that have the following format:
    // taskID: {"taskName": 'string', "taskDate":, string}
    // Then parse the stringified object value of taskID back to Javascript object
    // Then, dataParser() parses the taskDate string converted to a Date object

    let taskID, taskProps, taskName, taskDate;

    taskIDs = Object.keys(localStorage);
    
    for(taskID of taskIDs) {

        taskProps = localStorage.getItem(taskID); // Gets stringified object
        taskProps = JSON.parse(taskProps);        // JSON parses stringified object to Javascript
        taskName  = taskProps["taskName"];
        taskDate  = taskProps["taskDate"];

        addTask(taskName, dataParser(new Date(taskDate)), taskDate, nextTaskId=taskID);
        
    }
}

btn_addTask.addEventListener('click', () => {
    // Gets raw inputs
    const taskName = document.querySelector(".input-task-name").value;
    const taskDate = document.querySelector(".input-task-date").value;

    // If any of the entries is empty, then warning pops up and inputs are cleared. Else, go parse date and add task.
    if (taskName == '' || taskDate == '') {
        document.querySelector(".task-warning").innerHTML = `<button class="btn btn-primary btn-sm mb-2" onclick="dismissWarning()">Um ou mais campos estão em branco!</button>`;
        taskName.innerHTML = "";
        taskDate.innerHTML = "";
    } else {
    // Converts data string into a valid Date object for parsing.
    taskDateParsed = dataParser(new Date(taskDate));

    addTask(taskName, taskDateParsed, taskDate);
    }
})