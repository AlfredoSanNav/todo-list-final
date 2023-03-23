  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
  import {  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDSWifZi4fmwgN3rmvWSPiTCSI7vHy70pE",
    authDomain: "todo-list-7a521.firebaseapp.com",
    projectId: "todo-list-7a521",
    storageBucket: "todo-list-7a521.appspot.com",
    messagingSenderId: "1079628253084",
    appId: "1:1079628253084:web:a19289f039783f7b982a59"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const db = getFirestore()
export  const saveTask = (title, description, status) => {
    addDoc(collection(db, 'tasks'),{title, description, status })
    console.log("Guardada en firestore")
  };

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id))

export const getTask = (id) => getDoc(doc(db, "tasks", id))

export const updateTask = (id, newFields) => updateDoc(doc(db,'tasks', id), newFields)