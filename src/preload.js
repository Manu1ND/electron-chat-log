// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld('electron', {
  getBots: (callback) => ipcRenderer.invoke('getBots').then((result) => callback(result)),
  generateLogs: (botName, fromDate, toDate) => ipcRenderer.send('generateLogs', botName, fromDate, toDate),
  onUpdateLog: (callback) => ipcRenderer.on('sendProgress', callback)
});