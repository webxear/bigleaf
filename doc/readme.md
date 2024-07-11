## Get Started

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

### Inserting Elements in Canvas

You have to first write HTML element ( you can add styles also in your css file ) in a variable like below:

```javascript
const element = `
        <div id="canvasElement1" class="canvasElement">
        This is your element of your canvas
        </div>`
```

After that you have to insert element in canvas with **.add()** method. Example

```javascript
MainCanvas.add(element)
```

You can insert elements in x,y coordinates also.

```javascript
const x = 150
const y = 200

MainCanvas.add(element, x, y)
```

### Todos

- [ ] Group Selection
- [ ] Group Dragging
- [ ] Element locking
- [ ] Element locking
- [ ] Export as JPG
- [ ] Export as PNG
- [ ] Export as SVG
- [ ] Linking
