"use strict";

var socket = io(); //puedo escuchar

var saveNote = function saveNote(title, description) {
  socket.emit('client:newNote', {
    title: title,
    description: description
  });
};

var deleteNote = function deleteNote(id) {
  socket.emit('client:deleteNote', id);
};

var getNote = function getNote(id) {
  socket.emit('client:getNote', id);
};

var updateNote = function updateNote(id, title, description) {
  socket.emit('client:updateNote', {
    id: id,
    title: title,
    description: description
  });
};

socket.on('server:newNote', appendNote); // appendNote -> recibe el argumento y es lo mismo que escribirlo asi -> appendNote(note)

socket.on('server:loadNotes', renderNotes);
socket.on('server:selectedNote', function (note) {
  var title = document.querySelector('#title');
  var description = document.querySelector('#description');
  title.value = note.title;
  description.value = note.description;
  savedID = note.id;
});