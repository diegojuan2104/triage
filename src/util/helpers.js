
function quitarAcentos(cadena){
    const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
    return cadena.split('').map( letra => acentos[letra] || letra).join('').toString();	
}

///Aplica lowercase y quita espacios
const nm = (value) => {
    return typeof value === "string" ?  quitarAcentos(value.toLowerCase()).replace(/\s/g, '') : value
}


export { nm } 


    
