import React, { Component } from 'react'

import * as ListsService from '../../services/lists-service' 

import ListView, { ListToAdd } from './lists-view';

class List extends Component {
    state = {
        listTitle: '',
        addingList: false,
        listsControllerParams: {
            userId: JSON.parse(localStorage.getItem('user')).id,
            boardId: this.props.boardId
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggleListAddition = () => {
        this.setState({ addingList: !this.state.addingList });
    }

    changeTitle = () => {
        console.log('Change List Title');
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
