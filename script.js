const addTask = document.getElementById("add-task")
const toDoInput = document.getElementById("to-do-input")
const ul = document.getElementById("ul")
const alertMessage = document.getElementById('alert-message')
let elementToEdit

let toDoData = JSON.parse(localStorage.getItem("to-do-list"))
if(toDoData == null) {
    toDoData = []
}

//reading to-do items
toDoData.forEach(element => {
    let style = ""
    let src = "./images/unchecked.png"
    if(element.status == true) {
        style = "text-decoration:line-through"
        src = "./images/checked.png"
    }
    let li = document.createElement('li')
    const toDoItem = `<div class = "to-do-item" onclick = "completedToDoitems(this)" style = ${style}> <img src= ${src} class = "icons"> <div class = 'to-do-item-text'>${element.item}</div> </div> <div><img src = "./images/edit.png" class = "icons" onclick = "editToDoItems(this)"> <img src = "./images/delete.png" class = "icons" onclick = "deleteToDoItems(this)"></div>`
    li.innerHTML = toDoItem
    ul.appendChild(li)
});

//Code not working
toDoInput.addEventListener("keypress",(e)=>{
    if(e.key == "Enter") {
        addTask.click()
    }
})

function createToDoItems() {
    li = document.createElement('li')
    const toDoItem = `<div class = "to-do-item" onclick = "completedToDoitems(this)"> <img src="./images/unchecked.png" class = "icons"> <div class = 'to-do-item-text'>${toDoInput.value}</div> </div> <div><img src = "./images/edit.png" class = "icons" onclick = "editToDoItems(this)"> <img src = "./images/delete.png" class = "icons" onclick = "deleteToDoItems(this)"></div>`
    li.innerHTML = toDoItem
    ul.appendChild(li)
    const localStorageItem = {item : toDoInput.value,status : false}
    toDoData.push(localStorageItem)
    localStorage.setItem("to-do-list",JSON.stringify(toDoData))
    toDoInput.value = ""
    setAlertMessage("Task added")
}

function completedToDoitems(e) {
    toDoData.forEach((element) => {
        if(element.item == e.innerText) {
            if(e.style.textDecoration == "") {
                e.style.textDecoration = "line-through"
                e.firstElementChild.setAttribute("src","./images/checked.png")
                element.status = true
                setAlertMessage("Marked as completed")
            }
            else{
                e.style.textDecoration = ""
                e.firstElementChild.setAttribute("src","./images/unchecked.png")
                element.status = false
            }
        }
    });

    localStorage.setItem("to-do-list",JSON.stringify(toDoData))
    
}

function editToDoItems(e) {
    elementToEdit = e.parentElement.parentElement.firstElementChild.querySelector('div')
    toDoInput.value = elementToEdit.innerText
    addTask.setAttribute("src","./images/refresh.png")
    addTask.setAttribute("style","padding : 4px")
    addTask.setAttribute("onclick","updateToDoItems()")
    toDoInput.focus()
}

function updateToDoItems() {
    toDoData.forEach((element) => {
        if(element.item == elementToEdit.innerText) {
            elementToEdit.innerText = toDoInput.value
            addTask.setAttribute("src","./images/plus.png")
            addTask.setAttribute("style","padding : 10px")
            addTask.setAttribute("onclick","createToDoItems()")
            element.item = toDoInput.value
            toDoInput.value = ""
        }
    });
    localStorage.setItem("to-do-list",JSON.stringify(toDoData))
    setAlertMessage("Task updated")
}

function deleteToDoItems(e) {
    for (let i = 0; i < toDoData.length; i++) {
        if(toDoData[i].item.trim() == e.parentElement.parentElement.innerText.trim()) {
            toDoData.splice(i,1)
        }
    }
    localStorage.setItem("to-do-list",JSON.stringify(toDoData))
    e.parentElement.parentElement.classList.add('deleted-item-animation')
    setTimeout(()=>{
        e.parentElement.parentElement.remove()
    },1000)
    setAlertMessage("Task deleted")
}


function setAlertMessage(msg) {
    alertMessage.innerText = msg
    alertMessage.removeAttribute('class')
    setTimeout(()=>{
        alertMessage.classList.add('fade-out-animation')
    },500)
}
