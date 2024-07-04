const zoom = {
    in: ()=> {
        if(universalValues.itemsZoomed>=1){
            universalValues.itemsZoomed=universalValues.itemsZoomed+0.1
        } else if (universalValues.itemsZoomed<1){
            universalValues.itemsZoomed=universalValues.itemsZoomed+0.1
        }
        document.querySelectorAll(".bigLeafElement").forEach(node => node.style.zoom = universalValues.itemsZoomed)
    },
    out: ()=> {
        if(universalValues.itemsZoomed>1){
            universalValues.itemsZoomed=universalValues.itemsZoomed-0.1
        } else if (universalValues.itemsZoomed<=1 ){
            universalValues.itemsZoomed=universalValues.itemsZoomed-0.1
        }
        document.querySelectorAll(".bigLeafElement").forEach(node => node.style.zoom = universalValues.itemsZoomed)
    }
}




export default zoom