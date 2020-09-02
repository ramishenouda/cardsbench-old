import React, { Component } from 'react'


import Notify from '../../services/sweetalert-service'
import * as ListsService from '../../services/lists-service' 

import ListView, { ListToAdd } from './lists-view';

class List extends Component {
    state = {
        listToUpdateId: '',
        currentListTitle: '',
        listTitleToUpdate: '',
        listTitle: '',
        addingList: false,
        order: 0,
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
        if(this.state.listToUpdateId === '' || event.target.matches('.list-title'))
            return;
        
        if((event.key === 'Escape') || event.key === undefined)
            this.setState({ listToUpdateId: '' });

        if(event.key === 'Enter') {
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
        
        this.props.sendListToParent('', 'SHOW-THE-LOADING-BAR');

        ListsService.addList(this.state.listTitle, this.state.listsControllerParams)
            .then((result) => {
                this.props.sendListToParent(result.data.list);
            }).catch((err) => {
                this.props.sendListToParent('', 'ERROR-LIST-ADDITION');
                console.log(err);
            }).finally(() => {
                this.setState({ listTitle: '' })
            })
    }

    deleteList = (listId, listOrder) => {
        if (listId === null)
            return;
        
        Notify.warning('Are you sure?', 'You won\'t be able to revert this!')
            .then(result => {
                if (result.value) {
                    this.props.sendListToParent('', 'SHOW-THE-LOADING-BAR');

                    ListsService.deleteList(listId, this.state.listsControllerParams)
                        .then((result) => {
                            this.props.sendListToParent({
                                listId: listId,
                                listOrder: listOrder
                            }, 'DELETE-LIST');
                        }).catch((err) => {
                            this.props.sendListToParent('', 'ERROR-LIST-ADDITION');
                            console.log(err);
                        })
                }
            })
    }

    updateList = (listToUpdate) => {
        this.props.sendListToParent('', 'SHOW-THE-LOADING-BAR');
        this.props.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.title;
        ListsService.updateList(listToUpdate, this.state.listsControllerParams)
            .then((result) => {
                
            }).catch((err) => {
                this.props.lists.find(l => l.listId === listToUpdate.listId).title = listToUpdate.currentTitle;
                Notify.error('Error while saving changes.', 'Refresh and try again.');
            }).finally(() => {
                this.props.sendListToParent('');
            })
    }

    render() {
        const lists = this.props.lists.map((list) => (
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
          />
        ));

        return (
          <ul className="lists list-group list-group-horizontal">
            { lists }
            <ListToAdd
              toggleListAddition={this.toggleListAddition} // toggles the adding list property
              addingList={this.state.addingList} // used to trigger the adding list menu
              listTitle={this.state.listTitle}
              addList={this.addList}
              handleChange={this.handleChange}
              sendListToParent={this.props.sendListToParent}
            />
          </ul>
        );

    }
}

export default List;
