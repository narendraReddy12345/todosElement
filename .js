let todoItemsContainer=document.getElementById("todoItemsContainer");
let addButton=document.getElementById("addButton");
let SaveButton=document.getElementById("SaveButton");


function getLocalStroageValue(){
  let localStorageValue=localStorage.getItem("todoList");
  let parse=JSON.parse(localStorageValue);
  if (parse === null) {
    return [];
  } else {
    return parse;
  }

}

let todoList=getLocalStroageValue();
let count=todoList.length;
SaveButton.onclick=function(){
  localStorage.setItem("todoList",JSON.stringify(todoList));
}


 function checkActions(checkBoxId,labelId,todoId){
  let checkBoxElement=document.getElementById(checkBoxId);
  let labelElement=document.getElementById(labelId);
  labelElement.classList.toggle("checked");
  let todoObjectIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.key;

    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  let todoObject = todoList[todoObjectIndex];

  if(todoObject.isChecked === true){
    todoObject.isChecked = false;
  } else {
    todoObject.isChecked = true;
  }


 }
 function todoElementRemove(todoId){
  let todoElement=document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);
  let deleteElementIndex = todoList.findIndex(function(eachTodo) {
    let eachTodoId = "todo" + eachTodo.key;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  todoList.splice(deleteElementIndex, 1);
 }


function createAndAppend(todo){
  let checkBoxId="check"+todo.key;
  let labelId="label"+todo.key;
  let todoId="todo"+todo.key;
let todoElement=document.createElement("li");
todoElement.classList.add("todo-item-container","d-flex","flex-row");
todoElement.id=todoId;
todoItemsContainer.appendChild(todoElement);

let inputElement=document.createElement("input");
inputElement.type="checkbox";
inputElement.id=checkBoxId;
inputElement.classList.add("checkbox-input");
inputElement.checked=todo.isChecked;
inputElement.onclick=function(){
  checkActions(checkBoxId,labelId,todoId);
}
todoElement.appendChild(inputElement);

let labelContainer=document.createElement("div");
labelContainer.classList.add("label-container","d-flex","flex-row");
todoElement.appendChild(labelContainer);

let labelElement=document.createElement("label");
labelElement.setAttribute("for",checkBoxId);
labelElement.textContent=todo.Text;
labelElement.id=labelId;
labelElement.classList.add("checkbox-label");
if(todo.isChecked===true){
  labelElement.classList.add("checked");
}
labelContainer.appendChild(labelElement);

let delectContainer=document.createElement("div");
delectContainer.classList.add("delet-bg");
labelContainer.appendChild(delectContainer);

let delectIon=document.createElement("i");
delectIon.classList.add("far","fa-trash-alt","delet-ion");
delectContainer.appendChild(delectIon);
delectIon.onclick=function(){
  todoElementRemove(todoId);
}

}
for( let todo of todoList){
  createAndAppend(todo);
}





function appendNewTodo(){
  let userInputElement=document.getElementById("userInput");
  let userText=userInputElement.value;
  if(userText===""){
    alert("Invaild input Please try again Boss.........")
    return;
  };
  count=count+1
  let newTodo={
    Text: userText,
    key:count,
    isChecked:false
  }
  todoList.push(newTodo);
  createAndAppend(newTodo);
  userInputElement.value="";
 
};





addButton.onclick=function(){
  appendNewTodo();
};
























