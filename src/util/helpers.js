
function quitarAcentos(cadena) {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return cadena.split('').map(letra => acentos[letra] || letra).join('').toString();
}

///Aplica lowercase y quita espacios
const nm = (value) => {
    return typeof value === "string" ? quitarAcentos(value.toLowerCase()).replace(/\s/g, '') : value
}

const nmNumber = (value) => {
    return value ? value.toString().split('.').join('').replace('$', '') : "";
}

const parseMoney = (value) => {
    return value ? value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
    }) : value
}

const parseMoneyUSD = (value) => {
    return value ? value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : value
}

const moneyToNumber = (value) => {
    let val = value.toString().split('.').join('').replace('$', '')
    return val
}

const USDtoNumber = (value) => {
    let val = value ? value.toString().split(',').join('').replace('$', '') : ""
    return val
}

const hgPredominante = (TIVtotal, hgPList) => {
    for (let i = hgPList.length - 1; i > 0; i--) {
        if (hgPList[i] > TIVtotal * .20) {
            return i + 1
        }
    }
    return "Ninguno es predominante"
}

const calcFlexa = (pred, flexa) => {
    if (flexa && pred) {

        let usd = USDtoNumber(pred[10])
        let cd = pred[6]

        console.log(flexa)

        let obj = flexa.find((item) => (
            usd >= item["Desde"] && usd <= item["Hasta"]
        ))

        obj = obj && obj[cd]? obj[cd].split(",") : []
        return {
            "value" : obj[0],
            "color" : obj[1],
            "form"  : obj[0]?.split("_")[1]
        }
    }
}



export { nm, nmNumber, parseMoney, moneyToNumber, parseMoneyUSD, USDtoNumber, hgPredominante, calcFlexa }



