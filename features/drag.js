const drag = {
    start: (node) => {
        return e => {
            universalValues.currentDragItem = node
            universalValues.draggingOn = true
            universalValues.dragItemTouchedOnX = e.offsetX/universalValues.canvasZoomed
            universalValues.dragItemTouchedOnY = e.offsetY/universalValues.canvasZoomed
        }
    },
    run: (points) => {
        return e => {
            let translateX = e.clientX/universalValues.canvasZoomed - points.topLeft() - universalValues.dragItemTouchedOnX
            let translateY = e.clientY/universalValues.canvasZoomed - points.topRight() - universalValues.dragItemTouchedOnY
            if (universalValues.draggingOn) {
                universalValues.currentDragItem.style.transform = `translate(${translateX}px, ${translateY}px)`
            }
        }
    },
    stop: e => {
        universalValues.draggingOn = false
    }
}

export default drag