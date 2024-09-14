# BigLeaf Documentation

## Get started

At first download or clone the bigleaf folder to your project.Then import **"BigLeafCanvas"** from the index.js file. After that initiate the canvas by providing the ID of the div element which you wanted to use for the canvas like below:

```javascript
import BigLeafCanvas from './bigleaf/index.js'

// declaring canvas
const MainCanvas = new BigLeafCanvas("canvas")
// canvas initialized
MainCanvas.init()
```

HTML will be:

```html
<!-- This div is the canvas and every element will be inserted in it -->
<div class="canvas" id="canvas"></div>
```

## Inserting Elements in Canvas

You have to first write HTML element ( you can add styles also in your css file ) in a variable like below:

```javascript
const element = `
        <div id="canvasElement1" class="canvasElement">
        This is your element of your canvas
        </div>`
```

After that you have to insert element in canvas with `.add()` method. Example

```javascript
MainCanvas.add(element)
```

You can insert elements in x,y coordinates also.

```javascript
const x = 150
const y = 200

MainCanvas.add(element, x, y)
```

## Context Menu

To add a custom context menu to the canvas, you can use the `.contextMenu()` method. This method takes an object with three properties: `status`, `contextMenuData`, and `Style`.

- `status` (boolean): Determines whether the context menu should be shown. By default, it is set to `true`.
- `contextMenuData` (array): An array of objects representing the menu items. Each object should have a `title` property for the menu item title and a `func` property for the function to be executed when the menu item is clicked.
- `Style` (object): Optional styling for the context menu.

Here's an example of how to add a custom context menu:

```javascript
MainCanvas.contextMenu({
        status: true,
        contextMenuData: [{
                title: "Delete",
                func: () => {
                        console.log("Delete");
                }
        }]
});
```

In the example above, a context menu with a single item titled "Delete" is added to the canvas. When the "Delete" menu item is clicked, the function `console.log("Delete")` will be executed.

You can customize the context menu by adding more menu items to the `contextMenuData` array. Each menu item can have its own function to be executed when clicked.

Remember to set `status` to `false` if you don't want the context menu to be shown.

## Todos

- [x] Context Menu
- [ ] keyboard shortcuts
- [ ] Copying element
- [ ] Removing element
- [ ] Edge Snapping
- [ ] Grid Snapping
- [ ] Element Snapping (work with dropping)
- [ ] Dropping
- [ ] Element locking
- [ ] Group Selection
- [ ] Group Dragging
- [ ] Export as JPG
- [ ] Export as PNG
- [ ] Export as SVG
- [ ] Linking
- [ ] Automatically scroll the page or container when a draggable element is moved near the edges
- [ ] Touch Gesture
