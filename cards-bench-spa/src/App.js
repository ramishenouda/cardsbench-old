import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import AnonymousRoute from './AnonymousRoute';
import Navbar from './components/navbar/navbar-container'
import Home from './components/home/home-container'
import Register from './components/register/register-container'
import Boards from './components/boards/boards-container'
import BoardDetails from './components/boards/board-details-container';
import MemberProfile from './components/member-profile/member-profile-container'
import ErrorPage from './components/error-page/error-page-view';

class App extends Component {
  state = {
    authenticated: localStorage.getItem('token') === null ? false : true,
    isSmallScreen: window.innerWidth < 768 ? true : false
  }

  changeAuthenticationState () {
    const authenticated = localStorage.getItem('token') === null ? false : true;
    this.setState({authenticated : authenticated});
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar
          changeAuthenticationState={this.changeAuthenticationState.bind(this)}
          authenticated={this.state.authenticated}
          isSmallScreen={this.state.isSmallScreen}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute exact path="/boards" component={Boards} />
          <ProtectedRoute exact path="/boards/:boardId/:boardName" component={BoardDetails} {...this.props}/>
          <ProtectedRoute exact path="/profile" component={MemberProfile} />
          <Route exact path="/error" component={ErrorPage} />
          <AnonymousRoute exact path="/register" component={Register}
            changeAuthenticationState={this.changeAuthenticationState.bind(this)}
            isSmallScreen={this.state.isSmallScreen}
          />
          <Route render={() => <Redirect to={{ pathname: '/' }} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
