import React from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'

import './pop-up-box-style.css'

function PopUpBox(props) {
    const confirmButtonText = props.confirmButtonText === undefined ? 'Confirm' : props.confirmButtonText
    const cancelButtonText = props.cancelButtonText === undefined ? 'Cancel' : props.cancelButtonText
    const style = props.style;

    return (
        <div className="pop-up-box text-center container" style={style}>
            <Form>
                <div className="mb-1">
                    { props.popUpBoxContent }
                </div>
                <div>
                    <FormGroup>
                        <Button 
                            className="button button-info button-small" 
                            onClick={props.cancelButtonFunction}
                            disabled={props.disableCancelButton}
                        >
                            {cancelButtonText}
                        </Button>
                        <Button
                            type="submit"
                            className="button button-success button-small ml-1" 
                            onClick={props.confirmButtonFunction}
                            disabled={props.disableConfirmButton}
                        >
                            {confirmButtonText} 
                        </Button>
                    </FormGroup>
                </div>
            </Form>
        </div>
    )
}

export default PopUpBox;
