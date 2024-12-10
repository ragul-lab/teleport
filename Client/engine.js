let remote = document.getElementById('remote')
let web = document.getElementById('web')
let stream = document.getElementById('stream')
let address = document.getElementById('address')

let socket
let peer = new RTCPeerConnection()
let channel
let protect = false
let connected = false

/* Variables for gamepad controls */
let gamepadIndex = null
const buttonsOfXbox = ['A', 'B', 'X', 'Y', 'LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_TRIGGER', 'RIGHT_TRIGGER', 'BACK', 'START', 'LEFT_THUMB', 'RIGHT_THUMB', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'GUIDE']
const axisOfXbox = ['LEFT_X_AXIS', 'LEFT_Y_AXIS', 'RIGHT_X_AXIS', 'RIGHT_Y_AXIS']
let registeredAxis = []
let goForOnline = false

stream.addEventListener('click', (e) => {
    socket = io(`http://${address.value}:3000`);

    socket.emit('offer', 'Requesting for offer')

    socket.on('offer', (offer) => {
        if(protect == false){
            createAnswer(offer)
            protect = true
        }
    })
})

let createAnswer = (offer) => {

    peer.ondatachannel = (e) => {
        channel = e.channel

        channel.onopen = (e) => {
            connected = true
            console.log('Connection Opened');

            document.documentElement.style.overflow = 'hidden'
            document.body.style.overflow = 'hidden'
            web.remove()
            remote.style.display = 'block'
            remote.controls = false
            remote.play()
        
            remote.style.width = window.innerWidth+'px'
            remote.style.height = window.innerHeight+'px'
            document.body.style.cursor = 'none'
        }

        channel.onmessage = (e) => {
            console.log(e.data);
        }
    }

    peer.onaddstream = (e) => {
        remote.srcObject = e.stream
    }

    peer.setRemoteDescription(JSON.parse(offer))

    peer.createAnswer()
    .then((answer) => {
        peer.setLocalDescription(answer)
    })
    .catch((err) => {
        console.log(err);
    })

    peer.onicecandidate = (e) => {
        if(e.candidate){
            let answer = JSON.stringify(peer.localDescription)
            console.log(answer);
            socket.emit('answer', answer)
        }
    }
}

window.addEventListener('resize', (e) => {
    remote.style.width = window.innerWidth+'px'
    remote.style.height = window.innerHeight+'px'
})

/* Capture Mouse Mouse Move */
remote.addEventListener('mousemove', (e) => {
    if(connected){
        let posX = remote.offsetLeft
        let posY = remote.offsetTop
        let tempX = (e.pageX - posX) / window.innerWidth * 100 
        let tempY = (e.pageY - posY) / window.innerHeight * 100
        channel.send(JSON.stringify({type: 'mouse-move', x: tempX, y: tempY}))
    }
})

/* Capture Mouce click & Drag */
isDrag = false
remote.addEventListener('mousedown', (e) => {
    if(connected){
        let posX = remote.offsetLeft
        let posY = remote.offsetTop
        let tempX = (e.pageX - posX) / window.innerWidth * 100 
        let tempY = (e.pageY - posY) / window.innerHeight * 100
        channel.send(JSON.stringify({type: 'mouse-down', x: tempX, y: tempY}))
    }
})
remote.addEventListener('mouseup', (e) => {
    if(connected){
        let posX = remote.offsetLeft
        let posY = remote.offsetTop
        let tempX = (e.pageX - posX) / window.innerWidth * 100 
        let tempY = (e.pageY - posY) / window.innerHeight * 100
        channel.send(JSON.stringify({type: 'mouse-up', x: tempX, y: tempY}))
    }  
})

/* Capture Mouse Right Click */
remote.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    if(connected){
        let posX = remote.offsetLeft
        let posY = remote.offsetTop
        let tempX = (e.pageX - posX) / window.innerWidth * 100 
        let tempY = (e.pageY - posY) / window.innerHeight * 100
        channel.send(JSON.stringify({type: 'mouse-right', x: tempX, y: tempY}))
    } 
})

/* Capture Mouse Scroll */
remote.addEventListener('wheel', (e) => {
    const delta = e.deltaY || e.detail || e.wheelDelta;

    if (delta > 0) {
        console.log('Scrolling down');
        channel.send(JSON.stringify({type: 'wheel-down'}))
    } else if (delta < 0) {
        console.log('Scrolling up');
        channel.send(JSON.stringify({type: 'wheel-up'}))
    }
})

/* Capture Keyboard Events */
window.addEventListener('keydown', function(e) {
    e.preventDefault()
    if (e.ctrlKey || e.altKey || e.shiftKey) {
        let modifiers = [];
        if (e.ctrlKey) modifiers.push('ctrl');
        if (e.altKey) modifiers.push('alt');
        if (e.shiftKey) modifiers.push('shift');

        let keyPressed = e.key.toLowerCase();

        if (modifiers.length > 0 && keyPressed !== 'control' && keyPressed !== 'alt' && keyPressed !== 'shift'){
            if(modifiers.length == 1){
                channel.send(JSON.stringify({
                    type: 'short-2-key', 
                    hold: modifiers[0], 
                    key: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : keyPressed
                }))
                console.log(JSON.stringify({
                    type: 'short-2-key', 
                    hold: modifiers[0], 
                    key: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : keyPressed
                }))
            }
            else if(modifiers.length == 2){
                console.log(JSON.stringify({
                    type: 'short-3-key',
                    key_1: modifiers[0],
                    key_2: modifiers[1], 
                    key_3: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : keyPressed
                }))
                channel.send(JSON.stringify({
                    type: 'short-3-key',
                    key_1: modifiers[0],
                    key_2: modifiers[1], 
                    key_3: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : keyPressed
                }))
            }
        }
    }
    else{
        let keyPressed = e.key.toLowerCase();

        // Arrow keys
        if (keyPressed == 'arrowup' || keyPressed == 'arrowdown' || keyPressed == 'arrowleft' || keyPressed == 'arrowright'){
            console.log(JSON.stringify({
                type: 'key-stroke', 
                key: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : null
            }))
            channel.send(JSON.stringify({
                type: 'key-stroke', 
                key: keyPressed == 'arrowup' ? 'up' : keyPressed == 'arrowdown' ? 'down' : keyPressed == 'arrowleft' ? 'left' : keyPressed == 'arrowright' ? 'right' : null
            }))
        }
        // alphabets
        else{
            console.log(JSON.stringify({type: 'key-stroke', key: keyPressed.toLowerCase()}))
            channel.send(JSON.stringify({type: 'key-stroke', key: keyPressed.toLowerCase()}))
        }
    }
});

// Control + function keys
/*
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'F4') {
        e.preventDefault();
        channel.send(JSON.stringify({type: 'short-key', key: 'close'}))
        console.log(JSON.stringify({type: 'short-key', key: 'close'}))
    }
});
window.addEventListener('beforeunload', (e) => {
    e.returnValue = 'Are you sure you want to leave?'
});
*/

/* Capture Mouse Mouse Click */
/*
remote.addEventListener('click', (e) => {
    if(connected){
        let posX = remote.offsetLeft
        let posY = remote.offsetTop
        let tempX = (e.pageX - posX) / window.innerWidth * 100 
        let tempY = (e.pageY - posY) / window.innerHeight * 100
        channel.send(JSON.stringify({type: 'mouse-click', x: tempX, y: tempY}))
    }
})
*/


/* Gamepad mechanism */
window.addEventListener("gamepadconnected", function(event) {
    console.log("Gamepad connected:", event.gamepad);
    console.log("Gamepad index:", event.gamepad.index);
    gamepadIndex = event.gamepad.index
});
  
window.addEventListener("gamepaddisconnected", function(event) {
    console.log("Gamepad disconnected:", event.gamepad);
    console.log("Gamepad disconnected:", event.gamepad.index);
    gamepadIndex = null
});
  
function pollGamepad() {
    const gamepads = navigator.getGamepads();
  
    // If there is a gamepad connected (e.g., first gamepad)
    if (gamepads[0]) {
        const gamepad = gamepads[gamepadIndex];
  
        // Log the ID of the gamepad
        //console.log("Gamepad ID: ", gamepad.id);
  
        // Log button presses
        gamepad.buttons.forEach((button, index) => {
            if (button.pressed) {
              if(buttonsOfXbox[index] == 'START'){
                goForOnline = true
                console.log(buttonsOfXbox[index],' is pressed');
                //socket.emit('gamepad-button', JSON.stringify({btn: buttonsOfXbox[index]}))
                channel.send(JSON.stringify({btn: buttonsOfXbox[index]}))
              }
              else if(goForOnline){
                console.log(buttonsOfXbox[index],' is pressed');
                //socket.emit('gamepad-button', JSON.stringify({btn: buttonsOfXbox[index]}))
                channel.send(JSON.stringify({btn: buttonsOfXbox[index]}))
              }
              else{
                console.log('Please press start button to activate controller');
              }
            }
        });
  
        // Log joystick axes values
        if (gamepad && goForOnline) {
          if(!registeredAxis[0]){
            registeredAxis[0] = gamepad.axes[0]
          }
          else if(!registeredAxis[1]){
            registeredAxis[1] = gamepad.axes[1]
          }
          else if(!registeredAxis[2]){
            registeredAxis[2] = gamepad.axes[2]
          }
          else if(!registeredAxis[3]){
            registeredAxis[3] = gamepad.axes[3]
          }
          else{
            gamepad.axes.forEach((axis, index) => {
              if(registeredAxis[index] != axis){
                // Only left axis
                if(axisOfXbox[index] == axisOfXbox[0] || axisOfXbox[index] == axisOfXbox[1]){
                  console.log(`Left Stick X: ${gamepad.axes[0]}, Left Stick Y: ${gamepad.axes[1]}`);
                  //socket.emit('left-axis', JSON.stringify({axis: 'LEFT_AXIS', x : gamepad.axes[0], y: gamepad.axes[1]}))
                  channel.send(JSON.stringify({axis: 'LEFT_AXIS', x : gamepad.axes[0], y: gamepad.axes[1]}))
                }
                // Only right axis
                else if(axisOfXbox[index] == axisOfXbox[2] || axisOfXbox[index] == axisOfXbox[3]){
                  console.log('Right Stick X:', gamepad.axes[2], 'Right Stick Y:', gamepad.axes[3]);
                  //socket.emit('right-axis', JSON.stringify({axis: 'RIGHT_AXIS', x: gamepad.axes[2], y: gamepad.axes[3]}))
                  channel.send(JSON.stringify({axis: 'RIGHT_AXIS', x: gamepad.axes[2], y: gamepad.axes[3]}))
                }
              }
            })
          }
    }
}
    requestAnimationFrame(pollGamepad);
}
  
pollGamepad();