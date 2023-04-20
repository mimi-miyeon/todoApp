/**
 * todos
 **/
todos = JSON.parse(localStorage.getItem('todos')) || [];

function dashboardHandler() {
  const taskNumB = document.getElementById('taskNumB');
  const taskNumP = document.getElementById('taskNumP');
  
  const countB = document.querySelectorAll('.task--business').length;
  const countP = document.querySelectorAll('.task--personal').length;
  const doneCountB = document.querySelectorAll('.task--business.task--checked').length;
  const doneCountP = document.querySelectorAll('.task--personal.task--checked').length;
  const undoneCountB = countB - doneCountB;
  const undoneCountP = countP - doneCountP;
  taskNumB.innerText = undoneCountB;
  taskNumP.innerText = undoneCountP;
  
  const taskBarB = document.querySelector('.process-bar--business');
  const taskBarP = document.querySelector('.process-bar--personal');
  const undoneBarB = document.querySelector('.process-bar--business span');
  const undoneBarP = document.querySelector('.process-bar--personal span');
  const oneB = taskBarB.offsetWidth / countB;
  const oneP = taskBarP.offsetWidth / countP;
  undoneBarB.style.width = oneB * undoneCountB + 'px';
  undoneBarP.style.width = oneP * undoneCountP + 'px';
};

function clickHandler() {
  todo.done = !todo.done;
  localStorage.setItem('todos', JSON.stringify(todos));
  dashboardHandler();
}

function swipeStart(e) {
  
}

const swipeStart = () => {
  li.addEventListener('touchstart',(e)=>{
      console.log(e.changedTouches[0].screenX)
    });
}

function swipeDir(e) {}

function drawTodos () {
  const ul = document.querySelector('.tasks__container');

  todos.forEach(todo=>{
    const li = document.createElement('li');
    li.classList.add('task', 'flex', 'items-center', 'mb-4', 'p-4', 'bg-white', 'rounded-2xl', 'text-lg');
    todo.category === 'business' ? li.classList.add('task--business') : li.classList.add('task--personal');
    li.innerHTML = `
      <label class="w-4 h-4 mr-2 border ${todo.category === 'business' ? 'border-red-400' : 'border-blue-400'} rounded-xl">
        <input type="checkbox" hidden />
      </label>
      <p>${todo.title}</p>
    `;

    const input = li.querySelector('input');
    const label = li.querySelector('label');
    const span = document.createElement('span');

    if(todo.done) {
      li.classList.add('task--checked');
      input.checked = true;
      label.classList.add('relative', 'border-slate-200','bg-slate-200');
      span.classList.add('absolute', 'material-icons-outlined');
      span.textContent='check';
      label.appendChild(span);
    } else {
      li.classList.remove('task--checked');
      input.checked = false;
      label.classList.remove('relative', 'border-slate-200','bg-slate-200');
      // span.classList.remove('absolute', 'material-icons-outlined')
      // label.querySelector('span').remove();
    }

    

    li.addEventListener('touchmove',(e)=>{
      console.log(e.changedTouches[0].screenX)
    })

    input.addEventListener('click', ()=>{
      todo.done = !todo.done;
      localStorage.setItem('todos', JSON.stringify(todos));
      ul.innerHTML='';
      drawTodos();
      dashboardHandler();
    });
    ul.appendChild(li);
  }); // forEach

  document.getElementById('tasks').appendChild(ul);
}

if(page === 'main') {
  /**
   * username setting
   **/
  const username = document.getElementById('name');
  window.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('username') === '' || localStorage.getItem('username') === 'Sunshine'){
      username.focus();
    }
    username.value = localStorage.getItem('username') || 'Sunshine';
    drawTodos();
    dashboardHandler();
  });  // loaded

  username.addEventListener('blur', ()=>{
    localStorage.setItem('username', username.value);
    username.placeholder = localStorage.getItem('username') || 'Sunshine';
    username.value = localStorage.getItem('username') || 'Sunshine';
  }); // blur


} else if(page === 'form') {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e)=>{
    let title = document.querySelector('#taskInput').value;
    const category = document.querySelector('input[name="taskType"]:checked').value;
    e.preventDefault();
    
    if(title === '') {
      alert('Fill out the blank');
      return;
    }

    const todo = {
      category: category,
      title: title,
      done: false,
      date: new Date().getFullYear()
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    
    title = '';
    window.location.href = '/';
  }); //submit
}


