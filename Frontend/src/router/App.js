import React from 'react';
import Home from '../pages/Home';
import AccessUser from '../pages/AccessUser';
import Menu from '../pages/Menu';
import Perfil from '../pages/Perfil';
import Gastos from '../pages/Gastos';
import Deseos from '../pages/Deseos';
import GastosH from '../pages/GastosH';
import InfoGastosPage from '../pages/InfoGastosPage';
import Imagenes from '../pages/Imagenes';
import EditarDeseo from '../pages/EditarDeseo';
import EditarGasto from '../pages/EditarGasto';
import EditarGastoHormiga from '../pages/EditarGastoHormiga';
import '../css/styles.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/access' component={AccessUser}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/perfil' component={Perfil}/>
        <Route path='/gastos' component={Gastos}/>
        <Route path='/deseos' component={Deseos}/>
        <Route path='/gastos-hormiga' component={GastosH}/>
        <Route path='/info-gasto' component={InfoGastosPage}/>
        <Route path='/elegir-imagen' component={Imagenes}/>
        <Route path='/editar-deseo' component={EditarDeseo}/>
        <Route path='/editar-gasto' component={EditarGasto}/>
        <Route path='/editar-gasto-hormiga' component={EditarGastoHormiga}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;