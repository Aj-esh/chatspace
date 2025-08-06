const roomAddr = JSON.parse(document.getElementById("room_addr").textContent);
const username = JSON.parse(document.getElementById("username").textContent);

const chatLog = document.querySelector('#chat-log');
const chatMessageInput = document.querySelector('#chat-message-input');
const chatMessageSubmit = document.querySelector('#chat-message-submit');
const docEditor = document.querySelector('#doc-editor');

const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/room/' + roomAddr + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);

    if(data.type === 'chat_message') {
        chatLog.innerHTML = `<div><small>${data.username}</small>: ${data.message} <span style="font-size: small;">(${data.time})</span></div>` + chatLog.innerHTML;
    } else if (data.type === 'doc_update') {
        if(data.username !== username && docEditor.value !== data.document) {
            docEditor.value = data.document;
        }
    }
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
chatMessageSubmit.onclick = function(e) {
    const messageInputDom = chatMessageInput;
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'type': 'chat_message',
        'message': message,
        'username': username,
        'time': new Date().toLocaleTimeString()
    }));
    messageInputDom.value = '';
};

chatMessageInput.addEventListener('keyup', function(e) {
    if(e.key === 'Enter') {
        e.preventDefault();
        chatMessageSubmit.click();
    }
});

docEditor.oninput = function(e) {
    chatSocket.send(JSON.stringify({
        'type': 'doc_update',
        'document': docEditor.value,
        'username': username
    }));
}