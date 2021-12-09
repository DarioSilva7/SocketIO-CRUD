"use strict";

// io('http://localhost:3000')
var noteForm = document.querySelector('#noteForm');
var title = document.querySelector('#title');
var description = document.querySelector('#description');
noteForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (savedID) {
    updateNote(savedID, title.value, description.value);
    savedID = '';
  } else {
    saveNote(title.value, description.value);
  }

  title.value = '', description.value = '';
}); //socket.on('ping') // le digo -> socket escucha
// socket.on('ping',()=>{
//     console.log("escuchado al server")
//     socket.emit('pong')
// } )
// por defecto se conecta al servidor de donde salio -> LH3000