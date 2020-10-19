const socket = io('http://localhost:4000')
const messagContainer = document.getElementById('message-container')
const messagForm = document.getElementById('send-container')
const messagInput = document.getElementById('message-input')

const name =prompt("enter your name")

if(name === null || name === 'undefined'){
    alert("refresh and enter your name")
}
else{
    appendMessage('you joined')
    socket.emit('new-user',name)
}

socket.on('user-disconnected',data=>{
    appendMessage(`${data} disconnected`)
})

socket.on('chat-message',data=>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected',data=>{
    appendMessage(`${data} connected`)
})


messagForm.addEventListener('submit',event=>{
    event.preventDefault();
    const message = messagInput.value;
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message',message );
    messagInput.value=''
});


function appendMessage(message) {
    const messageElement = document.createElement('div') //div create korlam jate ekhane message send korte pari
    messageElement.innerText=message
    messagContainer.append(messageElement)
    
}