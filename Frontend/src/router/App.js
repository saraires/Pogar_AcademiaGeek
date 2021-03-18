import React from 'react';
import Home from '../pages/Home';
import AccessUser from '../pages/AccessUser';
import Menu from '../pages/Menu';
import Perfil from '../pages/Perfil';
import Gastos from '../pages/Gastos';
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;