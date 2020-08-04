import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import { Register as register, Login } from '../../services/auth-service' 

import RegisterView from './register-view'
import Notify from '../../services/sweetalert-service';


class Register extends Component {
    state = {
        email: 'ramishenouda@yahoo.com',
        confirmEmail: 'ramishenouda@yahoo.com',
        password: 'ramishenouda@yahoo.com',
        confirmPassword: 'ramishenouda@yahoo.com',
        gender: 'Male',
        knownAs: 'ramishenouda@yahoo.com',
        registering: false
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, this.checkFormValidation);
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
                Login(loginInfo);
            }

            this.setState({registering: false})
        });
    }

    render() {
        if(localStorage.getItem('token') !== null) {
            return <Redirect to="/" />
        }

        return <RegisterView screenWidth={window.innerWidth} handleChange={this.handleChange} registerInfo={this.state} register={this.register} />
    }
}

export default Register