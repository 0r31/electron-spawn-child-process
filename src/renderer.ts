/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

export interface IMyAPI {
  sendPing: () => void,
  handlePong: (func: (event: any, arg: any) => void) => void,
  sendCommand: () => void,
  handleStdout: (func: (event: any, arg: any) => void) => void,
  handleStderr: (func: (event: any, arg: any) => void) => void,
  handleExit: (func: (event: any, arg: any) => void) => void,
}

declare global {
  interface Window {
    myAPI: IMyAPI
  }
}

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

function sendPing() {
  window.myAPI.sendPing()
}

window.myAPI.handlePong((event, value) => {
  console.log('Renderer process received pong')
  //event.sender.send('pong', 'pong')
})

async function sendCommand() {
  window.myAPI.sendCommand()
}

window.myAPI.handleStdout((event, value) => {
  console.log('********* Begin *********')
  console.log(value)
  console.log('********* End *********')
})

window.myAPI.handleStderr((event, value) => {
  console.log(value)
})

window.myAPI.handleExit((event, value) => {
  console.log(value)
})

const pingpong = document.getElementById('pingpong')
const execcommand = document.getElementById('execcommand')

pingpong.addEventListener('click', sendPing)
execcommand.addEventListener('click', sendCommand)
