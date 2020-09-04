import React, { Component } from 'react'

import Notify from '../../services/sweetalert-service'
import LoaderView from './../loader/loader-view'

import * as CardsService from '../../services/cards-service'
import CardView, { AddCardView } from './cards-view'

class Card extends Component {

    state = {
        cards: this.props.cards,
        cardTitle: '',
        currentCardTitle: '',
        updatingCardId: '',
        addingCard: false,
        showSavingLoader: false,
        savingLoaderText: 'Saving Changes...',
        updatingCardTitle: false,
        cardOrder: 0,
        ControllerParams: {
            userId: this.props.listParams.userId,
            boardId: this.props.listParams.boardId,
            listId: this.props.listId
        }
    }

    componentDidMount() {
        this.setState(prevState => {
            prevState.cards.sort((a, b) => a.order - b.order);

            return {
                cards: prevState.cards
            }
        })

        window.addEventListener('click', this.unToggleCardTitleUpdate);
        window.addEventListener('keyup', this.unToggleCardTitleUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.unToggleCardTitleUpdate);
        window.removeEventListener('keyup', this.unToggleCardTitleUpdate);
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

    deleteCard = (cardId, cardOrder) => {
        if (cardId === null)
            return;
        
        Notify.warning('Are you sure?', 'You won\'t be able to revert this!')
            .then(result => {
                if (result.value) {
                    this.setState({ showSavingLoader: true, savingLoaderText: 'Delete Card...' })

                    CardsService.deleteCard(cardId, this.state.ControllerParams)
                        .then(() => {
                            this.setState(prevState => {
                                prevState.cards = prevState.cards.filter(x => x.cardId !== cardId)
                                    .map(card => {
                                        if (card.order > cardOrder)
                                            card.order--;
                                        
                                        return card;
                                    })
                                return { cards: prevState.cards }
                            })
                        }).catch((err) => {
                            console.log(err);
                        }).finally(() => {
                            this.setState({ showSavingLoader: false });
                        })
                }
            })
    }

    toggleCardTitleUpdate = (currentCardTitle, cardId, cardOrder) => {
        this.setState({
          updatingCardTitle: !this.state.updatingCardTitle,
          cardTitle: currentCardTitle,
          currentCardTitle: currentCardTitle,
          updatingCardId: cardId,
          cardOrder: cardOrder
        });
    }

    unToggleCardTitleUpdate = (event) => {
        if (
          this.state.updatingCardId === '' ||
          ((event.target.matches('.card-title') ||
            event.target.matches('.card-title-change-input')) &&
            event.key === undefined)
        ) {
            return;
        }

        if(event.key === 'Escape')
            this.setState({ updatingCardId: '', cardTitle: '' });
        
        if(event.key === 'Enter' || event.key === undefined) {
            this.setState((prevState) => {
                prevState.cardTitle = prevState.cardTitle.trim().replace("\n", "");

                return {
                    cardTitle: prevState.cardTitle
                }
            }, () => {
                if(this.state.cardTitle === this.state.currentCardTitle || this.state.cardTitle === '') {
                    this.setState({ updatingCardId: '', cardTitle: '' });
                    return;
                }
    
                this.updateCardTitle({ 
                    cardId: this.state.updatingCardId,
                    title: this.state.cardTitle,
                    currentTitle: this.state.currentCardTitle,
                    order: this.state.cardOrder
                });
    
                this.setState({ updatingCardId: '', cardTitle: '' });
            })
        }
    }

    updateCardTitle = (cardInfo) => {
        this.setState((prevState) => {
            prevState.showSavingLoader = true
            prevState.cards.find(card => card.cardId === cardInfo.cardId).title = cardInfo.title;
            return {
                cards: prevState.cards,
                showSavingLoader: prevState.showSavingLoader,
                savingLoaderText: 'Updating Card...'
            }
        })

        CardsService.updateCard(cardInfo, this.state.ControllerParams)
            .then(() => {
            }).catch((err) => {
                this.props.cards.find(card => card.cardId === cardInfo.cardId).title = cardInfo.currentTitle;
                Notify.error('Error while saving changes.', 'Refresh and try again.');
                console.log(err);
            }).finally(() => {
                this.setState({ showSavingLoader: false });
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const cards = this.state.cards.map((card) => (
            <CardView
                deleteCard={this.deleteCard}
                key={card.cardId}
                card={card}
                toggleCardTitleUpdate={this.toggleCardTitleUpdate}
                updatingCardTitle={this.state.updatingCardTitle}
                cardTitle={this.state.cardTitle}
                handleChange={this.handleChange}
                updatingCardId={this.state.updatingCardId}
            />
        ));
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
