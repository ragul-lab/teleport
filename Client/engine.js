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
    remote.style.display = 'block'
    remote.play()
    play.remove()

    remote.style.width = window.innerWidth+'px'
    remote.style.height = window.innerHeight+'px'
    document.body.style.cursor = 'none'
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
let ctrl = false, alt = false, shift = false
window.addEventListener('keydown', (e) => {
    e.preventDefault()
    if(e.ctrlKey){
        ctrl = true
    }
    else if(e.altKey){
        alt = true
    }
    else if(e.shiftKey){
        shift = true
    }
    else{
        // Arrow keys
        if (e.key.toLowerCase() == 'arrowup'){
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
        // alphabets
        else{
            channel.send(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
        }
    }
})

window.addEventListener('keyup', (e) => {
    let timer = setTimeout(() => {
        ctrl = false
        alt = false
        shift = false
        clearTimeout(timer)
    },500)
    
    if(ctrl && e.key.toLowerCase() != 'control'){
        channel.send(JSON.stringify({type: 'short-key', hold: 'ctrl', key: e.key}))
        console.log(JSON.stringify({type: 'short-key', hold: 'ctrl', key: e.key}))
        ctrl = false
    }
    else if(alt && e.key.toLowerCase() != 'alt'){
        channel.send(JSON.stringify({type: 'short-key', hold: 'alt', key: e.key}))
        console.log(JSON.stringify({type: 'short-key', hold: 'alt', key: e.key}))
        alt = false
    }
    else if(shift && e.key.toLowerCase() != 'shift'){
        channel.send(JSON.stringify({type: 'short-key', hold: 'shift', key: e.key}))
        console.log(JSON.stringify({type: 'short-key', hold: 'shift', key: e.key}))
        shift = false
    }
})








/*
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if(e.ctrlKey || e.altKey || e.shiftKey){
        // Ctrl Shortcut keys
        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            channel.send(JSON.stringify({type: 'short-key', key: 'copy'}))
            console.log(JSON.stringify({type: 'short-key', key: 'copy'}))
        } 
        else if (e.ctrlKey && e.key.toLowerCase() === 'x') {
            channel.send(JSON.stringify({type: 'short-key', key: 'cut'}))
            console.log(JSON.stringify({type: 'short-key', key: 'cut'}))
        } 
        else if (e.ctrlKey && e.key.toLowerCase() === 'v') {
            channel.send(JSON.stringify({type: 'short-key', key: 'paste'}))
            console.log(JSON.stringify({type: 'short-key', key: 'paste'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'z') {
            channel.send(JSON.stringify({type: 'short-key', key: 'undo'}))
            console.log(JSON.stringify({type: 'short-key', key: 'undo'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 's') {
            channel.send(JSON.stringify({type: 'short-key', key: 'save'}))
            console.log(JSON.stringify({type: 'short-key', key: 'save'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'a') {
            channel.send(JSON.stringify({type: 'short-key', key: 'all'}))
            console.log(JSON.stringify({type: 'short-key', key: 'all'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'y') {
            channel.send(JSON.stringify({type: 'short-key', key: 'redo'}))
            console.log(JSON.stringify({type: 'short-key', key: 'redo'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'd') {
            channel.send(JSON.stringify({type: 'short-key', key: 'delete'}))
            console.log(JSON.stringify({type: 'short-key', key: 'delete'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'p') {
            channel.send(JSON.stringify({type: 'short-key', key: 'print'}))
            console.log(JSON.stringify({type: 'short-key', key: 'print'}))
        }
        else if (e.ctrlKey && e.key.toLowerCase() === 'r') {
            channel.send(JSON.stringify({type: 'short-key', key: 'reload'}))
            console.log(JSON.stringify({type: 'short-key', key: 'reload'}))
        }
        // Captial keys (shfit + key)
        else if (e.shiftKey && e.key.length == 1){
            channel.send(JSON.stringify({type: 'key-stroke', key: e.key}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key}))
        }
        // Alt Shortcut keys
        else if (e.altKey && e.key.toLowerCase() === 'tab'){
            channel.send(JSON.stringify({type: 'short-key', key: 'switch'}))
            console.log(JSON.stringify({type: 'short-key', key: 'switch'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'escape'){
            channel.send(JSON.stringify({type: 'short-key', key: 'cycle'}))
            console.log(JSON.stringify({type: 'short-key', key: 'cycle'}))
        }
        else if (e.altKey && e.key.toLowerCase() === " "){
            channel.send(JSON.stringify({type: 'short-key', key: 'space'}))
            console.log(JSON.stringify({type: 'short-key', key: 'space'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'enter'){
            channel.send(JSON.stringify({type: 'short-key', key: 'props'}))
            console.log(JSON.stringify({type: 'short-key', key: 'props'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'arrowleft'){
            channel.send(JSON.stringify({type: 'short-key', key: 'prev'}))
            console.log(JSON.stringify({type: 'short-key', key: 'prev'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'arrowright'){
            channel.send(JSON.stringify({type: 'short-key', key: 'forw'}))
            console.log(JSON.stringify({type: 'short-key', key: 'forw'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'd'){
            channel.send(JSON.stringify({type: 'short-key', key: 'focus'}))
            console.log(JSON.stringify({type: 'short-key', key: 'focus'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'e'){
            channel.send(JSON.stringify({type: 'short-key', key: 'edit'}))
            console.log(JSON.stringify({type: 'short-key', key: 'edit'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'f'){
            channel.send(JSON.stringify({type: 'short-key', key: 'file'}))
            console.log(JSON.stringify({type: 'short-key', key: 'file'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'h'){
            channel.send(JSON.stringify({type: 'short-key', key: 'help'}))
            console.log(JSON.stringify({type: 'short-key', key: 'help'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'i'){
            channel.send(JSON.stringify({type: 'short-key', key: 'insert'}))
            console.log(JSON.stringify({type: 'short-key', key: 'insert'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'j'){
            channel.send(JSON.stringify({type: 'short-key', key: 'ribbon'}))
            console.log(JSON.stringify({type: 'short-key', key: 'ribbon'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'm'){
            channel.send(JSON.stringify({type: 'short-key', key: 'mail'}))
            console.log(JSON.stringify({type: 'short-key', key: 'mail'}))
        }
        else if (e.altKey && e.key.toLowerCase() === 'n'){
            channel.send(JSON.stringify({type: 'short-key', key: 'new'}))
            console.log(JSON.stringify({type: 'short-key', key: 'new'}))
        }
    }
    else{
        // Arrow keys
        if (e.key.toLowerCase() == 'arrowup'){
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
        // alphabets
        else{
            channel.send(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
            console.log(JSON.stringify({type: 'key-stroke', key: e.key.toLowerCase()}))
        }
    }
})
*/

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