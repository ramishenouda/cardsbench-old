import React, { Component } from 'react'

import ListView from './lists-view';
import Card from '../cards/cards-container';

class List extends Component {
    render() {
        const cards = this.props.list.cards.map(card => <Card key={card.id} card={card} />);
        return (
            <ListView listTitle={this.props.list.title} cards={cards} />
        );
    }
}

export default List;
