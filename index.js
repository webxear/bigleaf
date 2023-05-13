import drag from "./features/drag.js" // importing dragging functionalities
import zoom from "./features/zoom.js"
import insertCanvasElement from "./utilities/insertCanvasElement.js"
import makeElementTranslate from "./utilities/translateElement.js"

// universal values needed for working the canvas
globalThis.universalValues = {
    activeItem: undefined, // the element, which is clicked last
    draggingOn: false,
    stickingWithEdges: false,
    dragItemTouchedOnX: 0,
    dragItemTouchedOnY: 0,
    canvasZoomed: 1,
    itemsZoomed: 1,
    canvasItems: []
}

class BigLeafElementNode {
    constructor(id) {
        this.node = document.getElementById(id)
    }
    // to get positions of every corner points
    points = {
        topLeft: () => this.node.getBoundingClientRect().x,
        topRight: () => this.node.getBoundingClientRect().y,
        bottomLeft: () => this.node.getBoundingClientRect().x + this.node.getBoundingClientRect().width,
        bottomRight: () => this.node.getBoundingClientRect().y + this.node.getBoundingClientRect().height,
    }
}

class DragItem extends BigLeafElementNode {
    // initializing assigning default styles, universalValues, functions and eventListeners of every draggable item
    init = (translateX, translateY) => {
        // console.log(this.node)
        this.node.addEventListener("mousedown", this.#dragStart)
        universalValues.activeItem = this.node
        makeElementTranslate(translateX, translateY) // initiating element to wanted place in canvas
    }
    // assigning universalValues which are need to start dragging the item on the canvas
    #dragStart = drag.start(this.node)
}

class Canvas extends BigLeafElementNode {
    // initializing assigning default styles, universalValues, functions and eventListeners of canvas
    init = () => {
        universalValues.canvasZoomed = getComputedStyle(this.node).zoom // inserting zoomed value for able to operation in zoomed mode also
        this.node.style.position = "relative"
        this.node.style.overflow = "scroll"
        this.node.addEventListener("mousemove", this.#dragging)
        this.node.addEventListener("mouseup", this.#dragStop)
        this.node.onmousewheel = this.#zoomHandler
    }
    // functionality to add an item into the canvas
    add = async (element, translateX, translateY) => {
        // inserting item to canvas and getting id of the element
        const insertedElementId = insertCanvasElement(this.node, element)
        // initializing the element in canvas
        const insertedElement = new DragItem(insertedElementId)
        insertedElement.node.style.zoom = universalValues.itemsZoomed
        insertedElement.node.className = `${insertedElement.node.className} bigLeafElement`
        insertedElement.init(translateX, translateY)
    }
    // functionality of dragging a item on canvas (work with eventListeners)
    #dragging = drag.run(this.points, this.node)
    // functionality to stop dragging a item on canvas (work with eventListeners)
    #dragStop = drag.stop
    // functionality to zoom in
    #zoomHandler = (e) => {
        if (e.ctrlKey) {
            e.preventDefault()
            if (e.deltaY === -100 && universalValues.itemsZoomed < 100) {
                zoom.in()
            } else if ((e.deltaY === 100 && universalValues.itemsZoomed > 0.01)) {
                zoom.out()
            }
        }
    }
}

export default Canvas