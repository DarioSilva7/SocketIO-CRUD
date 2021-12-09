"use strict";

var notesList = document.querySelector('#notes');
var savedID = ''; // guardar la nota seleccionada para actualizar.

var noteUI = function noteUI(note) {
  var div = document.createElement('div');
  div.innerHTML += "\n        <div class=\"card card-body rounded-0 mb-2 \">\n            <div class=\"d-flex justify-content-between animate__animated animate__fadeInUp\">\n                <h1 class=\"h3 card-title\">".concat(note.title, "</h1>\n                <div>\n                    <button class=\"btn btn-danger delete\" data-id=\"").concat(note.id, "\" >Delete</button>\n                    <button class=\"btn btn-secondary update\" data-id=\"").concat(note.id, "\">Update</button>\n                </div>\n\n                </div>\n                <p class= \"animate__animated animate__fadeInUp\"> ").concat(note.description, "</p>\n        </div>\n    ");
  var btnDelete = div.querySelector('.delete');
  var btnUpdate = div.querySelector('.update');
  btnDelete.addEventListener('click', function () {
    deleteNote(btnDelete.dataset.id);
  });
  btnUpdate.addEventListener('click', function () {
    getNote(btnUpdate.dataset.id);
  });
  return div;
};

var renderNotes = function renderNotes(notes) {
  notesList.innerHTML = '';
  notes.forEach(function (n) {
    notesList.append(noteUI(n));
  });
};

var appendNote = function appendNote(note) {
  notesList.append(noteUI(note));
};