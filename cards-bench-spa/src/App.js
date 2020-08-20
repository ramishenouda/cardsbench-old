import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import Navbar from './components/navbar/navbar-container'
import Home from './components/home/home-container'
import Register from './components/register/register-container'
import Boards from './components/boards/boards-container'
import BoardDetails from './components/boards/board-details-container';
import MemberProfile from './components/member-profile/member-profile-container'
import ErrorPage from './components/error-page/error-page-view';

class App extends Component {
  state = {
    loggedIn: localStorage.getItem('token') === null ? false : true,
    isSmallScreen: window.innerWidth < 768 ? true : false
  }

  changeLoginState () {
    const loggedIn = localStorage.getItem('token') === null ? false : true;
    this.setState({loggedIn : loggedIn});
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar
          changeLoginState={this.changeLoginState.bind(this)}
          loggedIn={this.state.loggedIn}
          isSmallScreen={this.state.isSmallScreen}
        />
        <Switch className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/boards" render={() => <Boards loggedIn={this.state.loggedIn} />} />
          <Route exact path="/boards/:boardId" component={BoardDetails} />
          <Route exact path="/profile" component={MemberProfile} />
          <Route exact path="/error" component={ErrorPage} />
          <Route exact path="/register"
            render={() => (
              <Register
                changeLoginState={this.changeLoginState.bind(this)}
                isSmallScreen={this.state.isSmallScreen}
              />
            )}
          />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
