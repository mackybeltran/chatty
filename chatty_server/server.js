// server.js

const express = require('express');
const SocketServer = require('ws').Server;
var uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  console.log('Client connected');

   const userCount = {"type": "incomingUserCount",
                      "count": wss.clients.size}

    wss.broadcast(JSON.stringify(userCount))

    ws.on('message', (message) => {

      let data = JSON.parse(message);
      data.id = uuid.v4()
        switch(data.type) {
          case "postMessage":
        // handle incoming message
            data['type'] = "incomingMessage"

            wss.broadcast(JSON.stringify(data));
        break;
          case "postNotification":
        // handle incoming notification
            data['type'] = "incomingNotification"

            wss.broadcast(JSON.stringify(data));
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + data.type);
    }
});





  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {console.log('Client disconnected')
       const userCount = {"type": "incomingUserCount",
                      "count": wss.clients.size}

        wss.broadcast(JSON.stringify(userCount))

  });
});


wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data )
  });
};





