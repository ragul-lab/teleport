import pyautogui

pyautogui.FAILSAFE = False
screenWidth, screenHeight = pyautogui.size()

def move(x, y):
    X = float(x) / 100 * screenWidth
    Y = float(y) / 100 * screenHeight
    pyautogui.moveTo(X, Y)

def click(x, y):
    X = float(x) / 100 * screenWidth
    Y = float(y) / 100 * screenHeight
    pyautogui.click(X, Y)