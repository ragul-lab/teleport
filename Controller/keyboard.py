import pyautogui

pyautogui.FAILSAFE = False
screenWidth, screenHeight = pyautogui.size()

def keystroke(key):
    pyautogui.write(key)

def shortcut(cmd):
    if cmd == 'copy':
        pyautogui.hotkey('ctrl', 'c')
    elif cmd == 'cut':
        pyautogui.hotkey('ctrl', 'x')
    elif cmd == 'paste':
        pyautogui.hotkey('ctrl', 'v')
    elif cmd == 'undo':
        pyautogui.hotkey('ctrl', 'z')