// declaration of dom elements
let search = document.getElementById('search');
let todoList = document.getElementById('todoList');
let form = document.getElementById('addForm');
//delete button to be created
let delBtn = document.getElementById('delBtn');
// select container div
const container = document.querySelector('.container');

//load todo list
window.onload = loadList;

//add event listener to addForm
form.addEventListener('submit', addItem);
//add event listener to search
search.addEventListener('keyup', filterItems);
//add event listener to delete button
todoList.addEventListener('click', removeItem);

//load items function
function loadList() {
  //get Todo list from localStorage
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
console.log(todo);
  if(todo.length === 0) {
    container.classList.add('empty-todo');
  }else{
    //loop through array and list them in ul
    todo.forEach(task => {
      let li = document.createElement('li');
      let text = task.task;
      li.className = "todos";
      li.innerHTML = "<input type='checkbox' class='' id='' value=''><span>"+text+"</span><button style='float:right;' type='button' class='delete'>X</button>";

     //add li to Todo List
     todoList.insertBefore(li, todoList.children[0]);
   });
 }
}

//add items to todo list
function addItem(e) {
  e.preventDefault();

  //check if input is empty
  let newTodo = document.getElementById('newTodo');
  if(newTodo.value === "") {
    alert("Please Add some Task Todo");
    return false;
  }

  //check if task already exists
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  todo.forEach(task => {
    if(task.task === newTodo.value) {
      alert("Todo Already Exists!");
      //reset input
      newTodo.value = "";
      return;
    }
  })

    //insert TODO TO localStorage
    if(newTodo.value != ""){
      localStorage.setItem('tasks', JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {task: newTodo.value, completed: false}]));

      //add Todo to ul list
      let li = document.createElement('li');
      let text = newTodo.value;
      li.className = "todos";

      li.innerHTML = "<input type='checkbox' class='' id='' value=''><span>"+text+"</span><button style='float:right;' type='button' class='delete'>X</button>";

      todoList.insertBefore(li, todoList.children[0]);

      //reset input
      newTodo.value = "";
    }

}

//filter list for Search
function filterItems(e) {
  //log key values entered, convert to lowercase
  let text = e.target.value.toLowerCase();
  //get all the li items on the dom
  let items = todoList.getElementsByTagName('li');
  //get array of li items and loop through comparing to logged values
  Array.from(items).forEach(item => {
    //get textContent of li items
    let itemName = item.children[1].textContent;
    if(itemName.toLowerCase().indexOf(text) != -1){
      item.style.display = 'block';
    }else{
      item.style.display = 'none';
    }
  });

}

// remove/delete todo items
function removeItem(e) {
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks")));
  if(e.target.classList.contains("delete")){
    console.log("working");
    todo.forEach(task => {
      if (task.task === e.target.parentNode.children[1].textContent) {
        todo.splice(todo.indexOf(task), 1);
      }
    });

    localStorage.setItem("tasks", JSON.stringify(todo));
    let li = e.target.parentElement;
    todoList.removeChild(li);
}
}


  //notes :
  //cannot figure out what tripple dots before array means
