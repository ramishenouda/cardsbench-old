import React, { Component } from 'react';

import { Register as register, Login } from '../../services/auth-service' 

import RegisterView from './register-view'
import Notify from '../../services/sweetalert-service';


class Register extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        gender: 'Male',
        knownAs: '',
        registering: false
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    register = (event) => {
        event.preventDefault();
        this.setState({registering: true})
        register(this.state).finally(() => {
            const registerResponse = localStorage.getItem('registerResponse');

            if (registerResponse === 'success') {
                const loginInfo = {
                    email: this.state.email,
                    password: this.state.password
                };

                Notify.success('Registration Successful')
                Login(loginInfo).finally(() => {
                    if (localStorage.getItem('token') !== null) {
                      this.props.changeAuthenticationState();
                    }
                  });
            }

            this.setState({registering: false})
        });
    }

    render() {
        return (
          <RegisterView
            isSmallScreen={this.props.isSmallScreen}
            handleChange={this.handleChange}
            registerInfo={this.state}
            register={this.register}
          />
        );
    }
}

export default Register
