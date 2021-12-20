import * as React from 'react';

//Importe de datos
import * as departamentos from './datos/departamentos.json';
import * as municipios from './datos/municipios.json';
import * as brokers from './datos/brokers.json';
//Libreria de disen

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';

import Grid from '@mui/material/Grid';
import { AppBar, Container, CssBaseline, Input, InputAdornment, InputLabel, Toolbar, Typography } from '@mui/material';

import TablaExcel from './components/Cuerpo';

const App = () => {
  const [nombreCliente, setNombreCliente] = React.useState('');
  const [actividad, setNombreActividad] = React.useState('');
  const [nit, setNIT] = React.useState('');
  const [TRM, setTRM] = React.useState(3800);
  const [broker, setBroker] = React.useState('');

  let broker_value = ""
  const theme = createTheme();

  console.log(broker)

  return (
    <div>

      <React.Fragment>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                <img src="https://telefonosparareclamoscl.com/wp-content/uploads/2021/03/zurich-seguros.png" width="200" height="100" />
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                Triage
              </Typography>
              <React.Fragment>
                <React.Fragment>
                  <Typography variant="h6" gutterBottom>
                    Información de control
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>

                      {/* NOMBRE CLIENTE */}
                      <TextField
                        required
                        fullWidth
                        value={nombreCliente} onChange={(e) => { setNombreCliente(e.target.value) }} label="Nombre Cliente"
                        variant="standard"
                      />

                    </Grid>
                    <Grid item xs={12} md={6}>

                      {/* NIT/CC */}
                      <TextField
                        required
                        fullWidth
                        value={nit} onChange={(e) => { setNIT(e.target.value.replace(/\D/, '')) }} label="NIT/CC"
                        variant="standard"
                      />


                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* ACTIVIDAD */}
                      <TextField
                        required
                        fullWidth
                        value={actividad} onChange={(e) => { setNombreActividad(e.target.value) }} label="Actividad"
                        variant="standard"
                      />

                    </Grid>
                    <Grid item xs={12} md={6}>
                      {/* TRM */}

                      <InputLabel htmlFor="standard-adornment-trm">TRM</InputLabel>
                      <Input
                        id="standard-adornment-trm"
                        label="TRM"
                        required
                        fullWidth
                        type='number'
                        value={TRM} onChange={(e) => { setTRM(e.target.value) }} label="TRM" focused
                        startAdornment={<InputAdornment position="start">COP ($)</InputAdornment>}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {/* BROKER */}
                      <Autocomplete
                        fullWidth
                        options={brokers.default}
                        autoHighlight
                        onChange={(e) => {
                          setBroker(document.getElementsByClassName("MuiInputBase-inputAdornedEnd")[0].value)
                        }}
                        getOptionLabel={(option) => option.intermediarios}
                        renderOption={(props, option) => (
                          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.intermediarios}
                          </Box>
                        )}
                        renderInput={
                          (params)=>(
                            setBroker(...params.inputProps.value)
                          ),
                          (params) => (
                            
                          <TextField
                            variant="standard"
                            fullWidth
                            className="broker"
                            id="broker"
                            {...params}
                            label="Broker"
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </React.Fragment>
              </React.Fragment>
              <TablaExcel trm={TRM} cinf={{nombreCliente, nit, actividad, broker}} />
            </Paper>
          </Container>
        </ThemeProvider>
      </React.Fragment>




    </div>
  );
}

export default App;
