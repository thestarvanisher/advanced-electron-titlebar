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
```
npm install --save advanced-electron-titlebar
```

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
### The `settings` argument
You can change different properties of the titlebar using the settings argument.

| Parameter | Type | Default value | Description |
|-----------|------|---------------|-------------|
| `backgroundColor` | String | `#484848` | The color of the titlebar |
| `fontColor` | String | `#D3D3D3` | The font color of the menu/submenu |
| `buttonsFont` | String | `Arial` | The font of the menu/submenu buttons |
| `menuButtonsColor` | String | `#484848` | The color of the buttons on the titlebar |
| `buttonHoverColor` | String | `#686868` | The color of the button when hover |
| `submenuColor` | String | `#686868` | The color of the submenu |
| `submenuButtonColor` | String | `#686868` | The color of the buttons on the submenu |
| `submenuButtonHoverColor` | String | `#484848` | The color of the submenu button when hover |
| `windowButtonColor` | String | `#484848` | The color of the window buttons |
| `windowButtonHoverColor` | String | `#686868` | The color of the window buttons when hover |
| `closeButtonHoverColor` | String | `firebrick` | The color of the close button when hover |
| `titlebarLabelFont` | String | `Impact` | The font of the label on the titlebar |
| `titlebarLabelColor` | String | `#D3D3D3` | The color of the label on the tilebar |
| `titlebarLabelSize` | Number | 16 | The font size of the label on the titlebar |

### The `menu` argument


