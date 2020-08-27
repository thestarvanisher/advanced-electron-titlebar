# Custom Electron titlebar
A custom Electron titlebar with high customizability.
Current features:  
- Create menus and submenus with ease just from an Object
- Connect a method to the click of a submenu button
- Custom titlebar background color, title label color, buttons hover color
- Automatic shrink - if the window is too narrow to display the whole menu bar, then it is shrunk and the hidden ones are put in a submenu of a button with dots (Similar to VS Code)
- Currently Fontawesome is used for icons on the titlebar so it will look the same on all platforms


## How to install
To install run the following command in the terminal in the project folder:
```npm install --save advanced-electron-titlebar```

## How to use
First create the BrowserWindow in Electron and remove its frame as follows:
```javascript
const win = new BrowserWindow({
    // Other properties

    //Remove the frame
    frame: false
  })
```
To use the titlebar, first require the module in a JavaScript file (for example in `render.js`): 
```javascript
const titlebar = require("advanced-electron-titlebar")
```
And then create the titlebar:
```javascript
titlebar.create(settings, menu, current_window)
```
The arguments for this function are as follows:
### `settings` argument



