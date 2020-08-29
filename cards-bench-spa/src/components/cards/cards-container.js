import React, { Component } from 'react'
import CardView from './cards-view'

class Card extends Component {
    render() {
        const cards = this.props.cards.map(card => <CardView key={card.cardId} card={card} />);
        return (
            <div className="card-container">
                { cards }
                <li className="card list-group-item ml-2">
                    <span>
                        <span> + </span> Add card
                    </span>
                </li>
            </div>
        );
    }
}

export default Card;
