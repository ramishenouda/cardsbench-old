import React from 'react'
import { Redirect } from 'react-router-dom'


// This can only work if u are unauthorized.
class AnonymousRoute extends React.Component {
    render() {
        const token = this.props.token === undefined ? 'token' : this.props.token;
        const redirectTo = this.props.redirectTo === undefined ? '/' : this.props.redirectTo;

        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem(token);

        return isAuthenticated === null ? (
            <Component  {...this.props} />
        ) : (
            <Redirect to={{ pathname: redirectTo }} />
        );
    }
}

export default AnonymousRoute;
