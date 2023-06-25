const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    nodeIntegration: true,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// File Operations
const loadContent = async (filename) => {
  return fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';
}

const saveContent = async (filename, content) => {
  fs.writeFileSync("c:\\Users\\Manu\\Desktop\\" + filename, content, 'utf8');
  return dialog.showSaveDialog(
    {
      title: 'Save Chat Logs',
      defaultPath: filename,
      filters: [
        { name: 'CSV', extensions: ['csv'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }
  ).then((result) => {
    // Here you can handle the file save logic
    console.log("filePath:", result.filePath);
    if (result.filePath) {
      return result.filePath;
      // Generate and save the chat logs
      // fs.writeFileSync(result.filePath, content, 'utf8');
    }
  });
}

// IPC
ipcMain.on("saveContent", (e, filename, content) => {
  saveContent(filename, content);
});