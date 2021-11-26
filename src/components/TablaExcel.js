import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { TextField } from '@mui/material';


import * as departamentos from '../datos/departamentos.json';
import * as hg from '../datos/hg.json';
// register Handsontable's modules
registerAllModules();

const Tabla = () => {

    const hotTableComponent = useRef(null);
    const [CU, setCU] = React.useState(15);
    const [hotData, setHotData] = React.useState([]);
    const [hotSettings] = React.useState({})
    let hotSettings2 = {
        afterChange: (changes) => {
            if (changes) {
                calculateData()
            }
        }
    }

    useEffect(() => {
    }, []);

    const nm = (value) => {
        return value.isInteger || !value ? (value.toLowerCase()).replace(/\s/g, '') : value
    }

    useEffect(() => {
        let aux = hotData
        setHotData(Handsontable.helper.createEmptySpreadsheetData(CU, 11))
        console.log(aux)

    }, [CU]);


    const secondColumnSettings = {
        title: "Second column header",
    };

    const calculateData = () => {
        let newMatrix = []
        for (let i = 0; i < hotData.length; i++) {
            let newRow = []
            for (let j = 0; j < hotData[i].length; j++) {
                
                
                //COLUMNA MUNICIPIOS
                if (j === 1) {
                    if (hotData[i][1]) {
                        let municipio = nm(hotData[i][1])                        
                        let obj = departamentos.default.find(
                        (item) =>  nm(item.Municipio) == municipio
                        ) 

                        hotData[i][j + 1] = obj? obj.Departamento : ""
                    } else {
                        hotData[i][j + 1] = ""
                    }
                }

                //COLUMNA NAICS
                if (j === 3) {
                    if (hotData[i][3]) {
                        let naics = nm(hotData[i][3])
                        let obj = hg.default.find(
                        (item) =>  nm(item["Property Code (NAICS)"]) == naics
                        )
                        hotData[i][j + 1] = obj != undefined? obj["Hazard Grade PD"] : ""
                        hotData[i][j + 2] = obj != undefined? obj["Hazard Grade BI"] : ""
                        hotData[i][j + 3] = obj != undefined? obj["Colombia Capacity Deployment Latam MM Guideline"] : ""
                    } else {
                        hotData[i][j + 1] = ""
                    }
                }
            }
        }

        hotTableComponent.current.hotInstance.loadData(hotData);
    };


    return (
        <div>

            <TextField
                sx={{ m: 1, width: '30ch' }}
                value={CU} onChange={(e) => {
                    if (CU * 100 <= 5000) {
                        setCU(e.target.value)
                    } else {
                        setCU('')
                    }
                }}
                label="Cantidad de ubicaciones max(500)" color="secondary" focused />
            <HotTable ref={hotTableComponent} settings={hotSettings2} data={hotData} licenseKey="non-commercial-and-evaluation">
                <HotColumn title="Dirección" />
                <HotColumn title="Municipio" />
                <HotColumn title="Departamento" />
                <HotColumn title="Naics" />
                <HotColumn title="PD" />
                <HotColumn title="BI" />
                <HotColumn title="Capacity Deployment" />
                <HotColumn title="Valor PD" />
                <HotColumn title="Valor BI (COP)" />
                <HotColumn title="TIV Total (COP)" />
            </HotTable>

        </div>
    )
}

export default Tabla;