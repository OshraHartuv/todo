'use strict';

function renderTodos(isArrowFunc = false) {
  const todos = getTodosForDisplay(isArrowFunc);
  const strHtmls = todos.map(function (todo, index) {
    return `<li onclick="onToggleTodo('${todo.id}')" class="${todo.isDone ? 'done' : ''}">
        ${todo.txt}
        ${renderArrows(index, todos)}
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`;
  });
  document.querySelector('.todo-list').innerHTML = strHtmls.join('');
  document.querySelector('.total-count').innerText = getTodosCount();
  document.querySelector('.active-count').innerText = getActiveTodosCount();
  toggleNoTodos(todos);
}

function renderArrows(idx, todos) {
  if (getFilter() !== 'ALL') return ''
  var strHTML = ` <span class="arrow-btns">`;
  if (!idx)
    strHTML += `<button onclick="onMoveDown(event,'${idx}')">🡫</button>`;
  else if (idx === todos.length-1)
    strHTML += `<button onclick="onMoveUp(event, '${idx}')">🡩</button>`;
  else
    strHTML += `<button onclick="onMoveUp(event, '${idx}')">🡩</button>
 <button onclick="onMoveDown(event,'${idx}')">🡫</button>`;
strHTML += `</span>`
return strHTML
}

function onMoveDown(ev,idx){
  ev.stopPropagation()
  moveDown(idx)
  renderTodos(true)
}

function onMoveUp(ev, idx) {
  ev.stopPropagation();
  moveUp(idx);
  renderTodos(true);
}

function onRemoveTodo(ev, todoId) {
  ev.stopPropagation();
  console.log('Removing todo', todoId);
  removeTodo(todoId);
  renderTodos();
}

function onToggleTodo(todoId) {
  console.log('Toggling todo', todoId);
  toggleTodo(todoId);
  renderTodos();
}

function onAddTodo() {
  const elTxt = document.querySelector('.txt-input');
  const txt = elTxt.value;
  if (!txt) return;
  const elImportance = document.querySelector('.importance-input');
  var importance = parseInt(elImportance.value);
  if (importance < 1) importance = 1;
  else if (importance > 3) importance = 3;
  addTodo(txt, importance);
  renderTodos();
  elTxt.value = '';
  elImportance.value = '';
}

function onSetFilter(filterBy) {
  console.log('Filtering By:', filterBy);
  setFilter(filterBy);
  renderTodos();
}

function onSetSort(sortBy) {
  console.log('sorting By:', sortBy);
  setSort(sortBy);
  renderTodos();
}
