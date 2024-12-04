const { ipcRenderer } = require('electron');
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

let peer
let protect = false

// Set up socket.io connection
io.on('connection', (socket) => {
  console.log('Client connected', socket.id);

  // Create offer and send to client
  socket.on('offer', (e) => {
    createOffer()
  })

  // Receive answer
  socket.on('answer', (answer) => {
    if(protect == false){
      console.log(answer);
      peer.setRemoteDescription(JSON.parse(answer))
      protect = true
    }
  })

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    ipcRenderer.send('reload-window');
  });
});

// Start the server on port 3000
server.listen(3000, () => {console.log('Server is running on http://localhost:3000')});

let createOffer = () => {
  peer = new RTCPeerConnection()

  // Get media devices and create data channel & offer
  navigator.mediaDevices.getUserMedia({video: {
    mandatory: {              
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: 'screen:0:0'
    },
    cursor: 'never'
    }, audio: false})
    .then((stream) => {
        let channel = peer.createDataChannel('channel')

        channel.onopen = (e) => {
            console.log('Connection Opened');
        }
        
        channel.onmessage = (e) => {
            console.log(e.data);
            io.emit('message', e.data)
        }

        peer.addStream(stream)
        
        peer.createOffer()
        .then((offer) => {
            peer.setLocalDescription(offer)
        })
        .catch((err) => {
            console.log(err);
        })
        
        peer.onicecandidate = (e) => {
            if(e.candidate){
                let offer = JSON.stringify(peer.localDescription)
                io.emit('offer', offer);
            }
        }
    })
    .catch((err) => console.log(err))
}