import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


import { Register as register } from '../../services/auth-service' 

import RegisterView from './register-view'


class Register extends Component {
    state = {
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        gender: 'Male',
        knownAs: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, this.checkFormValidation);
    };

    register = (event) => {
        event.preventDefault();
        register(this.state);
    }

    render() {
        if(localStorage.getItem('token') !== null) {
            return <Redirect to="/" />
        }

        return <RegisterView handleChange={this.handleChange} registerInfo={this.state} register={this.register} />
    }
}

export default Register