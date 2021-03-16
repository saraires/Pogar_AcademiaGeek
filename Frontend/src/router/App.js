import React from 'react';
import Home from '../pages/Home';
import AccessUser from '../pages/AccessUser';
import '../css/styles.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/access' component={AccessUser}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;