var apikey = "9080c03be58de416229857007d59e70f3f84e0e367dbf14a6b9be52924edfbf8"


// Load existing ToDos
var listRequest = new XMLHttpRequest();
  listRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        // display Todos on page
        for(var index = 0; index < todos.length; index++){
          renderTodo(todos[index]);
        }
      } else if (this.readyState == 4){
        console.log(this.responseText);
      }
    }

listRequest.open("GET", "https://api.kraigh.net/todos", true);
listRequest.setRequestHeader("x-api-key",apikey);
listRequest.send();



// display ToDos on page

// Handle new todo form submit.
document.getElementById("newTodoForm").addEventListener("submit", function (event) {
  event.preventDefault();

  //submit todo to api
    var data = {
      text: newtitle.value
    }
    var createRequest = new XMLHttpRequest();
      createRequest.onreadystatechange = function(){
        // Wait for readyState = 4 & 200 response
        if (this.readyState == 4 && this.status == 200) {
          // parse JSON response
          // var todo = JSON.parse(this.responseText);
          // console.log(todo);
          renderTodo(JSON.parse(this.responseText));
        } else if (this.readyState == 4) {
          // this.status !== 200, error from server
          console.log(this.responseText);
        }
    };
    createRequest.open("POST", "https://api.kraigh.net/todos/", true);
    createRequest.setRequestHeader("Content-type", "application/json");
    createRequest.setRequestHeader("x-api-key", apikey);
    createRequest.send(JSON.stringify(data));
});
// display new Todo on page

function renderTodo(Datatodo){
  // create new todo container
  var todo = document.createElement("article");
  // add id of todo as io of container
  todo.setAttribute("id", Datatodo.id);
  todo.classList.add("todo");
  if (Datatodo.completed){
    todo.classList.add("completed");
  }
  // create complete button
  var compButton = document.createElement("button");
  compButton.classList.add("check");

  todo.appendChild(compButton);
  // add todo responseText
  var todoText = document.createElement("p");

  todoText.innerHTML = Datatodo.text;
  // todotext.innerText = Datatodo.text;

  todo.appendChild(todoText);
  // create delete button

  var delButton = document.createElement("button");
  delButton.classList.add("delete");
  delButton.innerText = "-";
  todo.appendChild(delButton);
  // add todo to page
  // add event listeners for button

  document.getElementById("todos").appendChild(todo);
  compButton.addEventListener("check",completeTodo);
  delButton.addEventListener("check",deleteTodo);
  document.getElementById("newtitle").value = '';
}


function completeTodo(event){

  // Handle Todo completion
      // event listener on button check
      // API Call, put to set completed to true
      console.log(event);
      var todoId = event.target.parentNode.id;
      var data = {
        completed: true
      };
      var comRequest = new XMLHttpRequest();
      comRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          event.target.parentNode.classList.add("completed");
        } else if (this.readyState == 4) {
          console.log(this.responseText)
        }
      }
      comRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
      comRequest.setRequestHeader("Content-type", "application/json");
      comRequest.setRequestHeader("x-api-key", apikey);
      comRequest.send(JSON.stringify(data));
      // add completed class
}

function deleteTodo(event){
      // Handle Todo completion
      var todoId = event.target.parentNode.id;

      // event listener on button check
      // API Call,delete to remove

      var delRequest = new XMLHttpRequest();
      delRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
          event.target.parentNode.remove();
        } else if (this.readyState == 4) {
          console.log(this.responseText);
        }
      }
      delRequest.open("DELETE", "https://api.kraigh.net/todos/" + todoId, true);
      delRequest.setRequestHeader("Content-type", "application/json");
      delRequest.setRequestHeader("x-api-key", apikey);
      delRequest.send();

      // remove from page



}
