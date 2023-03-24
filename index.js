import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm  = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async () =>{
  
  onGetTasks((querySnapshot)=>{
    let html = ''
    querySnapshot.forEach(doc => { 
    const task = doc.data()
    html += ` 
    <div class="card card-body mt-2 border-primary">
        <h3 class="${doc.data().status} h5">${task.title}</h3>
        <p class="${doc.data().status}">${task.description} </p>
        <div class="display-flex">
          <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
          <button class="btn btn-secondary btn-complete" data-id="${doc.id}">Terminado</button>
        </div>
        
    </div>
    `;

  });

  tasksContainer.innerHTML= html
  const btnsDelete =  tasksContainer.querySelectorAll('.btn-delete')
  btnsDelete.forEach(btn =>{
    btn.addEventListener('click', ({target:{dataset}})=>{
     deleteTask(dataset.id) 
    })
  })


  const btnsComplete = tasksContainer.querySelectorAll('.btn-complete')
  btnsComplete.forEach(btn =>{
    btn.addEventListener('click', async (e) =>{
      const doc = await getTask(e.target.dataset.id)
      let status = doc.data().status
      if(status == "UNCHECK"){
        status = "CHECK"
      } else {
        status = "UNCHECK"
      }
      
      console.log(doc.id)
      updateTask(doc.id, {status: status})
      
      
    })
  })


  })
})


taskForm.addEventListener('submit', (e)=>{
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if(taskForm['task-title'].value == "" || taskForm['task-description'].value == ""){
      alert("El título no puede estar vacio")
    } else {

      saveTask(title.value, description.value, "UNCHECK")
  taskForm.reset()

    }

  
  
})



