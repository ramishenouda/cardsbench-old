import React from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'

import './pop-up-box-style.css'

function PopUpBox(props) {
    const confirmButtonText = props.confirmButtonText;
    const cancelButtonText = props.cancelButtonText;
    const style = props.style;
    const margin = props.showCancelButton ? 'ml-1' : '';

    return (

        <div className="pop-up-box text-center container" style={style}>
            <Form>
                <center>
                    { props.popUpBoxContent }
                </center>
                    <FormGroup>
                        {
                            props.showCancelButton ? (
                                <Button 
                                    className="button button-info button-small" 
                                    onClick={props.onCancelClick}
                                    disabled={props.disableCancelButton}
                                >
                                    { cancelButtonText }
                                </Button>
                            ) : ('')
                        }
                        {
                            props.showConfirmButton ? (
                                <Button
                                    type="submit"
                                    className={"button button-success button-small " + margin}
                                    onClick={props.onConfirmClick}
                                    disabled={props.disableConfirmButton}
                                >
                                    { confirmButtonText } 
                                </Button>
                            ) : ('')
                        }
                    </FormGroup>
            </Form>
        </div>
    )
}

export default PopUpBox;
