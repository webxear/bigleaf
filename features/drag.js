import makeElementTranslate from "../utilities/translateElement.js" // functionalities of translating items on canvas

const drag = {
    start: node => {
        return e => {
            universalValues.activeItem = node
            universalValues.draggingOn = true
            universalValues.dragItemTouchedOnX = e.offsetX / universalValues.canvasZoomed
            universalValues.dragItemTouchedOnY = e.offsetY / universalValues.canvasZoomed
        }
    },
    run: (points, node) => {
        return e => {
            const ratio = (1 / universalValues.itemsZoomed) //main
            // const ratio = (1 / universalValues.canvasItems)
            const translateX = (e.clientX / universalValues.canvasZoomed - points.topLeft() - universalValues.dragItemTouchedOnX) * ratio // ratio = 1 / node.style.zoom
            const translateY = (e.clientY / universalValues.canvasZoomed - points.topRight() - universalValues.dragItemTouchedOnY) * ratio // ratio = 1 / node.style.zoom
            // let translateX = (e.clientX / universalValues.canvasZoomed - points.topLeft() - universalValues.dragItemTouchedOnX)  
            // let translateY = (e.clientY / universalValues.canvasZoomed - points.topRight() - universalValues.dragItemTouchedOnY)
            if (universalValues.draggingOn) {
                universalValues.activeItem.style["user-select"] = "none"
                makeElementTranslate(translateX, translateY)
            }
        }
    },
    stop: e => {
        universalValues.activeItem.style["user-select"] = "text"
        universalValues.draggingOn = false
    }
}

export default drag