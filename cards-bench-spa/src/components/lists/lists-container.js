import React, { Component } from 'react'

import LoaderView from './../loader/loader-view'
import Notify from '../../services/sweetalert-service'

import * as ListsService from '../../services/lists-service' 
import ListView, { ListToAdd } from './lists-view';


class List extends Component {
    state = {
        lists: this.props.lists,
        listToUpdateId: '',
        currentListTitle: '',
        listTitleToUpdate: '',
        listTitle: '',
        addingList: false,
        order: 0,
        newListOrder: 0,
        previousListOrder: 0,
        changingOrder: false,
        showSavingLoader: false,
        listsControllerParams: {
            userId: JSON.parse(localStorage.getItem('user')).id,
            boardId: this.props.boardId
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.unToggleListTitleUpdate);
        window.addEventListener('keyup', this.unToggleListTitleUpdate);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.unToggleListTitleUpdate);
        window.removeEventListener('keyup', this.unToggleListTitleUpdate);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggleListAddition = () => {
        this.setState({ addingList: !this.state.addingList });
    }

    toggleChangeTitle = (listId, currentListTitle, order) => {
        this.setState({
            listToUpdateId: listId,
            currentListTitle: currentListTitle,
            listTitleToUpdate: currentListTitle, 
            order: order,
        });
    }

    unToggleListTitleUpdate = (event) => {
        if (
          this.state.listToUpdateId === '' ||
          ((event.target.matches('.list-title') ||
            event.target.matches('.title-change-input')) &&
            event.key === undefined) || this.state.changingOrder
        ) {
            return;
        }

        if(event.key === 'Escape' || event.key === undefined)
            this.setState({ listToUpdateId: '', listTitleToUpdate: '' });

        if(event.key === 'Enter') {
            if(this.state.listTitleToUpdate === this.state.currentListTitle) {
                this.setState({ listToUpdateId: '', listTitleToUpdate: '' });
                return;
            }

            this.updateListTitle({ 
                listId: this.state.listToUpdateId,
                title: this.state.listTitleToUpdate,
                currentTitle: this.state.currentListTitle,
                order: this.state.order 
            });

            this.setState({ listToUpdateId: '', listTitleToUpdate: '' });
        }
    }

    toggleChangeOrder = (listId, listOrder, listTitle) => {
        const changingOrder = listId === (undefined || '') ? false : true;

        // Initial value for the newListOrder, just in case if the user clicked ok without choosing an order value.
        const newListOrder = listOrder === 0 ? 2 : 1;

        this.setState({
          listToUpdateId: listId,
          changingOrder: changingOrder,
          previousListOrder: listOrder,
          newListOrder: newListOrder,
          listTitleToUpdate: listTitle,
        });
    }

    changeListOrder = () => {
        this.updateListOrder({ 
            listId: this.state.listToUpdateId,
            title: this.state.listTitleToUpdate,
            newListOrder: this.state.newListOrder,
            currentListOrder: this.state.previousListOrder,
            order: this.state.newListOrder
        });

        this.toggleChangeOrder();
    }

    addList = (event) => {
        event.preventDefault();

        if (this.state.listTitle === '')
            return;
        
        this.setState({ showSavingLoader: true });

        ListsService.addList(this.state.listTitle, this.state.listsControllerParams)
            .then((result) => {
                this.setState(prevState => { 
                    prevState.lists.push(result.data.list);  
                    return { lists: prevState.lists }
                });
            }).catch((err) => {
                Notify.error('Error while adding the list.', 'Try refreshing the page.');
                console.log(err);
            }).finally(() => {
                this.setState({ showSavingLoader: false })
                this.setState({ listTitle: '' })
            })
    }

    deleteList = (listId, listOrder) => {
        if (listId === null)
            return;
        
        Notify.warning('Are you sure?', 'You won\'t be able to revert this!')
            .then(result => {
                if (result.value) {
                    this.setState({ showSavingLoader: true })

                    ListsService.deleteList(listId, this.state.listsControllerParams)
                        .then(() => {
                            this.setState(prevState => {
                                prevState.lists = prevState.lists.filter(x => x.listId !== listId)
                                    .map(list => {
                                        if (list.order > listOrder)
                                            list.order--;
                                        
                                        return list;
                                    })
                                return { lists: prevState.lists }
                            })
                        }).catch((err) => {
                            console.log(err);
                        }).finally(() => {
                            this.setState({ showSavingLoader: false });
                        })
                }
            })
    }

    updateListTitle = (listToUpdate) => {
        this.setState((prevState) => { 
            prevState.showSavingLoader = true
            prevState.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.title;

            return prevState
        })

        ListsService.updateList(listToUpdate, this.state.listsControllerParams)
            .then(() => {
            }).catch((err) => {
                this.props.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.currentTitle;
                Notify.error('Error while saving changes.', 'Refresh and try again.');
            }).finally(() => {
                this.setState({ showSavingLoader: false });
            })
    }

    modifyListsOrder = (currentOrder, newListOrder) => {
        this.setState((prevState) => { 
            prevState.lists = prevState.lists.map(list => {
                if (list.order <= newListOrder && list.order > currentOrder)
                    list.order--;
                else if (list.order >= newListOrder && list.order < currentOrder)
                    list.order++;
                
                return list;
            })
            
            prevState.lists[currentOrder].order = newListOrder;

            return {
                lists: prevState.lists,
                showSavingLoader: prevState.showSavingLoader
            };
        }, () => {
            this.setState((prevState) => {
                prevState.lists.sort((a, b) => a.order - b.order);
                return {
                    lists: prevState.lists
                }
            })
        })
    }

    updateListOrder = (listToUpdate) => {
        listToUpdate.newListOrder -= 1;
        listToUpdate.order -= 1;

        this.setState({ showSavingLoader: true });
        this.modifyListsOrder(listToUpdate.currentListOrder, listToUpdate.newListOrder)

        ListsService.updateList(listToUpdate, this.state.listsControllerParams)
            .then(() => {
            }).catch((err) => {
                this.modifyListsOrder(listToUpdate.newListOrder, listToUpdate.currentListOrder)
                Notify.error('Error while saving changes.', 'Refresh and try again.');
            }).finally(() => {
                this.setState({ showSavingLoader: false })
            })
    }

    render() {
        const lists = this.state.lists.map((list) => (
          <ListView
            key={list.listId}
            listParams={this.state.listsControllerParams}
            listId={list.listId}
            listTitle={list.title}
            listOrder={list.order}
            changingOrder={this.state.changingOrder}
            cards={list.cards}
            deleteList={this.deleteList}
            toggleChangeTitle={this.toggleChangeTitle}
            listTitleToUpdate={this.state.listTitleToUpdate}
            listToUpdateId={this.state.listToUpdateId}
            toggleChangeOrder={this.toggleChangeOrder}
            changeListOrder={this.changeListOrder}
            handleChange={this.handleChange}
            showSavingLoader={this.state.showSavingLoader}
            numberOfLists={this.state.lists.length}
          />
        ));

        return (
            <div className="lists-container">
                {
                    this.state.showSavingLoader ? (
                        <div>
                            <div className="saving-changes-loader">
                                <LoaderView width={10} height={10} />
                            </div>
                            <div className="saving-changes-loader-text mr-4">
                                Saving Changes...
                            </div>
                        </div>
                    ) : ('')
                }
                <ul className="lists list-group list-group-horizontal">
                    { lists }
                    <ListToAdd
                    toggleListAddition={this.toggleListAddition} // toggles the adding list property
                    addingList={this.state.addingList} // used to trigger the adding list menu
                    listTitle={this.state.listTitle}
                    addList={this.addList}
                    handleChange={this.handleChange}
                    />
                </ul>
            </div>
        );

    }
}

export default List;
