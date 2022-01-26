const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const development = require('electron-is-dev')

async function initializeFrontendBuildProcess() {
  if (development) {
    const { createServer } = require('vite')
    const server = await createServer({})
    await server.listen()
  }
}

async function initializeMainWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), './', 'preload.js'),
    },
  })

  if (development) {
    window.webContents.openDevTools()
    window.loadURL('http://localhost:8080')
  } else {
    window.loadFile('./index.html')
  }
}

async function initializeSystemRequests() {
  ipcMain.on('system.properties', event => {
    event.sender.send('system.properties', {
      os: {
        type: require('os').type(),
        version: process.getSystemVersion()
      },
      versions: process.versions
    })
  })
}

async function main() {
  await app.whenReady()
  await initializeFrontendBuildProcess()
  await initializeMainWindow()
  await initializeSystemRequests()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })
}

main()
