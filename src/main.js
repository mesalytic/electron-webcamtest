const { app, BrowserWindow } = require('electron');
const path = require('path');

if (require('electron-squirrel-startup')) return app.quit();

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 370,
        height: 370,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== "darwin") app.quit();
})