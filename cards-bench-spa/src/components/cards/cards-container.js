import React, { Component } from 'react'

import Notify from '../../services/sweetalert-service'
import LoaderView from './../loader/loader-view'

import * as CardsService from '../../services/cards-service'
import CardView, { AddCardView } from './cards-view'

class Card extends Component {

    state = {
        cards: this.props.cards,
        cardTitle: '',
        addingCard: false,
        showSavingLoader: false,
        savingLoaderText: 'Saving Changes...',
        ControllerParams: {
            userId: this.props.listParams.userId,
            boardId: this.props.listParams.boardId,
            listId: this.props.listId
        }
    }

    toggleAddingCard = () => {
        this.setState({ addingCard: !this.state.addingCard });
    }

    addCard = (event) => {
        event.preventDefault();
        
        if (this.state.cardTitle === '')
        return;
        
        this.toggleAddingCard();
        this.setState({ showSavingLoader: true, savingLoaderText: 'Adding Card...' })

        CardsService.addCard(this.state.cardTitle, this.state.ControllerParams)
            .then((result) => {
                console.log(result);
                this.setState(prevState => { 
                    prevState.cards.push(result.data);  
                    return { cards: prevState.cards }
                });
            }).catch((err) => {
                Notify.error('Error while adding the list.', 'Try refreshing the page.');
                console.log(err);
            }).finally(() => {
                this.setState({ showSavingLoader: false })
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const cards = this.props.cards.map(card => <CardView key={card.cardId} card={card} />);
        return (
            <div className="card-container">
                {
                    this.state.showSavingLoader ? (
                        <div>
                            <div className="saving-changes-loader">
                                <LoaderView width={10} height={10} />
                            </div>
                            <div className="saving-changes-loader-text mr-4">
                                {this.state.savingLoaderText}
                            </div>
                        </div>
                    ) : ('')
                }
                {cards}
                <AddCardView
                    handleChange={this.handleChange}
                    toggleAddingCard={this.toggleAddingCard}
                    addingCard={this.state.addingCard}
                    addCard={this.addCard}
                    cardTitle={this.state.cardTitle}
                />
            </div>
        );
    }
}

export default Card;
