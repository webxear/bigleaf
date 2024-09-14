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
    canvasItems: [],
    contextMenuData: {},
    contextMenuStatus: true
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

class BigLeafCanvas extends BigLeafElementNode {
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
    // Functionality for Context Menu
    contextMenu = ({ status, contextMenuData, style }) => {
        /*** 
       @context Menu Structure:
       [{
           title: "HERE_WILL_BE_TITLE_OF_THE_MENU_ITEM",
           func: (func) => func()
       }]
       ***/
        /**
         * @style object contains the style features of the context menu items
         * style = {
         *  backgroundColor: "HERE_WILL_BE_BACKGROUND_COLOR_OF_THE_CONTEXT_MENU_ITEM",
         *  color: "HERE_WILL_BE_COLOR_OF_THE_TEXT",
         *  fontSize: "HERE_WILL_BE_FONT_SIZE_OF_THE_TEXT",
         *  fontWeight: "HERE_WILL_BE_FONT_WEIGHT_OF_THE_TEXT"
         *  hoverBackgroundColor: "HERE_WILL_BE_BACKGROUND_COLOR_OF_THE_CONTEXT_MENU_ITEM_WHEN_HOVERED",
         *  hoverColor: "HERE_WILL_BE_COLOR_OF_THE_TEXT_WHEN_HOVERED",
         *  hoverFontSize: "HERE_WILL_BE_FONT_SIZE_OF_THE_TEXT_WHEN_HOVERED",
         *  hoverFontWeight: "HERE_WILL_BE_FONT_WEIGHT_OF_THE_TEXT_WHEN_HOVERED",
         *  padding: "HERE_WILL_BE_PADDING_OF_THE_CONTEXT_MENU_ITEM",
         * border: "HERE_WILL_BE_BORDER_OF_THE_CONTEXT_MENU_ITEM",
         * borderRadius: "HERE_WILL_BE_BORDER_RADIUS_OF_THE_CONTEXT_MENU_ITEM"
         * } 
         */


        universalValues.contextMenuStatus = status
        universalValues.contextMenuData = contextMenuData
        this.node.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            if (status) {
                const contextMenu = document.createElement("div")
                // if cursor hover the context menu, it will be pointer
                contextMenu.style.cursor = "pointer"
                contextMenu.className = "bigLeafContextMenu"
                contextMenu.style.position = "absolute"
                contextMenu.style.left = `${e.clientX}px`
                contextMenu.style.top = `${e.clientY}px`
                contextMenu.style.zIndex = 9999
                contextMenuData.forEach((item) => {
                    const menuItem = document.createElement("div")
                    // add default styles to context menu items
                    menuItem.style.backgroundColor = style?.backgroundColor || "#fff"
                    menuItem.style.color = style?.color || "#000"
                    menuItem.style.fontSize = style?.fontSize || "16px"
                    menuItem.style.fontWeight = style?.fontWeight || "400"
                    menuItem.style.padding = style?.padding || "10px"
                    menuItem.style.border = style?.border || "1px solid #000"
                    menuItem.style.borderRadius = style?.borderRadius || "5px"
                    // add hover styles to context menu items
                    menuItem.onmouseover = () => {
                        menuItem.style.backgroundColor = style?.hoverBackgroundColor || "#000"
                        menuItem.style.color = style?.hoverColor || "#fff"
                        menuItem.style.fontSize = style?.hoverFontSize || "16px"
                        menuItem.style.fontWeight = style?.hoverFontWeight || "400"
                    }
                    menuItem.onmouseout = () => {
                        menuItem.style.backgroundColor = style?.backgroundColor || "#fff"
                        menuItem.style.color = style?.color || "#000"
                        menuItem.style.fontSize = style?.fontSize || "16px"
                        menuItem.style.fontWeight = style?.fontWeight || "400"
                    }

                    menuItem.className = "bigLeafContextMenuItem"
                    menuItem.innerText = item.title
                    menuItem.onclick = () => {
                        item.func()
                        contextMenu.remove()
                    }
                    contextMenu.appendChild(menuItem)
                })
                this.node.appendChild(contextMenu)
            }
        })
        this.node.addEventListener("click", () => {
            if (document.querySelector(".bigLeafContextMenu")) {
                document.querySelector(".bigLeafContextMenu").remove()
            }
        })

    }

    // functionality of dragging a item on canvas (work with eventListeners)
    #dragging = drag.run(this.points, this.node)
    // functionality to stop dragging a item on canvas (work with eventListeners)
    #dragStop = drag.stop
    // functionality to zoom in and out
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

export default BigLeafCanvas