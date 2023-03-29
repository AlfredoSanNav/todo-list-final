//Asignar un nombre y versión al cache
const CACHE_NAME= 'v1_cache_programador_fitness',
urlsToCache=[
    './',
    'https://bootswatch.com/5/quartz/bootstrap.min.css',
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js',
    './style.css',
    './index.html',
    './script.js',
    'img/logo.png',
    'img/todoList-logo.png'
]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache=>{
            return cache.addAll(urlsToCache)
            .then(()=>self.skipWaiting())
        })
        .catch(err=> console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e=>{
    const cacheWhitelist=[CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames=>{
            cacheNames.map(cacheName=>{
                //eliminamos lo que ya no se necesita en el cache
                if(cacheWhitelist.indexOf(cacheName) === -1){
                    return caches.delete(cacheName)
                }
            })
        })
    //le indica al SW activar el cache actual
    .then(()=>self.clients.claim())
    )
})

//cuando el navegador recupera una url 
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
      caches.match(e.request)
        .then(res => {
          if (res) {
            //recuperar del cache
            return res
          }
          //recuperar de la petición a la url
          return fetch(e.request)
        })
    )
  })