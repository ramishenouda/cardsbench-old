import React, { Component } from 'react'

import * as BoardsService from '../../services/boards-service'
import BoardDetailsView from './board-details-view'

class BoardDetails extends Component {
    state = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        board: {},
        loadingBoard: true,
        errorWhileLoadingBoard: false,
    }

    componentDidMount() {
        this.loadBoard();
    }

    loadBoard = () => {
        const boardId = window.location.pathname.slice(8, 16);
        this.setState({ loadingBoard: true, errorWhileLoadingBoard: false });

        BoardsService.getBoard(this.state.userId, boardId)
            .then((result) => {
                this.setState({board: result.data.board, errorWhileLoadingBoard: false}, () => {
                    this.setState((prevState) => {
                        prevState.board.lists.sort((a, b) => a.order - b.order);
                        return { board: prevState.board }
                    })
                })
            }).catch((err) => {
                this.setState({errorWhileLoadingBoard: true})
                console.log(err);
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
