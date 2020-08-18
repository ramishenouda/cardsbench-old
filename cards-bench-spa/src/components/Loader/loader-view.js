import './loader-style.css'
import React, { Component } from 'react';


class LoaderView extends Component {
    
    render() {
        const style = {
            width: this.props.width,
            height: this.props.height,
            borderWidth: this.props.borderWidth,
            borderStyle: this.props.borderStyle,
            borderColor: this.props.borderColor,
        }

        return (    
            <div style={style} className="loader"></div>
        );
    }
}

export default LoaderView;
