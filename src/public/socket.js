const socket = io() //puedo escuchar

const saveNote = (title, description)=>{
    socket.emit('client:newNote', { 
        title, 
        description 
    })
}
const deleteNote=(id)=>{
    socket.emit('client:deleteNote',id)
}

const getNote=(id)=>{
    socket.emit('client:getNote',id)
}

const updateNote=(id, title, description)=>{
    socket.emit('client:updateNote',{
        id,
        title,
        description
    })
}

socket.on('server:newNote',appendNote) // appendNote -> recibe el argumento y es lo mismo que escribirlo asi -> appendNote(note)

socket.on('server:loadNotes',renderNotes)

socket.on('server:selectedNote',note=>{
    const title= document.querySelector('#title')
    const description= document.querySelector('#description')
    
    title.value= note.title
    description.value= note.description
    savedID= note.id
})