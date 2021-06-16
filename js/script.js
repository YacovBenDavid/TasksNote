/** Array of TaskNote Class */
var taskNotes = [];

/** JSON Object from Local Stoarage  */
var taskNotesLS = [];

//Form Elements
var formTitle = document.getElementById("taskTitle");
var formDesc = document.getElementById("taskDesc");
var formDate = document.getElementById("taskDate");
var formTime = document.getElementById("taskTime");
var formNoteColor = document.getElementsByName("noteColor");


// Preview Elemnts
let previewTitle = document.getElementById('titlePreview');
let previewDesc = document.getElementById('textPreview');
let previewDateTime = document.getElementById('dateTimePreview');

let previewNote = document.querySelector('#notePreview');
let previewNoteColorClass = 'note--thistle';

// section of all tasks
let sectionTasks = document.querySelector(".section-tasks");
let taskContainer = document.querySelector("#all-Tasks-section");

function updatePreviewNoteColor(object) {
    var classNoteColor = object.id;
    previewNote.classList.remove(previewNoteColorClass);
    previewNoteColorClass = classNoteColor;
    previewNote.classList.add(previewNoteColorClass);
}



/** Update Preview Task Note whet form canged */
function updatePreview() {
    previewTitle.innerText = formTitle.value;
    previewDesc.innerText = formDesc.value;
    previewDateTime.innerText = `${formDate.value} ${formTime.value}`;
}


function createNewTaskNote() {

    if (validateRequiredFields()) {
        let titleTask = previewNote.querySelector(".titleTaskNote").textContent;
        let taskDeskText = previewNote.querySelector('.textTaskNote').textContent;
        let noteClases = [];
        let animate = true;
        previewNote.classList.forEach(c => noteClases.push(c));
        let taskDateTime = previewNote.querySelector(".dateTimeTask").textContent;

        let taskNote = new TaskNote(titleTask, taskDeskText, noteClases, taskDateTime);


        sectionTasks.setAttribute('display', 'block');

        taskNote.CreateElement(taskContainer, animate);
        TaskNote.updateLocalStorage();

        resetForm();
    } else {
        alert("Please enter the required fields! (Title, Text, Date)");
    }




}
function validateRequiredFields() {
    const isOk = (field) => !(field === "");
    const fields = [formTitle.value, formDesc.value, formDate.value];
    return fields.every(isOk);
}

function resetForm() {
    document.getElementById("taskNotForm").reset();
    previewTitle.innerText = "";
    previewDesc.innerText = "";
    previewDateTime.innerText = "";


}

function loadPage() {

    //get notes from local storage:
    let lsData = localStorage.getItem("taskNotes");
    if (lsData) {
        taskNotesLS = JSON.parse(localStorage.getItem("taskNotes"));

        if (taskNotesLS) {
            // Convert from JSON Object to TaskNote Class Array

            taskNotes = []

            taskNotes = taskNotesLS.map(tn => TaskNote.parseObject(tn));

            taskNotes.forEach(t => t.CreateElement(taskContainer, false));

        }
    }










    /*console.log(taskNotes);*/



}

loadPage();

