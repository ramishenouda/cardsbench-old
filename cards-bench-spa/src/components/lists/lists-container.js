import React, { Component } from 'react'

import LoaderView from './../loader/loader-view'

import Notify from '../../services/sweetalert-service'
import * as ListsService from '../../services/lists-service' 

import ListView, { ListToAdd } from './lists-view';

import './lists-style.css'

class List extends Component {
    state = {
        lists: this.props.lists,
        listToUpdateId: '',
        currentListTitle: '',
        listTitleToUpdate: '',
        listTitle: '',
        addingList: false,
        order: 0,
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

    unToggleListTitleUpdate = (event) => {
        if (
          this.state.listToUpdateId === '' ||
          ((event.target.matches('.list-title') ||
            event.target.matches('.title-change-input')) &&
            event.key === undefined)
        ) {
            return;
        }

        if((event.key === 'Escape') || event.key === undefined)
            this.setState({ listToUpdateId: '' });

        if(event.key === 'Enter') {
            if(this.state.listTitleToUpdate === this.state.currentListTitle) {
                this.setState({ listToUpdateId: '' });
                return;
            }

            this.updateList({ 
                listId: this.state.listToUpdateId,
                title: this.state.listTitleToUpdate,
                currentTitle: this.state.currentListTitle,
                order: this.state.order 
            });
            this.setState({ listToUpdateId: '' });
        }
    }

    toggleChangeTitle = (listId, currentListTitle, order) => {
        this.setState({
            listToUpdateId: listId,
            currentListTitle: currentListTitle,
            listTitleToUpdate: currentListTitle, 
            order: order, 
        });
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

    updateList = (listToUpdate) => {
        this.setState({ showSavingLoader: true })
        this.props.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.title;
        ListsService.updateList(listToUpdate, this.state.listsControllerParams)
            .then((result) => {
                
            }).catch((err) => {
                this.props.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.currentTitle;
                Notify.error('Error while saving changes.', 'Refresh and try again.');
            }).finally(() => {
                this.setState({ showSavingLoader: false })
            })
    }

    render() {
        const lists = this.state.lists.map((list) => (
          <ListView
            key={list.listId}
            listId={list.listId}
            listTitle={list.title}
            listOrder={list.order}
            cards={list.cards}
            deleteList={this.deleteList}
            toggleChangeTitle={this.toggleChangeTitle}
            listTitleToUpdate={this.state.listTitleToUpdate}
            listUpdateId={this.state.listToUpdateId}
            handleChange={this.handleChange}
            showSavingLoader={this.state.showSavingLoader}
          />
        ));

        return (
            <div className="lists-container">
                {
                    this.state.showSavingLoader ? (
                        <div>
                            <div className="lists-saving-changes-loader">
                                <LoaderView width={10} height={10} />
                            </div>
                            <div className="loader-text mr-4">
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
