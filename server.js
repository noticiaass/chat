const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
  console.log('Connected to WebSocket server!');
});

socket.addEventListener('message', function (event) {
  const message = event.data;
  console.log('Received message:', message);
  // adicione código para exibir a mensagem na tela
});

const sendButton = document.getElementById('sendbutton');
const userInput = document.getElementById('userinput');

sendButton.addEventListener('click', function () {
  const message = userInput.value;
  socket.send(message);
  userInput.value = '';
});
