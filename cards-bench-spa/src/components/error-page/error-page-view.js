import React from 'react'
import { Link } from 'react-router-dom';

import './error-page-style.css'

function ErrorPage(props) {
    return (
        <div className="error-page d-flex align-items-center">
            <div className="error-code text-center">
            { props.code === undefined ? props.location.state.code : props.code }
            </div>
            <div className="container text-center">
                <div className="pt-5 mt-5 pb-5 error-text">
                    { props.text === undefined ? props.location.state.text : props.text }
                </div>
                <span> { props.buttonHTML === undefined ? (
                    <Link to="/" className="error-page-button">
                        HOMEPAGE
                    </Link>
                ) : (
                    props.buttonHTML
                )} </span>
            </div>
        </div>
    )
}

export default ErrorPage;
