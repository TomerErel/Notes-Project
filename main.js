function onWindowLoad() {
    const form = document.querySelector('form');
    document.querySelector('#clear').onclick = function () {
        localStorage.clear();
    };
    form.onsubmit = onFormSubmit
    writeNote()
    deleteButton()
};

window.onload = onWindowLoad;

function onFormSubmit(event) {
    event.preventDefault();
    saveToLocalStorage();
    deleteButton();
};

function getValuesFromUser() {
    const textAreaBox = document.querySelector('textarea');
    const textAreaBoxValue = textAreaBox.value;

    const time = document.querySelector('.time')
    const timeValue = time.value;

    const date = document.querySelector('.date')
    const dateValue = date.value;

    const userValues = {
        task: textAreaBoxValue,
        time: timeValue,
        date: dateValue
    };
    return userValues;
};

function saveToLocalStorage() {
    let arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!arrayOfTasks) {
        arrayOfTasks = [];
    };
    let task = getValuesFromUser();
    task.id = arrayOfTasks.length.toString();
    console.log('on save', task);
    arrayOfTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
    writeNote();
    cleanInputValues();
};

function cleanInputValues() {
    const inputs = document.querySelectorAll('input');
    const textArea = document.querySelector('textarea');

    textArea.value = '';
    inputs[0].value = '';
    inputs[1].value = '';
};

function deleteItem(event) {
    event.target.parentElement.remove();
    console.log(event);

    const itemId = event.target.id
    console.log(itemId);

    const arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));

    let taskToDelete;

    for (let index = 0; index < arrayOfTasks.length; index++) {
        if (arrayOfTasks[index].id === itemId) {
            taskToDelete = index;
        }
    }
    arrayOfTasks.splice(taskToDelete, 1);

    localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
};

function writeNote() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let items = ``;
    if (!tasks) {
        tasks = [];
    }
    const noteContainer = document.querySelector('.note-container');
    for (let i = 0; i < tasks.length; i++) {
        items += `<div class="note""><i id='${i}' class="bi bi-x-square-fill"></i> <div class="inside-note"><p id='taskBox'>${tasks[i].task}</p><p id='timeBox'> ${tasks[i].time}</p><p id='dateBox'>${tasks[i].date}</p></div></div>`;
    }
    noteContainer.innerHTML = items;
};

function deleteButton() {
    const deleteButtons = document.querySelectorAll('i');
    for (const btn of deleteButtons) {
        btn.onclick = deleteItem;
    };
};