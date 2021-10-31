import * as React from 'react';

//Importe de datos
import * as departamentos from './datos/departamentos.json';
import * as municipios from './datos/municipios.json';
import * as brokers from './datos/brokers.json';
//Libreria de disen

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';

import Grid from '@mui/material/Grid';


const App = () => {
  const [nombreCliente, setNombreCliente] = React.useState('');
  const [actividad, setNombreActividad] = React.useState('');
  const [nit, setNombreNit] = React.useState('');
  const [broker, setBroker] = React.useState('');

  console.log(brokers)
  const options = ['Option 1', 'Option 2'];
  const limpiarCampos = () => {
  }
  return (
    <div>
      <h1>TRIAGE</h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              sx={{ m: 1, width: '100ch' }}
              value={nombreCliente} onChange={(e) => { setNombreCliente(e.target.value) }} label="Nombre Cliente" color="secondary" focused />
          </Grid>
          <Grid item xs={4}>
            <TextField
              sx={{ m: 1, width: '30ch' }}
              value={nit} onChange={(e) => { setNombreNit(e.target.value) }} label="NIT" color="secondary" focused />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={{ m: 1, width: '137ch' }}
              value={actividad} onChange={(e) => { setNombreActividad(e.target.value) }} label="Actividad" color="secondary" focused />
          </Grid>
          <Grid item xs={6}>

      <Autocomplete
       sx={{ m: 1, width: '68ch' }}
      id="country-select-demo"
      options={brokers.default}
      autoHighlight
      getOptionLabel={(option) => option.intermediarios}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          {option.intermediarios}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
        </Grid>

        </Grid>
      </Box>
    </div>
  );
}

export default App;
