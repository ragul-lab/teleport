import pyautogui

screenWidth, screenHeight = pyautogui.size()

def move(x, y):
    X = int(x) / 100 * screenWidth
    Y = int(y) / 100 * screenHeight
    pyautogui.moveTo(round(X), round(Y))

def click(x, y):
    X = int(x) / 100 * screenWidth
    Y = int(y) / 100 * screenHeight
    pyautogui.click(round(X), round(Y))