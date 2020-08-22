import React, { Component } from 'react'

import * as BoardsService from '../../services/boards-service'
import BoardDetailsView from './board-details-view'


class BoardDetails extends Component {
    state = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        board: {},
        loadingBoard: true,
        errorWhileLoadingBoard: false
    }

    componentDidMount() {
        this.loadBoard();
    }

    loadBoard = () => {
        const boardId = window.location.pathname.slice(8, 16);
        this.setState({loadingBoard: true, errorWhileLoadingBoard: false});

        const lists = [
            {
                id: 0,
                title: "Todo",
                cards: [{title: "take out the trash", id: 0}, {title: "feed potato", id: 1}, {title:'hello there', id: 2}]
            },
            {
                id: 1,
                title: "On Progress",
                cards: [{title: "take out the trash", id: 0}, {title: "feed potato", id: 1}]
            },
            {
                id: 2,
                title: "On Progress",
                cards: [{title: "take out the trash", id: 0}, {title: "feed potato", id: 1}]
            },
        ]

        BoardsService.getBoard(this.state.userId, boardId)
            .then((result) => {
                result.data.board.lists = lists;
                this.setState({board: result.data.board, errorWhileLoadingBoard: false})
            }).catch((err) => {
                this.setState({errorWhileLoadingBoard: true})
            }).finally(() => {
                this.setState({loadingBoard: false});
            });
    }

    render() {
        return (
          <BoardDetailsView
            board={this.state.board}
            errorWhileLoadingBoard={this.state.errorWhileLoadingBoard}
            loadingBoard={this.state.loadingBoard}
            loadBoard={this.loadBoard}
          />
        );
    }
}

export default BoardDetails;
