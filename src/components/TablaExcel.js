import React, { useEffect } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.css';
import { HotTable, HotColumn } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import { TextField } from '@mui/material';

// register Handsontable's modules
registerAllModules();

const Tabla = () => {

    const [CU, setCU] = React.useState(0);
    const [hotData, setHotData] = React.useState([]);
    const [hotSettings] = React.useState({})
    let hotSettings2 = {
        afterChange: (changes) => {
            if (changes) {  
                hotSettings2 = {
                    data: [],
                }
            }
        }
    }


    useEffect(() => {
    }, []);

    const procesarDatos = () => {
        
    }

    useEffect(() => {
       
        console.log(hotSettings)
        setHotData(Handsontable.helper.createEmptySpreadsheetData(CU, 11))

    }, [CU]);


    const secondColumnSettings = {
        title: "Second column header",
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
            <HotTable settings={hotSettings2} data={hotData} licenseKey="non-commercial-and-evaluation">
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