import React, { Component } from 'react'

import List from '../lists/lists-container'

import * as BoardsService from '../../services/boards-service'
import BoardDetailsView from './board-details-view'

class BoardDetails extends Component {
    state = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        board: {},
        loadingBoard: true,
        errorWhileLoadingBoard: false,
        addingList: false,
    }

    componentDidMount() {
        this.loadBoard();
    }

    toggleListCreation = () => {
        this.setState({addingList: !this.state.addingList});
    }

    sendListToParent(list) {
        if(list === 'LISTS-CONTAINER-TO-BOARDS-CONTAINER-:-SHOW-THE-LOADING-BAR-HEHE-@LUFFY') {
            console.log('show the loading bar');
            return;
        }

        else if(list === 'LISTS-CONTAINER-TO-BOARDS-CONTAINER-:-DISABLE-THE-LOADING-BAR-HEHE-@LUFFY') {
            console.log('disable the loading bar');
            return;
        }

        this.setState(prevState => { 
            prevState.board.lists.push(list);  
            return {board: prevState.board}
        });
    }

    loadBoard = () => {
        const boardId = window.location.pathname.slice(8, 16);
        this.setState({loadingBoard: true, errorWhileLoadingBoard: false});

        BoardsService.getBoard(this.state.userId, boardId)
            .then((result) => {
                this.setState({board: result.data.board, errorWhileLoadingBoard: false})
            }).catch((err) => {
                this.setState({errorWhileLoadingBoard: true})
                console.log(err);
            }).finally(() => {
                this.setState({loadingBoard: false});
            });
    }

    render() {
        let lists;
        if(!this.state.loadingBoard && !this.state.errorWhileLoadingBoard)
            lists = this.state.board.lists.map(list => <List key={list.listId} listToAdd={false} list={list} />)
        return (
          <BoardDetailsView
            board={this.state.board}
            errorWhileLoadingBoard={this.state.errorWhileLoadingBoard}
            loadingBoard={this.state.loadingBoard}
            loadBoard={this.loadBoard}
            toggleListCreation={this.toggleListCreation}
            addingList={this.state.addingList}
            sendListToParent={this.sendListToParent.bind(this)}
            lists={lists}
            boardId={this.state.board.boardId}
          />
        );
    }
}

export default BoardDetails;
