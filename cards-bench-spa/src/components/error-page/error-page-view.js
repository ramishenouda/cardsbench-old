import React from 'react'
import { Link } from 'react-router-dom';

import './error-page-style.css'

function ErrorPage(props) {
    return (
        <div className="error-page d-flex align-items-center">
            <div className="error-code text-center">
               { props.location.state.code }
            </div>
            <div className="container text-center">
                <div className="pt-5 mt-5 pb-5 error-text">
                    { props.location.state.text }
                </div>
                <Link to="/" className="home-button">
                    HOMEPAGE
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;
