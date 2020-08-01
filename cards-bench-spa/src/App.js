import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import Navbar from './components/Navbar/navbar-container'
import Home from './components/Home/home-container'
import Register from './components/Register/register-container'


class App extends Component {
  state = {
    loggedIn: localStorage.getItem('token') === null ? false : true,
  }

  changeLoginState = () => {
    this.setState({loggedIn: localStorage.getItem('token') === null ? false : true});
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar changeLoginState={this.changeLoginState} loggedIn={this.state.loggedIn} />
        <Switch className="container">
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
