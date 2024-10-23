"use strict"
const loadFromLocalStorage = function() {
    if(localStorage.tasks === undefined){
        return JSON.parse('[' +
            '{"name":"task1", "date":"2024-12-20"},' +
            '{"name":"task2", "date":"2025-01-15"},' +
            '{"name":"task3", "date":"2600-03-04"}' +
            ']');
    }
    return JSON.parse(localStorage.tasks);
}

class Todo {
    constructor() {
        this.tasks = loadFromLocalStorage();
        this.searchBox = document.getElementById("searchBox");
        this.taskList = document.getElementById("taskList");
        this.inputText = document.getElementById("inputText");
        this.inputDate = document.getElementById("inputDate");
        this.saveTask = document.getElementById("saveTask");
        this.duringUpdate = false;
    }
    draw() {
        let searchBoxText = this.searchBox.value;
        if(searchBoxText.length < 2){
            searchBoxText = "";
        }
        let regexp = new RegExp(searchBoxText, 'g');
        let finalHTML = "";
        for(let task of this.tasks){
            if(searchBoxText.length >= 2){
                if(task.name.search(regexp) <= -1) {
                    continue;
                }
                finalHTML += "<tr><td>" + task.name.replace(regexp, "<mark>" + searchBoxText + "</mark>") +
                    "</td><td>" + task.date + "</td><td></td></td><td class='deleteTask'>X</td>";
            }
            else{
                finalHTML += "<tr><td>" + task.name +
                    "</td><td>" + task.date + "</td><td></td></td><td class='deleteTask'>X</td>";
            }
        }
        this.taskList.innerHTML = finalHTML;
        todo.duringUpdate = false;
    }
    addTask(){
        this.tasks.push(JSON.parse('{"name":"' + this.inputText.value + '","date":"' + this.inputDate.value + '"}'));
    }
    deleteTask(taskName){
        for(let task of this.tasks) {
            if (taskName.length >= 1 && task.name === taskName) {
                let index = this.tasks.indexOf(task);
                this.tasks.splice(index, 1);
                break;
            }
        }
    }
    updateTask(oldTaskName, newTaskName, newDate){
        for(let task of this.tasks) {
            if (oldTaskName.length >= 1 && task.name === oldTaskName) {
                task.name = newTaskName;
                task.date = newDate;
                break;
            }
        }
    }
}

let todo = new Todo();
todo.draw("");
const saveToLocalStorage = function(){
    localStorage.tasks = JSON.stringify(todo.tasks);
}
window.addEventListener("close",(event) =>{
    saveToLocalStorage();
});

todo.searchBox.addEventListener("input",(event)=> {
    todo.draw();
});
todo.saveTask.addEventListener("click",(event)=>{
    todo.addTask();
    todo.draw();
})

window.addEventListener("click",(event)=>{
    if(event.target.className === "deleteTask"){
        todo.deleteTask(event.target.parentNode.firstElementChild.innerText);
        todo.draw();
        return;
    } else if(event.target.nodeName && event.target.nodeName.toLowerCase() === "td"){
        if(todo.duringUpdate === true){
            todo.draw();
            return;
        }
        let tr = event.target.parentNode;
        let tdArr = tr.children;
        todo.oldTaskName = tdArr[0].innerText;
        tdArr[0].innerHTML = "<label for=\"inputNewText\"></label>" +
            "<input type=\"text\" id=\"inputNewText\" required minlength=\"2\" size=\"100\" maxlength=\"255\" style=\"max-width:100px;\" value=\"" +
            tdArr[0].innerText + "\"/>";
        tdArr[1].innerHTML = "<label for=\"inputNewDate\"></label>" +
            "<input type=\"date\" id=\"inputNewDate\" required value=\"" + tdArr[1].innerText + "\"/>"
        tdArr[2].innerHTML = "<button class=updateTask>Zapisz</button>";
        todo.duringUpdate = true;
        return;
    } else if(event.target.className === "updateTask"){
        let inputNewText = document.getElementById("inputNewText");
        let inputNewDate = document.getElementById("inputNewDate");
        todo.updateTask(todo.oldTaskName, inputNewText.value, inputNewDate.value);
        todo.draw();
        return;
    }
    else{
        saveToLocalStorage();
    }
})