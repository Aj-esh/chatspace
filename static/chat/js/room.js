const roomAddr = JSON.parse(document.getElementById("room_addr").textContent);
const username = JSON.parse(document.getElementById("username").textContent);

const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/room/' + roomAddr + '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const chatLog = document.querySelector('#chat-log');
    chatLog.innerHTML += `<div><strong>${data.username}</strong>: ${data.message} <span style="font-size: small;">(${data.time})</span></div>`;
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};
document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'type': 'chat',
        'message': message,
        'username': username,
        'time': new Date().toLocaleTimeString()
    }));
    messageInputDom.value = '';
};
