import React, { useEffect, useRef, useState } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import TextField from '@mui/material/TextField';

import * as departamentos from '../datos/departamentos.json';
import * as hg from '../datos/hg.json';
import * as flexa from '../datos/flexa.json';
import COPE from '../docs/COPE.docm';
import UW from '../docs/UW.docm';


import { nm, nmNumber, parseMoney, moneyToNumber, parseMoneyUSD, USDtoNumber, hgPredominante, calcFlexa } from "../util/helpers"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// register Handsontable's modules
registerAllModules();

const Tabla = (props) => {

    const hotTableComponent = useRef(null);
    const hotTableComponent2 = useRef(null);
    const [CU, setCU] = React.useState(3);
    const [hotData, setHotData] = React.useState([]);
    const [hotData2, setHotData2] = React.useState([]);
    const [hotSettings] = React.useState({})

    const [totalTIV, setTotalTIV] = React.useState(0)
    const [totalTIVUSD, setTotalTIVUSD] = React.useState(0)
    const [totalBI, setTotalBI] = React.useState(0)
    const [totalPD, setTotalPD] = React.useState(0)
    const [mayorP, setMayorP] = React.useState(0)
    const [HGP, setHGP] = React.useState(0)
    const [homogenea, setHomogenea] = React.useState(false)
    const [flex, setFlex] = React.useState({})

    let countTIV = 0
    let countPD = 0
    let countBI = 0
    let mayorTIVIndex = 0
    let mayorTIV = 0
    let homo = []
    let hgP = [0, 0, 0, 0, 0]

    const forms = {
        COPE,
        UW
    }

    let hotSettings1 = {
        afterChange: (changes) => {
            if (changes) {
                calculateData()
            }
        }
    }

    useEffect(() => {
        calculateData()
    }, [props.trm]);



    useEffect(() => {
        cleanData()
        setHotData(Handsontable.helper.createEmptySpreadsheetData(CU, 11))
        setHotData2(Handsontable.helper.createEmptySpreadsheetData(CU, 7))
    }, [CU]);


    const cleanData = () => {
        let homo = []
        countTIV = 0
        countPD = 0
        countBI = 0
        mayorTIVIndex = 0
        homo = 1
        mayorTIV = 0
        hgP = [0, 0, 0, 0, 0]
        setMayorP(0)
        setTotalBI(0)
        setTotalPD(0)
        setTotalTIVUSD(0)
        setTotalTIV(0)
        setFlex({})

    }

    const calculateData = () => {
        cleanData()
        for (let i = 0; i < hotData.length; i++) {
            for (let j = 0; j < hotData[i].length; j++) {
                //COLUMNA MUNICIPIOS
                if (j === 1) {
                    if (hotData[i][1]) {
                        let municipio = nm(hotData[i][1])
                        let obj = departamentos.default.find(
                            (item) => nm(item.Municipio) == municipio
                        )
                        hotData[i][j + 1] = obj ? obj.Departamento : ""
                    }
                    hotData2[i][0] = `${hotData[i][0] ? hotData[i][0] + '-' : ''}${hotData[i][1] ? hotData[i][1] + '-' : ''}${hotData[i][j + 1] ? hotData[i][j + 1] : ''}`
                }

                //COLUMNA NAICS
                if (j === 3) {
                    if (hotData[i][3]) {
                        let naics = nm(hotData[i][3])
                        homo.push(naics)
                        let obj = hg.default.find(
                            (item) => nm(item["Property Code (NAICS)"]) == naics
                        )
                        hotData[i][j + 1] = obj != undefined ? obj["Hazard Grade PD"] : ""
                        hotData[i][j + 2] = obj != undefined ? obj["Hazard Grade BI"] : ""
                        hotData[i][j + 3] = obj != undefined ? obj["Colombia Capacity Deployment Latam MM Guideline"] : ""
                    }
                }

                //FORMATO PD
                if (j === 7) {

                    if (hotData[i][7]) {
                        if (hotData[i][7].toString().split('')[0] == "$") {
                            hotData[i][7] = moneyToNumber(hotData[i][7])
                        }

                        countPD += parseFloat(hotData[i][7])

                        hotData[i][7] = parseMoney((parseFloat(nmNumber(hotData[i][7]))))
                    }
                }

                //COLUMNAS VALOR BI / VALOR PD
                //FORMATO BI
                if (j === 8) {
                    if (hotData[i][8]) {

                        if (hotData[i][8].toString().split('')[0] == "$") {
                            hotData[i][8] = moneyToNumber(hotData[i][8])
                        }

                        countBI += parseFloat(hotData[i][8])
                        hotData[i][8] = parseMoney((parseFloat(nmNumber(hotData[i][8]))))
                    }
                    if (hotData[i][8] || hotData[i][7]) {

                        let vBI = nmNumber(hotData[i][8])
                        let vPD = nmNumber(hotData[i][7])

                        if (hotData[i][j + 1] == "$") {

                        } else {
                            hotData[i][j + 1] = parseMoney((parseFloat(nmNumber(vPD)) ? parseFloat(nmNumber(vPD)) : 0) + (parseFloat(nmNumber(vBI)) ? parseFloat(nmNumber(vBI)) : 0))
                        }
                    } else {
                        hotData[i][j + 1] = ""

                    }
                }

                //TIV TOTAL USD 
                if (j == 9) {
                    if (hotData[i][9]) {

                        let cop = moneyToNumber(hotData[i][9])
                        countTIV += parseFloat(cop)
                        if (hotData[i][4]) hgP[hotData[i][4] - 1] = parseFloat(hgP[hotData[i][4] - 1]) + parseFloat(cop)
                        hotData[i][10] = parseMoneyUSD(parseFloat((parseFloat(cop) * 1 / parseFloat(props.trm))))
                        hotData2[i][3] = hotData[i][10]
                    }
                }
            }
        }
        let totalTIVUSDval = parseFloat((countTIV * 1 / parseFloat(props.trm)))

        setTotalPD(countPD ? parseMoney(countPD) : 0)
        setTotalBI(countBI ? parseMoney(countBI) : 0)

        setTotalTIVUSD(parseMoneyUSD(totalTIVUSDval) ? parseMoneyUSD(totalTIVUSDval) : 0)

        mayorTIV = 0
        for (let i = 0; i < hotData.length; i++) {
            let n = parseFloat(USDtoNumber(hotData[i][10]))
            if (n > mayorTIV) {
                mayorTIV = n
                mayorTIVIndex = i
            }

            hotData[i][11] = n ? (parseFloat(100 * (n / (totalTIVUSDval))).toFixed(2)).toString() + "%" : ""
        }

        setHGP(hgPredominante(countTIV, hgP))

        countTIV = parseMoney(countTIV)
        setTotalTIV(countTIV)
        countTIV = 0
        totalTIVUSDval = 0
        setMayorP(mayorTIVIndex)
        setHomogenea(homo.every(e => e === homo[0]))
        setFlex(calcFlexa(hotData[mayorP], flexa.default))
        homo = []
        hotTableComponent.current.hotInstance.loadData(hotData);
        hotTableComponent2.current.hotInstance.loadData(hotData2);
    };

    return (
        <div>
            <TextField
                required
                variant="standard"
                label="Cantidad de ubicaciones max(500)"
                type="number"
                sx={{ my: 5, width: '30ch' }}
                value={CU}
                onChange={(e) => {
                    if (CU * 100 <= 5000) {
                        setCU(e.target.value)
                    } else {
                        setCU('')
                    }
                }}
            />


            <h2>Informe de los totales y peso</h2>

            <HotTable ref={hotTableComponent} settings={hotSettings1} data={hotData} licenseKey="non-commercial-and-evaluation">
                <HotColumn title="Dirección" />
                <HotColumn title="Municipio" />
                <HotColumn title="Departamento" />
                <HotColumn title="Naics" />
                <HotColumn title="PD" />
                <HotColumn title="BI" />
                <HotColumn title="Capacity Deployment" />
                <HotColumn title="Valor PD (COP)" />
                <HotColumn title="Valor BI (COP)" />
                <HotColumn title="TIV Total (COP)" />
                <HotColumn title="TIV Total (USD)" />
                <HotColumn title="Peso" />
            </HotTable>

            <TableContainer>
                <Table sx={{
                    minWidth: 650,
                }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Total TIV (COP) : {totalTIV}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total TIV (USD) : {totalTIVUSD}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total PD (COP) : {totalPD}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Total BI (COP) : {totalBI}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Dirección con mayor peso : {hotData[mayorP] ? hotData[mayorP][0] : ""}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>HG predominante : {HGP} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Capacity Deployment: {hotData[mayorP] ? hotData[mayorP][6] : ""} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>¿Homogénea? : {homogenea ? "Si" : "No"} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Flexa : {hotData[mayorP] ? <a href={ flex?.form == "COPE" ? COPE : (flex?.form == "UW" ? UW : "#")} download style={
                                {
                                    color: flex?.color
                                }
                            }>{flex?.value}</a> : ""}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>

            <h2>Tabla CRI</h2>
            <HotTable ref={hotTableComponent2} data={hotData2} licenseKey="non-commercial-and-evaluation">
                <HotColumn title="Ubicación" />
                <HotColumn title="Latitud" />
                <HotColumn title="Longitud" />
                <HotColumn title="TIV USD" />
                <HotColumn title="Score EQ" />
                <HotColumn title="Score Flood" />
                <HotColumn title="Score windstorm" />
            </HotTable>

        </div>
    )
}

export default Tabla;