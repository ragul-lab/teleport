import vgamepad as vg
import time

gamepad = vg.VX360Gamepad()

'''
['A', 'B', 'X', 'Y', 'LEFT_SHOULDER', 'RIGHT_SHOULDER', 'LEFT_TRIGGER', 'RIGHT_TRIGGER', 'BACK', 
'START', 'LEFT_THUMB', 'RIGHT_THUMB', 'DPAD_UP', 'DPAD_DOWN', 'DPAD_LEFT', 'DPAD_RIGHT', 'GUIDE']
'''

def BUTTON_A():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_A)
    gamepad.update()

def BUTTON_B():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_B)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_B)
    gamepad.update()

def BUTTON_X():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_X)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_X)
    gamepad.update()

def BUTTON_Y():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_Y)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_Y)
    gamepad.update()

def BUTTON_LEFT_SHOULDER():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_SHOULDER)
    gamepad.update()

def BUTTON_RIGHT_SHOULDER():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_SHOULDER)
    gamepad.update()
    
def BUTTON_LEFT_TRIGGER():
    gamepad.left_trigger(value=255)
    #time.sleep(0.1)
    #gamepad.left_trigger(value=0)
    gamepad.update()

def BUTTON_RIGHT_TRIGGER():
    gamepad.right_trigger(value=255)
    #time.sleep(0.1)
    #gamepad.right_trigger(value=0)
    gamepad.update()

def BUTTON_BACK():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_BACK)
    gamepad.update()

def BUTTON_START():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_START)
    gamepad.update()

def BUTTON_LEFT_THUMB():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_LEFT_THUMB)
    gamepad.update()

def BUTTON_RIGHT_THUMB():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_RIGHT_THUMB)
    gamepad.update()

def BUTTON_DPAD_UP():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_UP)
    gamepad.update()

def BUTTON_DPAD_DOWN():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_DOWN)
    gamepad.update()

def BUTTON_DPAD_LEFT():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_LEFT)
    gamepad.update()

def BUTTON_DPAD_RIGHT():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_RIGHT)
    gamepad.update()

def BUTTON_GUIDE():
    gamepad.press_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_GUIDE)
    gamepad.update()
    time.sleep(0.1)
    gamepad.release_button(button=vg.XUSB_BUTTON.XUSB_GAMEPAD_DPAD_GUIDE)
    gamepad.update()

def LEFT_STICK(x, y):
    gamepad.left_joystick_float(x_value_float=x, y_value_float=y)
    gamepad.update()
    time.sleep(0.1)
    gamepad.left_joystick_float(x_value_float=-0.0, y_value_float=0.0)
    gamepad.update()

def RIGHT_STICK(x, y):
    gamepad.right_joystick_float(x_value_float=x, y_value_float=y)
    gamepad.update()
    time.sleep(0.1)
    gamepad.right_joystick_float(x_value_float=-0.0, y_value_float=0.0)
    gamepad.update()