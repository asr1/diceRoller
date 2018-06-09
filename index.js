const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let rollWindow;

// Listen for app to be ready
app.on('ready', () => {
    // Create new window
    mainWindow = new BrowserWindow({});

    //Load HTML into window
    mainWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, 'mainWindow.html')
    }));
    //QUit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    })


    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu
    Menu.setApplicationMenu(mainMenu);
})

//Handle create roll window
function createRollWindow()
{
   rollWindow = new BrowserWindow({
       width: 600,
       height: 600,
       title: "Add new roll"
   });

    //Load HTML into window
    rollWindow.loadURL(url.format({
        protocol: 'file:',
        slashes: true,
        pathname: path.join(__dirname, 'rollWindow.html')
    }));
    //Handle garbage collection
    rollWindow.on('closed', ()=>
    {
        rollWindow = null;
    }
    )}

//Catch roll items
ipcMain.on('roll', (e, param) => {
    mainWindow.webContents.send('roll', param);
    rollWindow.close();
    console.log(param)
})

//catch clear
ipcMain.on('clear', () => {
    mainWindow.webContents.send('clearHistory');
})

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Roll',
                accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                click(){
                    createRollWindow();
                }
            },
            {
                label: 'Clear History',
                click(){
                    mainWindow.webContents.send('clearHistory');
                },
                accelerator: process.platform == 'darwin' ? 'Command+C' : 'Ctrl+C'
            },
            {
                label: 'Quit',
                click(){
                    app.quit();
                },
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q'
            }
        ]
    }
];

//If mac, add empty object to menu
if(process.platform == 'darwin')
{
    mainMenuTemplate.unshift({});
}

//Add developer tools item if not in production
if(process.env.NODE_ENV !== 'production')
{
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                },
                accelerator: process.platform == 'darwin' ? 'Command+Shift+J' : 'Ctrl+Shift+J'
            },
            {
                role: 'reload'
            }
        ]
    })
}