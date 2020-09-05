import React from 'react'

import { Form, FormGroup, Button } from 'react-bootstrap'

import './pop-up-box-style.css'

function PopUpBox(props) {
    const confirmButtonText = props.confirmButtonText === undefined ? 'Confirm' : props.confirmButtonText
    const cancelButtonText = props.cancelButtonText === undefined ? 'Cancel' : props.cancelButtonText

    return (
        <Form className="text-center pop-up-box">
            { props.popUpBoxContent }
            <FormGroup className="mt-2">
                <Button variant="primary" onClick={ props.cancelButtonFunction } > { cancelButtonText } </Button>
                <Button variant="success" onClick={ props.confirmButtonFunction } className="ml-1"> { confirmButtonText } </Button>
            </FormGroup>
        </Form>
    )
}

export default PopUpBox;
