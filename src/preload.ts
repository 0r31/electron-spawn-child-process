// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  sendWifiConnect: () => ipcRenderer.send('wifi-connect'),
  handleStdout: (func: (event: any, arg: any) => void) => ipcRenderer.on('stdout', func),
  handleStderr: (func: (event: any, arg: any) => void) => ipcRenderer.on('stderr', func),
  handleExit: (func: (event: any, arg: any) => void) => ipcRenderer.on('exit', func),
})
