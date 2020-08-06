import React, { Component } from 'react';

import { LoginOrRegisterNavbarView, LoginNavbar, LoggedInNavbarView } from './navbar-view';

import { Login, Logout } from '../../services/auth-service'
import Notify  from '../../services/sweetalert-service'


class Navbar extends Component {
  state = {
    showLoginBar: false,
    email: '',
    password: '',
    validEmail: 'untouched',
    validPassword: 'untouched',
    validForm: false,
    loggingIn: false,
  };

  toggleLogin = () => {
    this.setState({ showLoginBar: !this.state.showLoginBar });
  };

  login = (event) => {
    event.preventDefault();
    this.setState({loggingIn: true});

    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    };
    
    Login(loginInfo).finally(() => {
      if (localStorage.getItem('token') !== null) {
        this.props.changeLoginState();
        Notify.success('Welcome ' + JSON.parse(localStorage.getItem('user')).knownAs, 'Have a nice day.');
      } else {
        Notify.info('Wrong Email or Password');
      }

      this.setState({loggingIn: false});
    })
  
  };

  logout = (event) => {
    event.preventDefault();
    Logout();
    this.props.changeLoginState();
    Notify.info('Logged out. Redirecting to the Homepage.')
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.checkFormValidation);
  };

  checkFormValidation() {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const emailValidation = new RegExp(re).test(this.state.email);

    let validForm = true;

    if (this.state.password.length > 3) {
      this.setState({ validPassword: 'true' });
    } else if (this.state.password.length > 0) {
      this.setState({ validPassword: 'false' });
      validForm = false;
    } else {
      validForm = false;
    }

    if (emailValidation) {
      this.setState({ validEmail: 'true' });
    } else if (this.state.email.length > 0) {
      this.setState({ validEmail: 'false' });
      validForm = false;
    } else {
      validForm = false;
    }

    if (validForm) {
      this.setState({ validForm: true });
    } else {
      this.setState({ validForm: false });
    }
  }

  render() {
    if (this.props.loggedIn) {
      return <LoggedInNavbarView logout={this.logout}/>;
    } else if (this.state.showLoginBar) {
      return (
        <LoginNavbar
          loginInfo={this.state}
          handleChange={this.handleChange}
          login={this.login}
          toggleLogin={this.toggleLogin}
        />
      );
    } else {
      return <LoginOrRegisterNavbarView toggleLogin={this.toggleLogin} />;
    }
  }
}

export default Navbar;
