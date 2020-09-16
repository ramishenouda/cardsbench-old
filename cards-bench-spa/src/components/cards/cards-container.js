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
        updatingCardTitle: false,
        showSavingLoader: false,
        savingLoaderText: 'Saving Changes...',
        cardOrder: 0,
        newCardOrder: 0,
        changingOrder: false,
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

        window.addEventListener('click', this.cancelAddingCard);
        window.addEventListener('keyup', this.cancelAddingCard);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.unToggleCardTitleUpdate);
        window.removeEventListener('keyup', this.unToggleCardTitleUpdate);

        window.removeEventListener('click', this.cancelAddingCard);
        window.removeEventListener('keyup', this.cancelAddingCard);
    }

    toggleAddingCard = () => {
        setTimeout(() => {
            this.setState({
              addingCard: !this.state.addingCard,
              changingOrder: false,
              updatingCardId: '',
              updateCardTitle: false,
              cardTitle: '',
            });
        }, 50);
    }

    addCard = (event) => {
        event.preventDefault();
        
        if (this.state.cardTitle === '')
            return;
        
        this.setState({ showSavingLoader: true, savingLoaderText: 'Adding Card...', cardTitle: '' })

        CardsService.addCard(this.state.cardTitle, this.state.ControllerParams)
            .then((result) => {
                this.props.addCardToList(result.data);
                this.setState(prevState => {
                    prevState.cards.push(result.data)
                    return {cards: prevState.cards}
                })
            }).catch((err) => {
                Notify.error('Error while adding the card.', 'Try refreshing the page.');
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
                    this.setState({ showSavingLoader: true, savingLoaderText: 'Deleting Card...' })

                    CardsService.deleteCard(cardId, this.state.ControllerParams)
                        .then(() => {
                            this.props.removeCardFromList(cardId);
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
          cardTitle: currentCardTitle,
          currentCardTitle: currentCardTitle,
          updatingCardId: cardId,
          cardOrder: cardOrder,
          updatingCardTitle: true,
          addingCard: false,
          changingOrder: false
        });
    }

    cancelAddingCard = (event) => {
        if (!this.state.addingCard)
            return;

        if (event.key === 'Escape')
            this.setState({ addingCard: false })

        if(event.target.matches('.add-card-menu') || event.target.matches('.add-button') 
            || event.target.matches('.card-input-text')
        ) {
            return;
        }

        this.setState({ addingCard: false })
    }

    unToggleCardTitleUpdate = (event) => {
        if (
          this.state.updatingCardId === '' ||
          ((event.target.matches('.card-title') ||
            event.target.matches('.card-title-change-input')) &&
            event.key === undefined) || this.state.changingOrder || this.state.addingCard || !this.state.updatingCardTitle
        ) {
            return;
        }
        
        if(event.key === 'Escape')
            this.setState({ updatingCardId: '', cardTitle: '', updatingCardTitle: false });
        
        if(event.key === 'Enter' || event.key === undefined) {
            this.setState((prevState) => {
                prevState.cardTitle = prevState.cardTitle.trim().replace("\n", "");

                return {
                    cardTitle: prevState.cardTitle
                }
            }, () => {
                if(this.state.cardTitle === this.state.currentCardTitle || this.state.cardTitle === '') {
                    this.setState({ updatingCardId: '', cardTitle: '', updatingCardTitle: false });
                    return;
                }
    
                this.updateCardTitle({ 
                    cardId: this.state.updatingCardId,
                    title: this.state.cardTitle,
                    currentTitle: this.state.currentCardTitle,
                    order: this.state.cardOrder
                });
    
                this.setState({ updatingCardId: '', cardTitle: '', updatingCardTitle: false });
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

    toggleMoving = (cardId, cardOrder, cardTitle) => {
        const changingOrder = cardId === (undefined || '') ? false : true;
        
        // Initial value, just in case if the user clicked ok without choosing an order value.
        const newCardOrder = cardOrder === 0 ? 2 : 1;

        this.setState({
          updatingCardId: cardId,
          cardOrder: cardOrder,
          changingOrder: changingOrder,
          newCardOrder: newCardOrder,
          cardTitle: cardTitle,
          addingCard: false,
        });
    }

    moveCard = () => {
        const newCardOrder = this.state.newCardOrder - 1;

        if (newCardOrder === this.state.cardOrder)
            return;

        const cardInfo = {
            cardId: this.state.updatingCardId,
            title: this.state.cardTitle,
            newCardOrder: this.state.newCardOrder,
            currentCardOrder: this.state.cardOrder,
            order: this.state.newCardOrder
        }

        cardInfo.newCardOrder -= 1;
        cardInfo.order -= 1;

        this.setState({ showSavingLoader: true, savingLoaderText: 'Moving Card...' });
        this.modifyCardsOrder(cardInfo.currentCardOrder, cardInfo.newCardOrder)

        CardsService.updateCard(cardInfo, this.state.ControllerParams)
            .then(() => {
            }).catch((err) => {
                this.modifyCardsOrder(cardInfo.newCardOrder, cardInfo.currentCardOrder)
                Notify.error('Error while moving the card.', 'Refresh and try again.');
            }).finally(() => {
                this.setState({ showSavingLoader: false })
            })

        this.toggleMoving();
    }

    modifyCardsOrder = (currentOrder, newCardOrder) => {
        this.setState((prevState) => {
            prevState.cards = prevState.cards.map(card => {
                if (card.order <= newCardOrder && card.order > currentOrder)
                    card.order--;
                else if (card.order >= newCardOrder && card.order < currentOrder)
                    card.order++;
                
                return card;
            })
            
            prevState.cards[currentOrder].order = newCardOrder;

            return {
                cards: prevState.cards,
            };
        }, () => {
            this.setState((prevState) => {
                prevState.cards.sort((a, b) => a.order - b.order);
                return {
                    cards: prevState.cards
                }
            })
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        let options = [];
        for (let index = 0; index < this.state.cards.length; index++) {
            const option = <option key={index}> { index + 1 } </option>
            options.push(option);
        }

        const cards = this.state.cards.map((card) => (
            <CardView
                deleteCard={this.deleteCard}
                key={card.cardId}
                card={card}
                toggleCardTitleUpdate={this.toggleCardTitleUpdate}
                cardTitle={this.state.cardTitle}
                handleChange={this.handleChange}
                updatingCardId={this.state.updatingCardId}
                toggleMoving={this.toggleMoving}
                moveCard={this.moveCard}
                changingOrder={this.state.changingOrder}
                options={options}
                addingCard={this.state.addingCard}
            />
        ));
    
        return (
            <>
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
                    {
                        cards.length > 0 ? (
                            <div className="cards-container" >
                                { cards }
                            </div>
                        ) : ('')
                    }
                </div>
                <AddCardView
                    handleChange={this.handleChange}
                    toggleAddingCard={this.toggleAddingCard}
                    addingCard={this.state.addingCard}
                    addCard={this.addCard}
                    cardTitle={this.state.cardTitle}
                />
            </>

        );
    }
}

export default Card;
