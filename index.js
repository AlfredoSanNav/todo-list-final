import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'

import './googleLogin.js'
import { auth } from './googleLogin.js'
//Llama al ServiceWorker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('Registro de SW exitoso!', reg))
    .catch(err => console.warn('Error al tratar de registrar el SW',
      err))
}

// Objetos
const taskForm = document.getElementById('task-form')
const tasksContainer = document.getElementById('tasks-container')
const titleInput = document.getElementById('task-title');
const descriptionTextarea = document.getElementById('task-description')

//Carga la lista de tareas
window.addEventListener('DOMContentLoaded', async () => {

  onGetTasks((querySnapshot) => {
    let html = ''
    querySnapshot.forEach(doc => {
      const task = doc.data()
      if(task.email == auth.currentUser.email){
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
      }     

    });

    tasksContainer.innerHTML = html

    //Botón para eliminar
    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
    let i = 0;
    btnsDelete.forEach((btn) => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        let listDelete = (JSON.parse(localStorage.getItem("TODO")))
        const doc = await getTask(dataset.id)

        const index = listDelete.findIndex((item) => item.title === doc.data().title && item.description === doc.data().description)
        listDelete.splice(index, 1);
        localStorage.setItem("TODO", JSON.stringify(listDelete))
        deleteTask(dataset.id)
        i++
      })
    })

    //Botón para marcar completado
    const btnsComplete = tasksContainer.querySelectorAll('.btn-complete')
    btnsComplete.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const doc = await getTask(e.target.dataset.id)
        let status = doc.data().status
        if (status == "UNCHECK") {
          status = "CHECK"
        } else {
          status = "UNCHECK"
        }

        let completeList = JSON.parse(localStorage.getItem("TODO"))
        const index = completeList.findIndex((item) => item.title === doc.data().title && item.description === doc.data().description)
        completeList[index].status = status
        localStorage.setItem("TODO", JSON.stringify(completeList))
        updateTask(doc.id, { status: status })
      })
    })


  })
})

//Revisa si está vacío el localstorage y crea uno nuevo
if (!localStorage.getItem("TODO")) {
  localStorage.setItem("TODO", JSON.stringify([]))
}

titleInput.addEventListener('keydown', (event) =>{
  if(event.keyCode === 13){
    descriptionTextarea.focus()
  }
})

descriptionTextarea.addEventListener('keydown', (event) => {
  // Verificar si la tecla presionada es "Enter"
  if (event.keyCode === 13) {
    // Llamar al método submit() del formulario
    event.preventDefault()
    const title = taskForm['task-title']
    const description = taskForm['task-description']
    
    if(title.value != "" && description.value != ""){
      const userEmail = auth.currentUser.email;
  
      saveTask(title.value, description.value, "UNCHECK", userEmail)
  
      let addList = JSON.parse(localStorage.getItem("TODO"))
  
      addList.push({
        title: title.value,
        description: description.value,
        status: "UNCHECK",
        email: userEmail
      })
  
      localStorage.setItem("TODO", JSON.stringify(addList))
      taskForm.reset()
      titleInput.focus()
    } else {
      alert("Los campos no pueden estar vacios")
      titleInput.focus()
    }
  
  }
});


//Agrega las tareas
taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const title = taskForm['task-title']
  const description = taskForm['task-description']
  
  if(title.value != "" && description.value != ""){
    const userEmail = auth.currentUser.email;

    saveTask(title.value, description.value, "UNCHECK", userEmail)

    let addList = JSON.parse(localStorage.getItem("TODO"))

    addList.push({
      title: title.value,
      description: description.value,
      status: "UNCHECK",
      email: userEmail
    })

    localStorage.setItem("TODO", JSON.stringify(addList))
    taskForm.reset()
    titleInput.focus()
  } else {
    alert("Los campos no pueden estar vacios")
    titleInput.focus()
  }
  

})
