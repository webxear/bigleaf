## Get Started
At first download or clone the bigleaf folder to your project.Then import "Canvas" from the index.js file. After that initiate the canvas by providing the ID of the div element which you wanted to use for the canvas like below:

```javascript
import Canvas from './bigleaf/index.js'

// declaring canvas
const MainCanvas = new Canvas("canvas")
// canvas initialized
MainCanvas.init()
```