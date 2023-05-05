let todoList = document.getElementById('todoList');
let todoInput = document.getElementById('todoInput');

function addTodo() {
  let todoText = todoInput.value;
  if (todoText === '') {
    alert('Please enter a todo');
    return;
  }
  let todoItem = document.createElement('li');
  todoItem.innerText = todoText;
  todoList.appendChild(todoItem);
  todoInput.value = '';
}