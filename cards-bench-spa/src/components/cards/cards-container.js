import React, { Component } from 'react'
import CardView from './cards-view'

class Card extends Component {
    render() {
        return (
            <div className="card-container">
                <CardView card={this.props.card} />
            </div>
        );
    }
}

export default Card;
