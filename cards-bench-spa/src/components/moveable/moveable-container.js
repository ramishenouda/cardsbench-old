import React, { Component } from 'react';

import './moveable-style.css'

class Moveable extends Component {
    state = {
        mouseDown: false,
        index: this.props.index,
        X: '',
        Y: '',
        moveable: ''
    }

    componentDidMount() {
        const moveable =  document.querySelector(`.moveable-component${[this.props.index]}`);

        moveable.style.left = moveable.offsetWidth * this.props.index + (this.props.index === 0 ? 0 : 5) + 'px';
        moveable.addEventListener('mousedown', this.mouseDown, true);
        moveable.addEventListener('mouseup', this.mouseUp, true);
        moveable.addEventListener('mousemove', this.mouseMove, true);

        this.setState({ moveable: moveable});
    }

    componentWillUnmount() {
        this.state.moveable.removeEventListener('mousedown', this.mouseDown, true);
        this.state.moveable.removeEventListener('mouseup', this.mouseUp, true);
        this.state.moveable.removeEventListener('mousemove', this.mouseMove, true);
    }

    mouseDown = (event) => {
        const x = this.state.moveable.offsetLeft - event.clientX;
        const y = this.state.moveable.offsetTop - event.clientY;
        this.setState({ 
            mouseDown: true,
            X: x,
            Y: y 
        })
    }

    mouseUp = () => {
        this.setState({ mouseDown: false })   
    }

    mouseMove = (event) => {
        if (this.state.mouseDown) {
            this.setState((prevState) => {
                prevState.moveable.style.left = event.clientX + this.state.X + 'px';
                prevState.moveable.style.top = event.clientY + this.state.Y + 'px';

                return {
                    moveable: prevState.moveable
                }
            })
        }
    }

    render() {
        return (
            <div style={{position: "absolute"}} className={`moveable-component${[this.props.index]}`}>
                { this.props.component }
            </div>
        );
    }
}

export default Moveable;
