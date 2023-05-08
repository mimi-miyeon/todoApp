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
      <label>
        <input type="checkbox" hidden />
        <input type="text" value="${todo.title}" disabled />
      </label>
      <div class="modify-container flex md:flex hidden md:z-10">
        <button class="more-btn md:flex hidden material-icons-outlined">more_vert</button>
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
      // label.classList.remove('relative');
    }

    let startX;
    let moveX;
    let combineHandler = (startX, moveX) => {
      if(moveX < startX) {
        li.style.width = 'calc(100% - 90px)';
        li.querySelector('.modify-container').style.zIndex = 1;
        li.querySelector('.modify-container').style.transitionDuration = '1s';
        li.querySelector('.modify-container').style.display = 'flex';

        if(li.querySelector('.edit-wrap')){
          li.querySelector('.edit-wrap').remove();
        }
      }else {
        li.style.width = '100%';
        li.querySelector('.modify-container').style.zIndex = -1;
        li.querySelector('.modify-container').style.transitionDuration = '0s';
        li.querySelector('.modify-container').style.display = 'hidden';
      }
    };

    li.addEventListener('touchstart', e=>{
      startX = e.changedTouches[0].screenX;

      li.addEventListener('touchmove', e=>{
        moveX = e.changedTouches[0].screenX;
        combineHandler(startX, moveX);
      });
    });

    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', ()=>{
      todos = todos.filter(t => t != todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      drawTodos();
    });

    const editBtn = li.querySelector('.edit-btn');
    // editBtn.addEventListener('click',(e)=>{
    //   const inputText = li.querySelector('input[type="text"]');
    //   inputText.disabled = false;
    //   inputText.focus();
      
    //   li.style.width = '100%';
    //   li.querySelector('.modify-container').style.zIndex = -1;
    //   li.querySelector('.modify-container').style.transitionDuration = '0s';
    //   li.querySelector('.modify-container').style.display = 'hidden';

    //   const div = document.createElement('div');
    //   div.classList.add('edit-wrap','flex');
    //   div.innerHTML = `
    //     <button class="closeBtn material-icons-outlined mr-4">close</button>
    //     <button class="okBtn material-icons-outlined">circle</button>`
    //   li.appendChild(div);
    //   setTimeout(()=>{
    //     div.querySelectorAll('button').forEach(btn=>{
    //       btn.style.opacity = 1
    //     });
    //   },200);

    //   const okBtn = div.querySelector('.okBtn');
    //   const closeBtn = div.querySelector('.closeBtn');

    //   inputHandler(okBtn, closeBtn, inputText, div);
    //   e.stopImmediatePropagation();
    // });

    function editHandler() {
      const inputText = li.querySelector('input[type="text"]');
      inputText.disabled = false;
      inputText.focus();
      inputText.addEventListener('blur',()=>{
        inputText.disabled = true;

        // more-btn and delete, edit btns
      });

      const modifyContainer = li.querySelector('.modify-container');
      modifyContainer.innerHTML = `
        <button class="closeBtn material-icons-outlined mr-4">close</button>
        <button class="okBtn material-icons-outlined">circle</button>
      `;

      const okBtn = modifyContainer.querySelector('.okBtn');
      const closeBtn = modifyContainer.querySelector('.closeBtn');

      okBtn.addEventListener('click',()=>{
        alert('Successfully changed!');
        modifyContainer.innerHTML = `
          <button class="more-btn md:flex hidden material-icons-outlined">more_vert</button>
          <button class="delete-btn md:hidden block pr-2 text-slate-600 material-icons-outlined">delete_outline</button>
          <button class="edit-btn md:hidden block text-slate-600 material-icons-outlined">edit</button>
        `;
      });
    }

    editBtn.addEventListener('click',()=>{
      editHandler();
    });

    function inputHandler(okBtn, closeBtn, inputText, div) {
      okBtn.addEventListener('click', ()=>{
        alert('Successfully changed!');
        todo.title = inputText.value;
        todos.filter(t => t = todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        
        div.style.display = 'none'
        div.style.opacity = 0;
        inputText.disabled = true;
      });

      closeBtn.addEventListener('click', ()=>{
        const cancelChange = confirm('Do you wanna dismiss the changes?');
        if(cancelChange) {
          inputText.value = todo.title;
          div.style.display = 'none'
          div.style.opacity = 0;
          inputText.disabled = true;
        } else {
          inputText.focus();
        }
      });
      document.onclick = (e)=>{
        console.log('document');
        switch (e.target) {
          case okBtn:
          break;
          case closeBtn:
          break;
          case editBtn:
          break;
          case deleteBtn:
          break;
          case li:
          break;

          default:
            const cancelChange = confirm('Do you wanna dismiss the changes?');
            if(cancelChange) {
              inputText.value = todo.title;
              div.style.display = 'none'
              div.style.opacity = 0;
              inputText.disabled = true;
              console.log('document1')
              document.onclick=()=>{return;}
            } else {
              inputText.focus();
            }
          break;
        }
      }
    }

    const moreBtn = li.querySelector('.more-btn');
    moreBtn.addEventListener('click', ()=>{
      li.querySelector('.modify-container').style.zIndex = 1;
      li.querySelector('.modify-container').style.transitionDuration = '1s';
      li.querySelector('.modify-container').style.display = 'flex';
      li.querySelector('.delete-btn').classList.remove('md:hidden');
      li.querySelector('.edit-btn').classList.remove('md:hidden');
      moreBtn.style.display = 'none';
    });

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
      
      const redirection = window.confirm('Successfully added!');
      if (redirection) {
        window.location.href = '/';
      }
    }
    title.value = '';
  }); //submit
}


