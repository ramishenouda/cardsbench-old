import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import Navbar from './components/Navbar/navbar-container'
import Home from './components/Home/home-container'
import Register from './components/Register/register-container'
import Boards from './components/Boards/boards-container'

class App extends Component {

  state = {
    loggedIn: localStorage.getItem('token') === null ? false : true,
  }

  changeLoginState () {
    const loggedIn = localStorage.getItem('token') === null ? false : true;
    this.setState({loggedIn : loggedIn});
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar changeLoginState={this.changeLoginState.bind(this)} loggedIn={this.state.loggedIn} />
        <Switch className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/boards' component={Boards} />
          <Route exact path='/register' render={()=> <Register changeLoginState={this.changeLoginState.bind(this)} />} />
          <Route render={()=> <Redirect to={{pathname: "/"}} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
