import React from 'react'
import { Redirect } from 'react-router-dom'

class AnonymousRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('token');
        const props = this.props;
        return isAuthenticated === null ? (
            <Component  {...props} />
        ) : (
            <Redirect to={{ pathname: '/' }} />
        );
    }
}

export default AnonymousRoute;
