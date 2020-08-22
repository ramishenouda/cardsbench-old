import React, { Component } from 'react'
import CardView from './cards-view'

class Card extends Component {
    render() {
        return (
            <CardView card={this.props.card} />
        );
    }
}

export default Card;
