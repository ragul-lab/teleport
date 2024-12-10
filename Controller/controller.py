from mouse import *
from keyboard import *
from gamepad import *
import socketio
import json
import sys

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

    ## Control System for Mouse ##
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

    ## Control System for Keyboard ##
    # Keyboard keys
    if data.get('type') == "key-stroke":
        keystroke(data.get('key'))

    # keyboard shortcuts (2 keys)
    if data.get('type') == "short-2-key":
        short2cut(data.get('hold'), data.get('key'))

    # keyboard shortcuts (3 keys)
    if data.get('type') == "short-3-key":
        short3cut(data.get('key_1'), data.get('key_2'), data.get('key_3'))

    ## Control System for Gamepad ##
    '''
    ['A', 'B', 'X', 'Y', 'LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_TRIGGER', 'RIGHT_TRIGGER', 'BACK', 
    'START', 'LEFT_THUMB', 'RIGHT_THUMB', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'GUIDE']
    '''
    if data.get('btn') == "A":
        print('A Pressed')
        BUTTON_A()

    if data.get('btn') == "B":
        BUTTON_B()

    if data.get('btn') == "X":
        BUTTON_X()

    if data.get('btn') == "Y":
        BUTTON_Y()

    if data.get('btn') == "LEFT_SHOULDER":
        BUTTON_LEFT_SHOULDER()

    if data.get('btn') == "RIGHT_SHOULDER":
        BUTTON_RIGHT_SHOULDER()

    if data.get('btn') == "LEFT_TRIGGER":
        BUTTON_LEFT_TRIGGER()

    if data.get('btn') == "RIGHT_TRIGGER":
        BUTTON_RIGHT_TRIGGER()

    if data.get('btn') == "BACK":
        BUTTON_BACK()

    if data.get('btn') == "START":
        BUTTON_START()

    if data.get('btn') == "LEFT_THUMB":
        BUTTON_LEFT_THUMB()

    if data.get('btn') == "RIGHT_THUMB":
        BUTTON_RIGHT_THUMB()

    if data.get('btn') == "DPAD_UP":
        BUTTON_DPAD_UP()

    if data.get('btn') == "DPAD_DOWN":
        BUTTON_DPAD_DOWN()

    if data.get('btn') == "DPAD_LEFT":
        BUTTON_DPAD_LEFT()

    if data.get('btn') == "DPAD_RIGHT":
        BUTTON_DPAD_RIGHT()

    if data.get('btn') == "GUIDE":
        BUTTON_GUIDE()
    
    if data.get('axis') == "LEFT_AXIS":
        LEFT_STICK(data.get('x'), data.get('y'))

    if data.get('axis') == "RIGHT_AXIS":
        RIGHT_STICK(data.get('x'), data.get('y'))


# Event handler for disconnection
@sio.event
def disconnect():
    print('Disconnected from the server')
    sys.exit()

# Connect to the Node.js server
sio.connect('http://127.0.0.1:3000')

# Keep the program running to listen for events
sio.wait()