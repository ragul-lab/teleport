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