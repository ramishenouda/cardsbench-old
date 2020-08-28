import React, { Component } from 'react'

import * as ListsService from '../../services/lists-service' 

import ListView from './lists-view';
import { ListToAdd } from './lists-view'
import Card from '../cards/cards-container';

class List extends Component {
    state = {
        listTitle: '',
        listsControllerParams: {
            userId: JSON.parse(localStorage.getItem('user')).id,
            boardId: this.props.boardId
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    addList = (event) => {
        event.preventDefault();
        if(this.state.listTitle === '')
            return;

        this.props.sendListToParent('LISTS-CONTAINER-TO-BOARDS-CONTAINER-:-SHOW-THE-LOADING-BAR-HEHE-@LUFFY');
        ListsService.addList(this.state.listTitle, this.state.listsControllerParams)
            .then((result) => {
                console.log('show notification');
                this.props.sendListToParent(result.data.list);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.props.sendListToParent('LISTS-CONTAINER-TO-BOARDS-CONTAINER-:-DISABLE-THE-LOADING-BAR-HEHE-@LUFFY');
            });
    }

    render() {
        if(this.props.listToAdd === false) {
            const cards = this.props.list.cards.map(card => <Card key={card.cardId} card={card} />);
            return (
                <ListView listTitle={this.props.list.title} cards={cards} />
            );
        } else {
            return (
                <ListToAdd listTitle={this.state.listTitle} addList={this.addList} toggleListCreation={this.props.toggleListCreation} handleChange={this.handleChange} />
            );
        }
    }
}

export default List;
