
import * as React from 'react'

//importar los datos 
import * as departamentos from './datos/departamentos.json';
import * as municipios from './datos/municipios.json';


function App() {
  //Definicion de los estados 
  const [departamento, setDepartamento] = React.useState('') 
  const [municipio, setMunicipio] = React.useState('') 

  return (
    <div className="App">
    </div>
  );
}

export default App;
