// io('http://localhost:3000')
const noteForm = document.querySelector('#noteForm')
const title = document.querySelector('#title')
const description = document.querySelector('#description')


noteForm.addEventListener("submit", e => {
    e.preventDefault()
    if(savedID){
        updateNote(savedID,title.value, description.value)
        savedID=''   
    }else{
        saveNote(title.value, description.value)
    }
    title.value= '',
    description.value= ''
})

//socket.on('ping') // le digo -> socket escucha

// socket.on('ping',()=>{
//     console.log("escuchado al server")
//     socket.emit('pong')
// } )

// por defecto se conecta al servidor de donde salio -> LH3000