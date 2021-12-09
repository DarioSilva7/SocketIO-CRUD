"use strict";

var _express = _interopRequireDefault(require("express"));

var _socket = require("socket.io");

var _http = _interopRequireDefault(require("http"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var notes = [];
console.log(notes);
var app = (0, _express["default"])(); // crea un servidor que al recibir app usa la configuracion de express

var httpServer = _http["default"].createServer(app);

var io = new _socket.Server(httpServer); //io es la conexion del servidor
// para ejecutarlo

io.on('connection', function (socket) {
  console.log("nueva conexion id: ", socket.id);
  socket.emit('server:loadNotes', notes);
  socket.on('client:newNote', function (newNote) {
    var note = _objectSpread(_objectSpread({}, newNote), {}, {
      id: (0, _uuid.v4)()
    }); // me guarda  {title: '', description: ''}


    notes.push(note);
    io.emit('server:newNote', note);
  });
  socket.on('client:deleteNote', function (noteId) {
    notes = notes.filter(function (n) {
      return n.id !== noteId;
    });
    io.emit('server:loadNotes', notes);
  });
  socket.on('client:getNote', function (noteId) {
    var note = notes.find(function (n) {
      return n.id === noteId;
    });
    socket.emit('server:selectedNote', note);
  });
  socket.on('client:updateNote', function (updatedNote) {
    notes = notes.map(function (n) {
      if (n.id === updatedNote.id) {
        n.title = updatedNote.title, n.description = updatedNote.description;
      }

      return n;
    });
    io.emit('server:loadNotes', notes);
  }); // socket.emit('server:resNote')
  // socket.emit('ping')
  // socket.on('pong',()=>{
  //     console.log("escuchando al cliente con id: ", socket.id)
  // })
});
app.use(_express["default"]["static"](__dirname + '/public')); // lee la carpeta public, busca el html.

var PORT = 3000;
httpServer.listen(PORT, function () {
  return console.log("Conectado a puerto: ", PORT);
});
/*
7  configurar configuracion de expess
5, 9  creo un modulo http -> le doy la configuracion de express, que es app
finalmente tengo mi servidor -> httpServer y se lo paso a websocketserver para que tambien cree un servidor de websocket
y tengo la conexion en io
*/