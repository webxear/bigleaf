import drag from "./features/drag.js"

// universal values needed for working the canvas
globalThis.universalValues = {
    currentDragItem: undefined,
    draggingOn: false,
    stickingWithEdges: false,
    dragItemTouchedOnX: 0,
    dragItemTouchedOnY: 0,
    canvasZoomed: 0
}

class Node {
    constructor({ id }) {
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

class Canvas extends Node {
    // initializing assigning default styles, universalValues, functions and eventListeners of canvas
    init = () => {
        universalValues.canvasZoomed = getComputedStyle(this.node).zoom // inserting zoomed value for able to operation in zoomed mode also
        this.node.style.position = "relative"
        this.node.style.overflow = "hidden"
        this.node.addEventListener("mousemove", this.#dragging)
        this.node.addEventListener("mouseup", this.#dragStop)
    }
    // functionality of dragging a item on canvas (work with eventListeners)
    #dragging = drag.run(this.points)
    // functionality to stop dragging a item on canvas (work with eventListeners)
    #dragStop = drag.stop
}

class DragItem extends Node {
    // initializing assigning default styles, universalValues, functions and eventListeners of every draggable item
    init = () => {
        this.node.addEventListener("mousedown", this.#dragStart)
    }
    // assigning universalValues which are need to start dragging the item on the canvas
    #dragStart = drag.start(this.node)
}

export default { Canvas, DragItem }