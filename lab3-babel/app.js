class Note {
    constructor(title) {
        this.title = title;
        this.element = this.createElement(title);
        //this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // HINT🤩 this.element = this.createElement(title);
    }

    createElement(title) {
        let newNote = document.createElement("li");

        // HINT🤩 newNote.addEventListener('click', this.remove.bind(newNote));
        newNote.addEventListener('click', this.remove.bind(newNote));

        return newNote;
    }

    add() {
        // HINT🤩
        // this function should append the note to the screen somehow
        let todo = document.querySelector("#taskList").appendChild(this.element);
        todo.innerHTML = this.title;
        //document.querySelector();
    }

    saveToStorage() {
            let list = JSON.parse(localStorage.getItem('tasks'));
            if(list == null) list = [];
            list.push(this.title);
            localStorage.setItem('tasks', JSON.stringify(list));

        // HINT🤩
        // localStorage only supports strings, not arrays
        // if you want to store arrays, look at JSON.parse and JSON.stringify
    }

    remove() {
        // HINT:star_struck: the meaning of 'this' was set by bind() in the createElement function
        // in this function, 'this' will refer to the current note element
        // .removeChild(this)
        // remove the item from screen and from localstorage

        document.getElementById("taskList").removeChild(this);
        let value = this.innerText;

        let tasks = localStorage.getItem("tasks");
        tasks = JSON.parse(tasks) || [];

        let index = tasks.indexOf(value);
        console.log(index);
        tasks.splice(index, 1);
        console.log(tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

class App {
    constructor() {
        console.log("👊🏼 The Constructor!");

        this.txtTodo = document.querySelector("#taskInput");
        this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
        this.loadNotesFromStorage();
        // HINT🤩
        // pressing the enter key in the text field triggers the createNote function
        // this.txtTodo = ???
        // this.txtTodo.addEventListener("keypress", this.createNote.bind(this));
        // read up on .bind() -> we need to pass the current meaning of this to the eventListener
        // when the app loads, we can show previously saved noted from localstorage
        // this.loadNotesFromStorage();
    }

    loadNotesFromStorage() {
        // HINT🤩
        // load all notes from storage here and add them to the screen
        let tasks = localStorage.getItem("tasks");
        tasks = JSON.parse(tasks) || [];
        for(let i =0; i < tasks.length; i++){
            let note = new Note(tasks[i]);
            note.add();
            /*let li = document.createElement('li');
            li.innerHTML = tasks[i];
            document.querySelector("#taskList").appendChild(li);
            console.log(tasks[i]);*/
        }
    }

    createNote(e) {
        if (e.key === "Enter"){
            let note = new Note(this.txtTodo.value);
            note.add();
            note.saveToStorage();
            this.reset();
            e.preventDefault();
        }
        // this function should create a new note by using the Note() class
        // HINT🤩
        // note.add();
        // note.saveToStorage();
        // clear the text field with .reset in this class
        // if (e.key === "Enter")
    }

    reset() {
        this.txtTodo.value = "";
        // this function should reset the form / clear the text field
    }
}

let app = new App();
