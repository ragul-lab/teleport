import vgamepad as vg
import json
import time

gamepad = vg.VX360Gamepad()

'''
['A', 'B', 'X', 'Y', 'LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_TRIGGER', 'RIGHT_TRIGGER', 'BACK', 
'START', 'LEFT_THUMB', 'RIGHT_THUMB', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'GUIDE']
'''
pressure = 0
sense = 0

def GAMEPAD(btn):
    global pressure, sense
    
    if btn.get('A') == 1:
        print('a')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
        gamepad.update()

    if btn.get('B') == 1:
        print('b')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_B)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_B)
        gamepad.update()

    if btn.get('X') == 1:
        print('x')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_X)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_X)
        gamepad.update()

    if btn.get('Y') == 1:
        print('y')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_Y)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_Y)
        gamepad.update()

    if btn.get('LEFT_SHOULDER') == 1:
        print('ls')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER)
        gamepad.update()

    if btn.get('RIGHT_SHOULDER') == 1:
        print('rs')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER)
        gamepad.update()

    if btn.get('LEFT_TRIGGER') == 1:
        if pressure < 255:
            print(pressure, 'lt')
            pressure = pressure + 1
            sense = time.time()
            
            if pressure <= 255:
                gamepad.left_trigger(value=pressure)
                gamepad.update()
            elif pressure >= 255:
                gamepad.left_trigger(value=255)
                gamepad.update()
            SENSE()

    if btn.get('RIGHT_TRIGGER') == 1:
        if pressure < 255:
            print(pressure, 'rt')
            pressure = pressure + 1
            sense = time.time()

            if pressure <= 255:
                gamepad.right_trigger(value=pressure)
                gamepad.update()
            elif pressure >= 255:
                gamepad.right_trigger(value=255)
                gamepad.update()
            SENSE()

    if btn.get('BACK') == 1:
        print('back')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
        gamepad.update()

    if btn.get('START') == 1:
        print('start')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
        gamepad.update()

    if btn.get('LEFT_THUMB') == 1:
        print('lthumb')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB)
        gamepad.update()

    if btn.get('RIGHT_THUMB') == 1:
        print('rthumb')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB)
        gamepad.update()

    if btn.get('DPAD_UP') == 1:
        print('up')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP)
        gamepad.update()

    if btn.get('DPAD_DOWN') == 1:
        print('down')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN)
        gamepad.update()

    if btn.get('DPAD_LEFT') == 1:
        print('left')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT)
        gamepad.update()

    if btn.get('DPAD_RIGHT') == 1:
        print('right')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT)
        gamepad.update()

    if btn.get('GUIDE') == 1:
        print('guide')
        gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_GUIDE)
        gamepad.update()
        time.sleep(0.1)
        gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_GUIDE)
        gamepad.update()

    if btn.get('LEFT_X_AXIS') > 0 or btn.get('LEFT_Y_AXIS') < 0:
        x = btn.get('LEFT_X_AXIS')
        y = btn.get('LEFT_Y_AXIS')
        print('left', x, y)
        gamepad.left_joystick_float(x_value_float=x, y_value_float=y)
        gamepad.update()
        time.sleep(0.1)
        gamepad.left_joystick_float(x_value_float=-0.0, y_value_float=0.0)
        gamepad.update()

    if btn.get('RIGHT_X_AXIS') > 0 or btn.get('RIGHT_Y_AXIS') < 0:
        x = btn.get('RIGHT_X_AXIS')
        y = btn.get('RIGHT_Y_AXIS')
        print('right', x, y)
        gamepad.right_joystick_float(x_value_float=x, y_value_float=y)
        gamepad.update()
        time.sleep(0.1)
        gamepad.right_joystick_float(x_value_float=-0.0, y_value_float=0.0)
        gamepad.update()


def SENSE():
    global pressure, sense
    while True:
        time.sleep(1)  # Check every second
        if (time.time() - sense) > 10:
            pressure = 0
            gamepad.left_trigger(value=0)
            gamepad.right_trigger(value=0)
            gamepad.update()