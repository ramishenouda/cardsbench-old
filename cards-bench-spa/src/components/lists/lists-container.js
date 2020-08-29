import React, { Component } from 'react'

import * as ListsService from '../../services/lists-service' 

import ListView, { ListToAdd } from './lists-view';

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

    changeTitle = () => {
        console.log('Change List Title');
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
        const lists = this.props.lists.map((list) => (
          <ListView
            key={list.listId}
            listTitle={list.title}
            cards={list.cards}
          />
        ));
    
        return (
            <ul className="lists list-group list-group-horizontal">
                { lists }
                <ListToAdd />
            </ul>
        );

    }
}

export default List;
