from mouse import *
from keyboard import *
import socketio
import json

# Create a Socket.io client instance
sio = socketio.Client()

# Event handler for when connected to the server
@sio.event
def connect():
    print('Connected to the server')
    sio.emit('driver-online', {'status': 'online'})

# Event handler for receiving messages from the server
@sio.event
def message(data):
    data = json.loads(data)

    # Mouse move
    if data.get('type') == "mouse-move":
        move(data.get('x'), data.get('y'))

    # Mouse click
    if data.get('type') == "mouse-click":
        click(data.get('x'), data.get('y'))

    # Mouse drag (lock) | simulate left click
    if data.get('type') == "mouse-down":
        lock(data.get('x'), data.get('y'))

    # Mouse drag (unlock) | simulate left click
    if data.get('type') == "mouse-up":
        unlock(data.get('x'), data.get('y'))

    # Mouse right click
    if data.get('type') == "mouse-right":
        right(data.get('x'), data.get('y'))

    # Mouse wheel scroll (up)
    if data.get('type') == "wheel-up":
        wheel_up()

    # Mouse wheel scroll (up)
    if data.get('type') == "wheel-down":
        wheel_down()

    # Keyboard keys
    if data.get('type') == "key-stroke":
        keystroke(data.get('key'))

    # keyboard shortcuts
    if data.get('type') == "short-key":
        shortcut(data.get('hold'), data.get('key'))
    '''
    if data.get('type') == "short-key":
        shortcut(data.get('key'))
    '''

# Event handler for disconnection
@sio.event
def disconnect():
    print('Disconnected from the server')

# Connect to the Node.js server
sio.connect('http://127.0.0.1:3000')

# Keep the program running to listen for events
sio.wait()


'''
from bottle import route, run

@route('/')
def hello():
    return "Keyboard, Mouse & Gamepad Controller\nStatus: Running/Online"

if __name__ == '__main__':
    run(host='0.0.0.0', port=8080, debug=True)
'''