import pyautogui

pyautogui.FAILSAFE = False
screenWidth, screenHeight = pyautogui.size()

def keystroke(key):
    try:
        pyautogui.press(key)
    except:
        pass

def shortcut(cmd):
    if cmd == 'copy':
        pyautogui.hotkey('ctrl', 'c')
    elif cmd == 'cut':
        pyautogui.hotkey('ctrl', 'x')
    elif cmd == 'paste':
        pyautogui.hotkey('ctrl', 'v')
    elif cmd == 'undo':
        pyautogui.hotkey('ctrl', 'z')
    elif cmd == 'save':
        pyautogui.hotkey('ctrl', 's')