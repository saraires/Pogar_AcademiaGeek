import React from 'react';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import Home from '../pages/Home';
import '../css/styles.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/singin' component={SignIn}/>
        <Route path='/singup' component={SignUp}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;