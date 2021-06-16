
/**Task Note */
class TaskNote {
    constructor(title, desc, clases, taskDateTime) {
        this.ID = TaskNote.generateID();
        this.taskTitle = title;
        this.taskDesk = desc;
        this.taskDateTime = taskDateTime;
        this.noteClases = clases;
    }

    CreateElement(taskSection, animate=true) {
        var noteElement = document.createElement('taskNote');
        var noteElement = document.createElement('div');
        noteElement.classList.add("col");

        noteElement.innerHTML = `

            <taskNote id="note-${this.ID}">
                <!-- Note Header -->
                <div class="note__header">
                    <div class="note__header-title titleTaskNote">${this.taskTitle}</div>
                    <div class="note__header-delete">
                        <i class="deleteNoteBtn icon-basic-elaboration-document-remove"></i>
                    </div>
                </div>

                <!-- Note Main -->
                <div class="note__main">
                    <p class="note__main-text textTaskNote" readonly>${this.taskDesk}</p>
                </div>

                <!-- Note Footer -->
                <div class="note__footer">
                    <p class="dateTimeTask">${this.taskDateTime}</p>
                </div>
            </taskNote>`

        const taskNoteNode = noteElement.querySelector(`#note-${this.ID}`);
        this.noteClases.forEach(c => taskNoteNode.classList.add(c));
        if (!animate) {
            taskNoteNode.classList.remove("note-animate");

        }

        const deleteBtn = noteElement.querySelector('.deleteNoteBtn');
        /*console.log(deleteBtn);*/

        deleteBtn.addEventListener('click', () => {
            noteElement.remove()
            TaskNote.updateLocalStorage()
        })


        taskSection.appendChild(noteElement)

    }

    static updateLocalStorage() {
        var taskSections = document.querySelector("#all-Tasks-section");

        var taskNoteObjects = [];
        var taskNotesElements = taskSections.querySelectorAll('taskNote');


        taskNotesElements.forEach(function (taskNoteElement) {

            let title = taskNoteElement.querySelector(".titleTaskNote").textContent;
            let text = taskNoteElement.querySelector(".textTaskNote").textContent;
            let taskClasses = [];
            taskNoteElement.classList.forEach(c => taskClasses.push(c));
            let taskDateTime = taskNoteElement.querySelector(".dateTimeTask").textContent;

            var taskNote = new TaskNote(title, text, taskClasses, taskDateTime);

            taskNoteObjects.push(taskNote);
            //taskNote.CreateElement(taskSections);

        })
        localStorage.setItem('taskNotes', JSON.stringify(taskNoteObjects))
    }

    /**
    Get TaskNote Class by JSON Object 
     * @param {JSON} taskNoteObject
     * @returns{TaskNote}
     */
    static parseObject(taskNoteObject) {

        return Object.assign(new TaskNote, taskNoteObject);
    }

    static generateID() {
        let lastID = 0;
        let lsLastID = localStorage.getItem("taskNoteID");
        if (lsLastID) {

            lastID = lsLastID + 1;
            
        }
        localStorage.setItem("taskNoteID", lastID);
        return lastID;
    }
}