const { app, BrowserWindow, desktopCapturer, ipcMain } = require('electron')

let win

const createWindow = () => {
    win = new BrowserWindow({
      width: 800,
      height: 600,

      webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        contextIsolation: false
      }
    })

    desktopCapturer.getSources({ types: ['window', 'screen'] })
    .then(sources => {
        console.log(sources);
    })
    .catch(e => console.log(e))
  
    win.loadFile('index.html')
}

ipcMain.on('reload-window', (event) => {
  if (win) {
      win.reload();
  }
});

app.whenReady().then(() => {
    createWindow()
})