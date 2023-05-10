/**
 * todos
 **/
todos = JSON.parse(localStorage.getItem('todos')) || [];

function dashboardHandler() {
  const taskNumB = document.getElementById('taskNumB');
  const taskNumP = document.getElementById('taskNumP');
  
  // const countB = document.querySelectorAll('.task--business').length;
  // const countP = document.querySelectorAll('.task--personal').length;
  // const doneCountB = document.querySelectorAll('.task--business.task--checked').length;
  // const doneCountP = document.querySelectorAll('.task--personal.task--checked').length;
  // const undoneCountB = countB - doneCountB;
  // const undoneCountP = countP - doneCountP;
  // taskNumB.innerText = undoneCountB;
  // taskNumP.innerText = undoneCountP;
  
  // const taskBarB = document.querySelector('.process-bar--business');
  // const taskBarP = document.querySelector('.process-bar--personal');
  // const undoneBarB = document.querySelector('.process-bar--business span');
  // const undoneBarP = document.querySelector('.process-bar--personal span');
  // const oneB = taskBarB.offsetWidth / countB;
  // const oneP = taskBarP.offsetWidth / countP;
  // undoneBarB.style.width = oneB * undoneCountB + 'px';
  // undoneBarP.style.width = oneP * undoneCountP + 'px';

  const countB = document.querySelectorAll('.task--business').length;
  const countP = document.querySelectorAll('.task--personal').length;
  const doneCountB = document.querySelectorAll('.task--business.task--checked').length;
  const doneCountP = document.querySelectorAll('.task--personal.task--checked').length;
  taskNumB.innerText = countB - doneCountB;
  taskNumP.innerText = countP - doneCountP;

  const taskBarB = document.querySelector('.process-bar--business');
  const taskBarP = document.querySelector('.process-bar--personal');
  const oneB = taskBarB.offsetWidth / countB;
  const oneP = taskBarP.offsetWidth / countP;
  const doneBarB = document.querySelector('.process-bar--business');
  const doneBarP = document.querySelector('.process-bar--personal');
  doneBarB.querySelector('span').style.width = oneB * doneCountB + 'px';
  doneBarP.querySelector('span').style.width = oneP * doneCountP + 'px';
  // doneBarB.querySelector('span').setAttribute('style', `width: ${oneB * doneCountB}`)
  // console.log(oneB * doneCountB);
}; //dashboardHandler

      
function drawTodos () {
  const ul = document.querySelector('.tasks__container');
  ul.innerHTML='';

  if(todos.length===0){
    const li = document.createElement('li');
    li.innerText = "There's nothing to do";
    ul.appendChild(li)
  }
  todos.forEach(todo=>{
    const li = document.createElement('li');

    li.classList.add('task', 'flex', 'justify-between','items-center', 'mb-4', 'p-4', 'bg-white', 'rounded-2xl', 'text-lg');
    todo.category === 'business' ? li.classList.add('task--business') : li.classList.add('task--personal');
    li.innerHTML = `
      <label class="w-11/12">
        <input type="checkbox" hidden />
        <input type="text" class="w-full" value="${todo.title}" disabled />
      </label>
      <div class="modify-container flex md:z-10">
        <button class="more-btn flex material-icons-outlined">more_vert</button>
        <button class="delete-btn md:hidden block pr-2 text-slate-600 material-icons-outlined">delete_outline</button>
        <button class="edit-btn md:hidden block text-slate-600 material-icons-outlined">edit</button>
      </div>
    `;

    const input = li.querySelector('input');
    const label = li.querySelector('label');
    const span = document.createElement('span');

    if(todo.done) {
      li.classList.add('task--checked');
      input.checked = true;
      // label.classList.add('relative');
      span.classList.add('absolute', 'material-icons-outlined');
      span.textContent='check';
      label.appendChild(span);
    } else {
      li.classList.remove('task--checked');
      input.checked = false;
    }

    function modifyHandler() {
      const modifyContainer = li.querySelector('.modify-container');
      modifyContainer.innerHTML=`
        <button class="more-btn flex material-icons-outlined">more_vert</button>
        <button class="delete-btn hidden pr-2 text-slate-600 material-icons-outlined">delete_outline</button>
        <button class="edit-btn hidden text-slate-600 material-icons-outlined">edit</button>
      `;

      const moreBtn = li.querySelector('.more-btn');
      moreBtn.addEventListener('click', ()=>{
        li.querySelector('.modify-container').style.zIndex = 1;
        li.querySelector('.modify-container').style.transitionDuration = '1s';
        li.querySelector('.modify-container').style.display = 'flex';
        li.querySelector('.delete-btn').classList.remove('hidden');
        li.querySelector('.edit-btn').classList.remove('hidden');
        li.style.width = '100%';
        moreBtn.style.display = 'none';
      });

  
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', ()=>{
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        drawTodos();
      });

      const editBtn = li.querySelector('.edit-btn');
      editBtn.addEventListener('click',()=>{
        editHandler(modifyContainer);
      });
    };
    modifyHandler();

    function editHandler(modifyContainer) {
      // const modifyContainer = li.querySelector('.modify-container');
      modifyContainer.innerHTML = `
        <button class="cancelBtn material-icons-outlined mr-4">close</button>
        <button class="okBtn material-icons-outlined">circle</button>
      `;
      const textInput = li.querySelector('input[type="text"]');
      const okBtn = modifyContainer.querySelector('.okBtn');
      const cancelBtn = modifyContainer.querySelector('.cancelBtn');
      textInput.disabled = false;
      textInput.focus();
      textInput.addEventListener('blur',(e)=>{
        textInput.disabled = true;
        if(e.relatedTarget === okBtn) {
          okBtnHandler(e);
        } else if (e.relatedTarget === cancelBtn) {
          cancelBtnHandler(e);
        } else if (e.target === textInput) {} else {
          modifyHandler();
        }
      }, {once:true});
      
      function okBtnHandler (e) {
        alert('Successfully changed!');
        todo.title = textInput.value;
        textInput.setAttribute('value', todo.title)
        todos.filter(t => t = todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        modifyHandler();
      };

      function cancelBtnHandler(e) {
        const deleteConfirm = confirm('Do you wanna cancel the change?');
        if(deleteConfirm) {
          todo.title = todo.title;
          textInput.value = todo.title;
          textInput.setAttribute('value', todo.title);
          modifyHandler();
          console.log(2)
        } else {
          okBtn.removeEventListener('click', e=>{okBtnHandler(e)},{once:true});
          cancelBtn.removeEventListener('click', e=>{cancelBtnHandler(e)},{once:true});
          okBtn.addEventListener('click', e=>{okBtnHandler(e)},{once:true});
          console.log('1');
          cancelBtn.addEventListener('click', e=>{cancelBtnHandler(e)},{once:true});
          textInput.disabled = false;
          textInput.focus();
        }
      }
    };

    // checkbox
    input.addEventListener('click', ()=>{
      todo.done = !todo.done;
      localStorage.setItem('todos', JSON.stringify(todos));
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
  window.addEventListener('resize',()=>{
    drawTodos();
  })
  username.addEventListener('blur', ()=>{
    localStorage.setItem('username', username.value);
    username.placeholder = localStorage.getItem('username') || 'Sunshine';
    username.value = localStorage.getItem('username') || 'Sunshine';
  }); // blur


} else if(page === 'form') {
  const form = document.querySelector('form');
  const categoryEls = document.querySelectorAll('input[name="taskType"]');
  let category = document.querySelector('input[name="taskType"]:checked');

  category.parentElement.classList.add('checked');
  categoryEls.forEach(btn=>{
    btn.addEventListener('click',()=>{

      for(let btn of categoryEls) {
        btn.checked = false;
        btn.parentElement.classList.remove('checked');
      }
      btn.checked = true;
      btn.parentElement.classList.add('checked');
      category = btn;
    });
  })

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let title = document.getElementById('taskInput');
    
    if(title.value === '') {
      alert('Fill out the blank');
      return;
    } else {
      const todo = {
        category: category.value,
        title: title.value,
        done: false,
        date: new Date().getFullYear()
      }
      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      const redirection = window.confirm('Successfully added! Do you want to continue adding?');
      if (!redirection) {
        window.location.href = '/';
      }
    }
    title.value = '';
  }); //submit
}

