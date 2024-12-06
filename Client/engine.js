let remote = document.getElementById('remote')
let play = document.getElementById('play')

const socket = io("http://192.168.31.202:3000");
let peer = new RTCPeerConnection()
let channel
let protect = false
let connected = false

socket.emit('offer', 'Requesting for offer')

socket.on('offer', (offer) => {
    if(protect == false){
        createAnswer(offer)
        protect = true
    }
})

let createAnswer = (offer) => {

    peer.ondatachannel = (e) => {
        channel = e.channel

        channel.onopen = (e) => {
            connected = true
            console.log('Connection Opened');
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

play.addEventListener('click', (e) => {
    remote.play()
    play.remove()

    remote.style.width = window.innerWidth+'px'
    remote.style.height = window.innerHeight+'px'
})

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
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if(e.ctrlKey || e.altKey || e.shiftKey){
        // Shortcut keys
        if (e.ctrlKey && e.key === 'c' || e.ctrlKey && e.key === 'C') {
            channel.send(JSON.stringify({type: 'short-key', key: 'copy'}))
            console.log(JSON.stringify({type: 'short-key', key: 'copy'}))
        } else if (e.ctrlKey && e.key === 'x' || e.ctrlKey && e.key === 'X') {
            channel.send(JSON.stringify({type: 'short-key', key: 'cut'}))
            console.log(JSON.stringify({type: 'short-key', key: 'cut'}))
        } else if (e.ctrlKey && e.key === 'v' || e.ctrlKey && e.key === 'V') {
            channel.send(JSON.stringify({type: 'short-key', key: 'paste'}))
            console.log(JSON.stringify({type: 'short-key', key: 'paste'}))
        }
        else if (e.ctrlKey && e.key === 'z' || e.ctrlKey && e.key === 'Z') {
            channel.send(JSON.stringify({type: 'short-key', key: 'undo'}))
            console.log(JSON.stringify({type: 'short-key', key: 'undo'}))
        }
        else if (e.ctrlKey && e.key === 's' || e.ctrlKey && e.key === 'S') {
            channel.send(JSON.stringify({type: 'short-key', key: 'save'}))
            console.log(JSON.stringify({type: 'short-key', key: 'save'}))
        }
        else if (e.ctrlKey && e.key === 'a' || e.ctrlKey && e.key === 'A') {
            channel.send(JSON.stringify({type: 'short-key', key: 'all'}))
            console.log(JSON.stringify({type: 'short-key', key: 'all'}))
        }
        else if (e.ctrlKey && e.key === 'y' || e.ctrlKey && e.key === 'Y') {
            channel.send(JSON.stringify({type: 'short-key', key: 'redo'}))
            console.log(JSON.stringify({type: 'short-key', key: 'redo'}))
        }
        else if (e.ctrlKey && e.key === 'd' || e.ctrlKey && e.key === 'D') {
            channel.send(JSON.stringify({type: 'short-key', key: 'delete'}))
            console.log(JSON.stringify({type: 'short-key', key: 'delete'}))
        }
        // Captial keys (shfit + key)
        else if (e.shiftKey && e.key.length == 1){
            channel.send(JSON.stringify({type: 'key-stroke', key: e.key}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
        // Arrow keys
        else if (e.key.toLowerCase() == 'arrowup'){
            channel.send(JSON.stringify({type: 'key-stroke', key: 'up'}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
        else if (e.key.toLowerCase() == 'arrowdown'){
            channel.send(JSON.stringify({type: 'key-stroke', key: 'down'}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
        else if (e.key.toLowerCase() == 'arrowleft'){
            channel.send(JSON.stringify({type: 'key-stroke', key: 'left'}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
        else if (e.key.toLowerCase() == 'arrowright'){
            channel.send(JSON.stringify({type: 'key-stroke', key: 'right'}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
    }
    else{
        channel.send(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
        console.log(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
    }
})

// Control + function keys
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

/*
Ctrl + Shift + Esc: Open Task Manager directly.
Ctrl + Alt + Del: Open the Security options screen (Task Manager, Lock, Log Off, etc.).
Alt + Tab: Switch between open applications.
Alt + F4: Close the currently focused window or application.
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