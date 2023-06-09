import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js"
import {  } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js"
const googleButton = document.querySelector('#googleLogin')

export const auth = getAuth()

// Autentifica con google
googleButton.addEventListener('click', async () =>{
    
    const provider = new GoogleAuthProvider()

    try{
    const credentials = await signInWithPopup(auth, provider)
    console.log(credentials)
    } catch (error) {
        console.log(error)
    }
})
// Verifica si hay una sesión iniciada
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const parr = document.getElementById('parr')

onAuthStateChanged(auth, async (user) =>{
   
    if(user){
        loggedOutLinks.forEach(link => link.style.display = 'none')
        loggedInLinks.forEach(link => link.style.display = 'flex')
        parr.style.display = 'none'

    } else{
        loggedOutLinks.forEach(link => link.style.display = 'flex')
        loggedInLinks.forEach(link => link.style.display = 'none')
        parr.style.display = ''
    }

})

// Cerrar sesión 
const logout = document.querySelector('#logout')

logout.addEventListener('click', async () => {
    await signOut(auth)
    console.log('user signed out')
})
