// declaration of dom elements
let root = document.querySelector(':root');
let search = document.getElementById('search');
let todoList = document.getElementById('todoList');
let form = document.getElementById('addForm');
//delete button to be created
let themeBtn = document.getElementById('themeBtn');
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
//completeTask click event
todoList.addEventListener('click', completeTask);
//theme change click event
themeBtn.addEventListener('click', themeChange);

//load items function
function loadList() {
  // load theme from localStorage
  let theme = Array.from(JSON.parse(localStorage.getItem('theme') || "[]"));
  if (theme[0].dark === true) {
    root.style.setProperty('--primary-color', '#1E1E1E');
    root.style.setProperty('--secondary-color', '#3B3B3B');
    root.style.setProperty('--text-color', '#EAEAEA');
    root.style.setProperty('--task-color', '#3B3B3B');
    root.style.setProperty('--footer-color', '#1E1E1E');
    root.style.setProperty('--theme-btn', '');
    root.style.setProperty('--container-bg', 'black');
    root.style.setProperty('--filter', 'invert()');
    root.style.setProperty('--theme-transition', '0s');
    root.style.setProperty('--scrollbar-color', '#1E1E1E');
    root.style.setProperty('--scrollbar-thumb-color', '#3B3B3B');
  }else {
    root.style.setProperty('--primary-color', 'white');
    root.style.setProperty('--secondary-color', '#1E1E1E');
    root.style.setProperty('--text-color', 'black');
    root.style.setProperty('--task-color', 'white');
    root.style.setProperty('--footer-color', '#1E1E1E');
    root.style.setProperty('--theme-btn', 'url()');
    root.style.setProperty('--container-bg', 'url()');
    root.style.setProperty('--complete-icon', 'url()');
    root.style.setProperty('--filter', 'none');
    root.style.setProperty('--theme-transition', '0s');
    root.style.setProperty('--scrollbar-color', '#dbdbdb');
    root.style.setProperty('--scrollbar-thumb-color', '#bdbdbd');
  }

  //get Todo list from localStorage
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks") || "[]"));
  //check if array is empty and place a bg image
  if(todo.length === 0) {
    container.classList.add('empty-todo');
  }else{
    //loop through array and list them in ul
    todo.forEach(task => {
      //create a li element
      let li = document.createElement('li');
      //assign the task value to a variable
      let text = task.task;
      //declare a checked variable that will hold the checkbox status
      let checked;
      //check the boolean value of completed (if true checkbox is checked)
      if (task.completed === true) {
        checked = "checked";
      }
      //add a class name to li for styling
      li.className = "todos";
      //append checkbox+status, task text and delete button to li as children
      li.innerHTML = "<input type='checkbox' class='check' "+checked+"><span>"+text+"</span><button style='float:right;' type='button' class='delete'>X</button>";

      //toggle taskCompleted  class depending checkbox status(if checked or not)
      if (checked == "checked") {
        li.children[1].classList.toggle("taskcompleted");
      }
     //add li to Todo List(ul)
     todoList.insertBefore(li, todoList.children[0]);
   });
 }
}

//add items to todo list
function addItem(e) {
  //prevent default form submit action
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

    //insert non-empty TODO tO localStorage
    if(newTodo.value != ""){
      //added as array of objects stringified
      //... to make existing entries in localStorage part of our inserting array to prevent "update"
      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {task: newTodo.value, completed: false}]));

      //add Todo to ul list
      let li = document.createElement('li');
      let text = newTodo.value;
      li.className = "todos";
      //display added to do to the list without needing reload
      li.innerHTML = "<input type='checkbox' class='check'><span>"+text+"</span><button style='float:right;' type='button' class='delete'>X</button>";
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
    //compare index of typed values with listed items
    if(itemName.toLowerCase().indexOf(text) != -1){
      //display if matching
      item.style.display = 'block';
    }else{
      //hide if no match
      item.style.display = 'none';
    }
  });

}

// remove/delete todo items
function removeItem(e) {
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks")));
  //lauch event when delete button is clicked
  if(e.target.classList.contains("delete")){
    //console.log("working");
    todo.forEach(task => {
      //copare task value with span text content
      if (task.task === e.target.parentNode.children[1].textContent) {
        //splice array where match is found
        todo.splice(todo.indexOf(task), 1);
      }
    });
    // update array in local storage
    localStorage.setItem("tasks", JSON.stringify(todo));
    //remove element from displayed list
    let li = e.target.parentElement;
    todoList.removeChild(li);
  }
}

//strikethrough completed tasks
function completeTask(e) {
  let todo = Array.from(JSON.parse(localStorage.getItem("tasks")));
  if (e.target.classList.contains("check")) {
    todo.forEach(task => {
      if (task.task === e.target.parentNode.children[1].textContent) {
        task.completed = !task.completed;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(todo));
    e.target.parentNode.children[1].classList.toggle("taskcompleted");
  }
}

//darkmode ttheme change function
function themeChange(e) {
  let theme = Array.from(JSON.parse(localStorage.getItem('theme') || "[]"));
  let mode;

  theme.forEach(change => {
    change.dark = !change.dark;
    mode = change.dark;
  });

  //update dark mode in local storage
  localStorage.setItem('theme',JSON.stringify([{dark: mode}]));

  if (mode === true) {
      root.style.setProperty('--primary-color', '#1E1E1E');
      root.style.setProperty('--secondary-color', '#3B3B3B');
      root.style.setProperty('--text-color', '#EAEAEA');
      root.style.setProperty('--task-color', '#3B3B3B');
      root.style.setProperty('--footer-color', '#1E1E1E');
      root.style.setProperty('--theme-btn', '');
      root.style.setProperty('--container-bg', 'black');
      root.style.setProperty('--filter', 'invert()');
      root.style.setProperty('--theme-transition', '1s');
      root.style.setProperty('--scrollbar-color', '#1E1E1E');
      root.style.setProperty('--scrollbar-thumb-color', '#3B3B3B');
    }else {
      root.style.setProperty('--primary-color', 'white');
      root.style.setProperty('--secondary-color', '#1E1E1E');
      root.style.setProperty('--text-color', 'black');
      root.style.setProperty('--task-color', 'white');
      root.style.setProperty('--footer-color', '#1E1E1E');
      root.style.setProperty('--theme-btn', 'url()');
      root.style.setProperty('--container-bg', 'url()');
      root.style.setProperty('--complete-icon', 'url()');
      root.style.setProperty('--filter', 'none');
      root.style.setProperty('--theme-transition', '1s');
      root.style.setProperty('--scrollbar-color', '#dbdbdb');
      root.style.setProperty('--scrollbar-thumb-color', '#bdbdbd');
  }

}

  //notes :
