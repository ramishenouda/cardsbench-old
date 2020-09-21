import React, { Component } from 'react'


import PopUpBoxView from './pop-up-box-view'

class PopUpBox extends Component {
    state = {
        showPopUpBox: false
    }

    render() {
        const style = this.props.style;
        const popUpBoxContent = this.props.popUpBoxContent 
    
        const confirmButtonText = this.props.confirmButtonText === undefined ? 'Confirm' : this.props.confirmButtonText
        const showConfirmButton = this.props.showConfirmButton === undefined ? true : this.props.showConfirmButton;
        const onConfirmButtonClick = this.props.confirmButtonFunction
        const disableConfirmButton = this.props.disableConfirmButton
        
        const cancelButtonText = this.props.cancelButtonText === undefined ? 'Cancel' : this.props.cancelButtonText
        const showCancelButton = this.props.showCancelButton === undefined ? true : this.props.showCancelButton;

        const onCancelButtonClick = this.props.cancelButtonFunction
        const disableCancelButton = this.props.disableCancelButton

        return (
            <PopUpBoxView
                popUpBoxContent={popUpBoxContent}
                confirmButtonText={confirmButtonText}
                cancelButtonText={cancelButtonText}
                style={style}
                onConfirmClick={onConfirmButtonClick}
                showConfirmButton={showConfirmButton}
                disableConfirmButton={disableConfirmButton}
                onCancelClick={onCancelButtonClick}
                showCancelButton={showCancelButton}
                disableCancelButton={disableCancelButton}
            />
        )
    }
}

export default PopUpBox
