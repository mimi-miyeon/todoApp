//
// main page script
if(page === 'main') {
  // once DOM load, focus on input#name
  const username = document.getElementById('name');
  window.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('username') === '' || localStorage.getItem('username') === 'Sunshine'){
      username.focus();
    }
    username.value = localStorage.getItem('username') || 'Sunshine';
  });
  username.addEventListener('blur', ()=>{
    localStorage.setItem('username', username.value);
    username.placeholder = localStorage.getItem('username') || 'Sunshine';
    username.value = localStorage.getItem('username') || 'Sunshine';
  });

// task loading
const todos = JSON.parse(localStorage.getItem('todos')) || '';
const fragment = document.createDocumentFragment();
const ul = document.querySelector('.tasks__container');

todos.forEach(todo => {
  const li = document.createElement('li');
  li.classList.add('task', 'flex', 'items-center', 'mb-4', 'p-4', 'bg-white', 'rounded-2xl', 'text-lg')
  if(todo.category === 'business') {
    li.classList.add('task--business') 
  } else {
    li.classList.add('task--personal')
  }
  li.innerHTML = `
    <label class="w-4 h-4 mr-2 border border-red-400 rounded-xl">
      <input type="checkbox" hidden />
    </label>
    <p>${todo.title}</p>
  `
  const taskInp = li.querySelector('input');
  const taskLab = li.querySelector('label');
  taskInp.addEventListener('click',()=>{
    if(taskInp.checked){
      li.classList.add('task--checked');
      taskLab.style.borderColor='#e2e8f0';
      taskLab.style.backgroundColor='#e2e8f0';
      const checkedIcon = document.createElement('span');
      checkedIcon.classList.add('absolute', 'material-icons-outlined')
      checkedIcon.innerText = 'check'
      taskLab.appendChild(checkedIcon);
    }else {
      li.classList.remove('task--checked');
      if(li.classList.contains('task--business')){
        taskLab.style.borderColor='#f87171';
      } else {
        taskLab.style.borderColor='#60a5fa';
      }
      taskLab.querySelector('span').remove();
      taskLab.style.backgroundColor='transparent';
    }
  });

  let startPoint ;
  function touchMove(e) {
    const movePoint = e.changedTouches[0].screenX;
    if(movePoint < startPoint) {
      console.log('left')
      li.style.transition = '.5s';
      li.style.transform = 'translateX(-100px)';
    } else {
      console.log('right')
      li.style.transition = '.5s';
      li.style.transform = 'translateX(0)';
    }
  }
 
  li.addEventListener('touchstart', (e)=>{
    startPoint = e.changedTouches[0].screenX;
  },false)
  li.addEventListener('touchmove', touchMove, false);

  ul.appendChild(li);
})
fragment.appendChild(ul);
document.getElementById('tasks').appendChild(fragment)

  // process bar done-color, undone-grey
  const taskNumB = document.getElementById('taskNumB');
  const taskNumP = document.getElementById('taskNumP');
  const taskCountB = document.querySelectorAll('.task--business').length;
  const taskCountP = document.querySelectorAll('.task--personal').length;

  if(taskCountB > 0) {
    const processBarW = document.querySelector('.process-bar--business').offsetWidth;
    const onePer = processBarW / taskCountB;
    const undoneBar = document.querySelector('.process-bar--business .unchecked');
    const doneTasks = document.querySelectorAll('.task--business.task--checked')

    undoneBar.style.width = processBarW - (doneTasks.length * onePer) + 'px';
    undoneBar.setAttribute('title', `${taskCountB - doneTasks.length}`)
    taskNumB.innerText = taskCountB - doneTasks.length;
  } else {
    const undoneBar = document.querySelector('.process-bar--business .unchecked');
    undoneBar.style.width = 0;
    taskNumB.innerText = 0;
  }

  if(taskCountP > 0) {
    const processBarW = document.querySelector('.process-bar--personal').offsetWidth;
    const onePer = processBarW / taskCountB;
    const undoneBar = document.querySelector('.process-bar--personal .unchecked');
    const doneTasks = document.querySelectorAll('.task--personal.task--checked')

    undoneBar.style.width = processBarW - (doneTasks.length * onePer) + 'px';
    undoneBar.setAttribute('title', `${taskCountB - doneTasks.length}`)
    taskNumP.innerText = taskCountP - doneTasks.length;
} else {
    const undoneBar = document.querySelector('.process-bar--personal .unchecked');
    undoneBar.style.width = 0;
    taskNumP.innerText = 0;
  }


  // task swipe edit, delete, check
  const taskEls = document.querySelectorAll('.task');
  taskEls.forEach(task=>{
    const taskLab = task.querySelector('label');
    const taskInp = task.querySelector('input');

    //Eventhough input tag is hidden, it is clickable through label tag ********
    taskInp.addEventListener('click',()=>{
      if(taskInp.checked){
        task.classList.add('task--checked');
        taskLab.style.borderColor='#e2e8f0';
        taskLab.style.backgroundColor='#e2e8f0';
        const checkedIcon = document.createElement('span');
        checkedIcon.classList.add('absolute', 'material-icons-outlined')
        checkedIcon.innerText = 'check'
        taskLab.appendChild(checkedIcon)
      }else {
        task.classList.remove('task--checked');
        if(task.classList.contains('task--business')){
          taskLab.style.borderColor='#f87171';
        } else {
          taskLab.style.borderColor='#60a5fa';
        }
        taskLab.querySelector('span').remove();
        taskLab.style.backgroundColor='transparent';
      }
    });
  });

  
} else if(page === 'form') {
  const form = document.querySelector('form');
  const taskInput = document.getElementById('taskInput');
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  const radioEls = document.querySelectorAll('input[name="taskType"]');

  // get radio value, input.value
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const taskType = document.querySelector('input[name="taskType"]:checked');

    const task = {
      'title' : taskInput.value,
      'category' : taskType.value
    }

    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));

    taskInput.value = '';
    taskInput.focus();
  });

  console.log(radioEls)
    radioEls.forEach(radio=>{
      if(radio.checked) {
        radio.parentElement.classList.add('checked')
      }

      radio.addEventListener('click', ()=>{
        for(let i=0; i<radioEls.length; i++){
          radioEls[i].parentElement.classList.remove('checked')
        }
        radio.parentElement.classList.add('checked');
      })
    })

  // setItem
}


