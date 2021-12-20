
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
        console.log(pred)
        let usd = USDtoNumber(pred[10])
        let cd = pred[6]
        let obj = flexa.find((item) => (
            usd >= item["Desde"] && usd <= item["Hasta"]
        ))


        obj = obj && obj[cd] ? obj[cd].split(",") : []
        return {
            "value": obj[0],
            "color": obj[1],
            "form": obj[0]?.split("_")[1]
        }
    }
}


const ranges = {

    FLOOD: {
        "low": [1, 2, 3, 4],
        "medium": [5, 6],
        "high": [7, 8],
        "veryHigh": [9, 10]
    }
    ,
    EQ: {
        "low": [1, 2, 3, 4, 5],
        "medium": [6],
        "high": [7, 8],
        "veryHigh": [9, 10]
    }

}



const calcCC = (number, type) => {
    const obj = ranges[type]
    for (const prop in obj) {
        if (obj[prop].includes(number)) {
            return prop
        }
    }
}

const calcCCPorcEQ = (EQ) => {
    let low = cc(200000000, EQ["low"])
    let medium = cc(200000000, EQ["medium"])
    let high = cc(50000000, EQ["high"])
    let veryHigh = cc(25000000, EQ["veryHigh"])

    if (low < medium && low < high && low < veryHigh) {
        return low
    } else if (medium < low && medium < high && medium < veryHigh) {
        return medium
    } else if (high < low && high < medium && high < veryHigh) {
        return high
    } else if (veryHigh < low && veryHigh < medium && veryHigh < high) {
        return veryHigh
    } else {
        return 0
    }
}

const calcCCPorcFLOOD = (FLOOD) => {
    let low = cc(200000000, FLOOD["low"])
    let medium = cc(50000000, FLOOD["medium"])
    let high = cc(25000000, FLOOD["high"])
    let veryHigh = cc(25000000, FLOOD["veryHigh"])

    if (low < medium && low < high && low < veryHigh) {
        return low
    } else if (medium < low && medium < high && medium < veryHigh) {
        return medium
    } else if (high < low && high < medium && high < veryHigh) {
        return high
    } else if (veryHigh < low && veryHigh < medium && veryHigh < high) {
        return veryHigh
    } else {
        return 0
    }
}


const cc = (limit, tiv) => {
    return tiv == 0 ? Infinity : (limit / tiv) * 100 >= 100 ? 100 : ((limit / tiv) * 100).toFixed(4)
}





export { nm, nmNumber, parseMoney, moneyToNumber, parseMoneyUSD, USDtoNumber, hgPredominante, calcFlexa, calcCC, calcCCPorcEQ, calcCCPorcFLOOD }



