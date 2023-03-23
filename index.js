import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

const taskForm  = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')

window.addEventListener('DOMContentLoaded', async () =>{
  
  onGetTasks((querySnapshot)=>{
    let html = ''
    querySnapshot.forEach(doc => { 
    const task = doc.data()
    html += ` 
    <div>
        <h3 class="${doc.data().status}">${task.title}</h3>
        <p class="${doc.data().status}">${task.description} </p>
        <button class="btn-delete" data-id="${doc.id}">Delete</button>
        <button class="btn-complete" data-id="${doc.id}">Terminado</button>
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
      const newStatus = ""
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

  saveTask(title.value, description.value, "UNCHECK")
  taskForm.reset()
})

