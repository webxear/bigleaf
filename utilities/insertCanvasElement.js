const insertCanvasElement = (canvas, element) => {
    const lastCanvasItem = universalValues.canvasItems[universalValues.canvasItems.length - 1]
    if (lastCanvasItem) {
        document.getElementById(lastCanvasItem).insertAdjacentHTML("afterend", element)
    } else {
        canvas.innerHTML = element
    }
    // add item id in canvas items' list
    const idOfElement = canvas.children[universalValues.canvasItems.length].id // getting the ID of element
    universalValues.canvasItems.push(idOfElement)
    return idOfElement
}

export default insertCanvasElement