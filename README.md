# Custom Electron titlebar
A custom Electron titlebar with high customizability.
Current features:  
- Create menus and submenus with ease just from an Object
- Connect a method to the click of a submenu button
- Custom titlebar background color, title label color, buttons hover color
- Automatic shrink - if the window is too narrow to display the whole menu bar, then it is shrunk and the hidden ones are put in a submenu of a button with dots (Similar to VS Code)
- Currently Fontawesome is used for icons on the titlebar so it will look the same on all platforms

## Dependencies
- jQuery `^3.5.1`

## Prerequisites
The module doesn't depend on Fontawesome but it uses its icons for the window buttons and the right chevron for the submenu buttons.
To install and setup Fontawesome, please follow [these](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers) instructions.

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
Make sure that the script is included in the `index.html` file with the **`defer`** tag as follows:
```html
<script defer src="render.js"></script>
```
Then in the file where you have required the module, create the titlebar by using the **`.create()`** function:
```javascript
titlebar.create(settings, menu, current_window)
```

The arguments for this function are as follows:
### The **`settings`** argument
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

### The **`menu`** argument
You can use this to set a menu for the titlebar.

The following format is used:
```javascript
let menu = {
    "Button/subbutton label": {
        // Arguments
    }
}
```
There are currently 2 types of buttons:
- The "standard" which is used to do some action
- The "submenu" which is used to open a submenu on hover

These are the current available arguments:
| Argument | Type | Values | Required for | Description |
|----------|------|--------|--------------|-------------|
| `type` | String |standard, submenu | All buttons | The type of the button - "standard" for a standard button, "submenu" for a submenu button |
| `command` | String | any | Standard buttons | This is displayed on the right side of a submenu button. Could be used to show what keyboard combination could be used instead of clicking on the button |
| `method` | One line function that calls another function | null or a function name | Standard button | Used to call a function when a standard button is clicked |
| `submenu` | Object | - | Submenu button | The submenu which is opened when hover over the button |

#### The "standard" button
The format for the "standard" button is the following:
```javascript
"Button label": {
    type: "standard",
    command: "any",
    method: () => functionName(),
}
```
If you do not want the button to call a function (for example you don't have the function yet), then you can use:
```javascript
"Button label": {
    type: "standard",
    command: "any",
    method: () => null,
}
```
#### The "submenu" button
The format for the "standard" button is the following:
```javascript
"Button label": {
    type: "submenu",
    submenu: {
        //Another Object which is the submenu
    }
}
```
### The **`current_window`** argument
You have to pass the current Electron window to the function.
For example you can use this to pass the current window:
```javascript
const remote = require("electron").remote
titlebar.create(settings, menu, remote.getCurrentWindow())
```
**Note:** If you use this method to pass the current window in Electron 10, then the **`enableRemoteModule`** is **`false`** by default and the titlebar won't be displayed. To enable it, set **`enableRemoteModule`** to **`true`** in the **`webPreferences`** for the **`BrowserWindow`** like so:
```javascript
const win = new BrowserWindow({
    // Other properties

    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },

    //Remove the frame
    frame: false
  })
```
### Functions
You can call a function as follows:
```javascript
titlebar.functionName(*args)
```
List of the available functions:
| Function | Arguments | Description |
|----------|-----------|-------------|
| `.create()` | `settings` - the settings for the titlebar,<br> `menu` - the object that holds the menu structure,<br> `current_window` - the current Electron window | Creates and adds the titlebar to the current window |

## Contributions
Currently this is in early development. You are more than welcome to contribute if you want! I am open to ideas and suggestion how to improve and expand the module.

## License
This module is licensed under [MIT](https://github.com/thestarvanisher/advanced-electron-titlebar/blob/master/LICENSE).




