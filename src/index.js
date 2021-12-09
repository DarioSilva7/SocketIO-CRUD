import express from 'express'
//para no confundir Server con el Server de Express lo renombramos
//recibe un servidor http, tenemos que llamar al modulo http
import {Server as WebSocketServer} from 'socket.io'
import http from 'http'
import {v4 as uuid} from 'uuid'

var notes=[]
console.log(notes)

const app = express() 
// crea un servidor que al recibir app usa la configuracion de express
const httpServer = http.createServer(app)
const io = new WebSocketServer(httpServer)
//io es la conexion del servidor
// para ejecutarlo
io.on('connection',(socket)=>{
    console.log("nueva conexion id: ",socket.id)
    
    socket.emit('server:loadNotes', notes)

    socket.on('client:newNote',newNote=>{
        const note = { ...newNote, id: uuid() }// me guarda  {title: '', description: ''}
        notes.push(note)
        io.emit('server:newNote',note)
    })
    
    socket.on('client:deleteNote', noteId=>{
        notes= notes.filter(n=> n.id !== noteId)
        io.emit('server:loadNotes', notes)
    })

    socket.on('client:getNote', noteId=>{
        const note= notes.find(n=> n.id === noteId)
        socket.emit('server:selectedNote', note)
    })
    
    socket.on('client:updateNote', updatedNote=>{
        notes= notes.map(n=> {
            if(n.id === updatedNote.id){
                n.title= updatedNote.title,
                n.description= updatedNote.description
            }
            return n
        })
        io.emit('server:loadNotes', notes)
    })
    // socket.emit('server:resNote')
    // socket.emit('ping')
    // socket.on('pong',()=>{
    //     console.log("escuchando al cliente con id: ", socket.id)
    // })
})

app.use(express.static(__dirname + '/public')) // lee la carpeta public, busca el html.

const PORT= 3000
httpServer.listen(PORT, ()=> console.log("Conectado a puerto: ", PORT))


/*
7  configurar configuracion de expess
5, 9  creo un modulo http -> le doy la configuracion de express, que es app
finalmente tengo mi servidor -> httpServer y se lo paso a websocketserver para que tambien cree un servidor de websocket
y tengo la conexion en io
*/