import React from 'react';
import Home from '../pages/Home';
import AccessUser from '../pages/AccessUser';
import Menu from '../pages/Menu';
import '../css/styles.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/access' component={AccessUser}/>
        <Route path='/menu' component={Menu}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;