import makeItemTranslate from "../utilities/translate.js" // functionalities of translating items on canvas

const drag = {
    start: node => {
        return e => {
            universalValues.activeItem = node
            universalValues.draggingOn = true
            universalValues.dragItemTouchedOnX = e.offsetX / universalValues.canvasZoomed
            universalValues.dragItemTouchedOnY = e.offsetY / universalValues.canvasZoomed
        }
    },
    run: points => {
        return e => {
            let translateX = e.clientX / universalValues.canvasZoomed - points.topLeft() - universalValues.dragItemTouchedOnX
            let translateY = e.clientY / universalValues.canvasZoomed - points.topRight() - universalValues.dragItemTouchedOnY
            if (universalValues.draggingOn) {
                universalValues.activeItem.style["user-select"] = "none"
                makeItemTranslate(translateX, translateY)
            }
        }
    },
    stop: e => {
        universalValues.activeItem.style["user-select"] = "text"
        universalValues.draggingOn = false
    }
}

export default drag