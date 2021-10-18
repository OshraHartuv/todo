'use strict';

var gTodos;
_createTodos();

var gFilterBy = 'ALL';
var gSortBy = 'CREATED';

function getAroowFuncTodos(){
  return gTodos
}

function getFilter(){
  return gFilterBy
}

function moveDown(idx){
  var todo  = gTodos.splice(idx,1)[0]
  gTodos.splice(idx+1,0,todo)
  _saveTodosToStorage()
}

function moveUp(idx) {
  var todo  = gTodos.splice(idx,1)[0]
  gTodos.splice(idx-1,0,todo)
  _saveTodosToStorage()
}

function sortTodos(array) {
  if (gSortBy === 'CREATED')
    return array.sort((x, y) => {
      return x.createdAt - y.createdAt;
    });
  else if (gSortBy === 'TEXT')
    return array.sort((a, b) =>
      a.txt.toUpperCase().localeCompare(b.txt.toUpperCase())
    );
  else
    return array.sort((x, y) => {
      return x.importance - y.importance;
    });
}

function getTodosForDisplay(isArrowFunc = false) {
  if (isArrowFunc) return gTodos
  else if (gFilterBy === 'ALL') return sortTodos(gTodos);
  const todos = gTodos.filter(function (todo) {
    return (
      (todo.isDone && gFilterBy === 'DONE') ||
      (!todo.isDone && gFilterBy === 'ACTIVE')
    );
  });
  console.log(todos);
  return sortTodos(todos);
}

function removeTodo(todoId) {
  //   if (confirm('delete from list?')) {
  const idx = gTodos.findIndex((todo) => todo.id === todoId);
  gTodos.splice(idx, 1);

  _saveTodosToStorage();
  //   }
}

function toggleTodo(todoId) {
  const todo = gTodos.find((todo) => todo.id === todoId);
  todo.isDone = !todo.isDone;
  _saveTodosToStorage();
}

function addTodo(txt, importance) {
  const todo = _createTodo(txt, importance);
  gTodos.push(todo);
  _saveTodosToStorage();
}

function getTodosCount() {
  return gTodos.length;
}

function getActiveTodosCount() {
  const todos = gTodos.filter(function (todo) {
    return !todo.isDone;
  });
  return todos.length;
}

function setFilter(filterBy) {
  gFilterBy = filterBy;
}

function setSort(sortBy) {
  gSortBy = sortBy;
}

function _saveTodosToStorage() {
  saveToStorage('todosDB', gTodos);
}

function _createTodo(txt, importance = 3) {
  const todo = {
    id: _makeId(),
    txt: txt,
    isDone: false,
    createdAt: Date.now(),
    importance: importance,
  };
  console.log(todo);
  return todo;
}

function _createTodos() {
  var todos = loadFromStorage('todosDB');
  // Setup Demo data
  if (!todos || !todos.length) {
    todos = [
      _createTodo('Learn HTML'),
      _createTodo('Study CSS'),
      _createTodo('Master JS'),
    ];
  }
  gTodos = todos;
  _saveTodosToStorage();
}

function _makeId(length = 5) {
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var txt = '';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function toggleNoTodos(todos) {
  var elNoTodos = document.querySelector('.no-todos');
  if (todos.length === 0) {
    switch (gFilterBy) {
      case 'DONE':
        elNoTodos.innerText = 'No Done Todos';
        break;
      case 'ACTIVE':
        elNoTodos.innerText = 'No Active Todos';
        break;
      case 'ALL':
        elNoTodos.innerText = 'No todos';
        break;
    }
  } else elNoTodos.innerText = '';
}

function getTodoById(todoId) {
  return gTodos.find((todo) => {
    todo.id === todoId;
    return todo;
  });
}
