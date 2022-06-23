const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector('#task');

loadEventlisteners();

function loadEventlisteners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
     // DOMContentloaded event fires whenever the document is loaded 
    form.addEventListener('submit', addtask);
    //to delete a task
    taskList.addEventListener('click', removeItem);
    //clear task
    clearBtn.addEventListener('click', clrTask);
    filter.addEventListener('keyup', filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task){
    //created a list item li
    const li = document.createElement('li');
    //li should have class as collection-item in materialise css
    li.className = 'collection-item';          
    //put text part of the li with the text enetered in new task
    li.appendChild(document.createTextNode(task));
    //created a link tag for the delete icon
    const link = document.createElement('a');
    //to put a second element in an li so that it appears on the right, it  should have class as secondary-item //in materialise css
    link.className = 'delete-item secondary-content';
    //created an i tag with x icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //appended the link to the li
    li.appendChild(link);
    //appended the final li to the ul
    taskList.appendChild(li);
    //store in local storage
    });
}

function addtask(e) {
    if (taskInput.value == '') {
        alert("Add Task");
    }
    else{
        //created a list item li
        const li = document.createElement('li');
        //li should have class as collection-item in materialise css
        li.className = 'collection-item';          
        //put text part of the li with the text enetered in new task
        li.appendChild(document.createTextNode(taskInput.value));
        //created a link tag for the delete icon
        const link = document.createElement('a');
        //to put a second element in an li so that it appears on the right, it  should have class as secondary-item //in materialise css
        link.className = 'delete-item secondary-content';
        //created an i tag with x icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //appended the link to the li
        li.appendChild(link);
        //appended the final li to the ul
        taskList.appendChild(li);
        //store in local storage
        storeTaskInLocalStorage(taskInput.value);
        //cleared the input
        taskInput.value = '';
    }
    e.preventDefault();   //stops the submitting of page as the button is submit type
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(e){
    if(e.target.parentElement.classList.contains('delete-item')){  
        /*for x icon, target gives i tag, so to target the  a tag, we use parent element.. Also, if we used className in place of classList, it will work only when the class namme is written completely and correctly e.g we would require delete-item secondary-content as the class name.. But classList checks only for the particular class name that we pass to it*/ 
        e.target.parentElement.parentElement.remove();  //removing the entire li.. i->parent=a->parent=li
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent===task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}



function clrTask(){
    while(taskList.firstChild){  //means until the task list has a child
        taskList.removeChild(taskList.firstChild);   
    }
    localStorage.clear();


    /*or we can do another way
    taskList.innerHTML='';*/
}
// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }