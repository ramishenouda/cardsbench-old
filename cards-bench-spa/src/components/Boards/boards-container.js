import React, { Component } from 'react';

import Notify from '../../services/sweetalert-service'

import * as BoardsService from '../../services/boards-service'
import BoardsView from './boards-view'

class Boards extends Component {
    state = {
        boardName: '',
        usersToAdd: '',
        userId: JSON.parse(localStorage.getItem('user')).id,
        boards: {},
        loadingBoards: true,
        errorLoadingBoards: false,
        creatingBoard: false,
        deletingBoard: false,
        toggleCreatingBoard: false
    }

    componentDidMount() {
        this.loadBoards();
    }

    loadBoards = () => {
        this.setState({loadingBoards: true});

        BoardsService.getUserBoards(this.state.userId)
            .then((result) => {
                this.setState({boards: result.data.boards})
                this.setState({errorLoadingBoards: false})
            }).catch((err) => {
                this.setState({errorLoadingBoards: true})
                console.log(err);
            }).finally(() => {
                this.setState({loadingBoards: false});
            })
    }

    toggleCreatingBoardWindow = () => {
        this.setState({toggleCreatingBoard: !this.state.toggleCreatingBoard})
    }

    createBoard = (e) => {
        e.preventDefault();

        const boardInfo = {
            boardName: this.state.boardName
        }

        if (boardInfo.boardName === '') {
            Notify.info('Board name can not be empty.');
            return;
        }

        this.setState({creatingBoard: true})
        this.toggleCreatingBoardWindow();

        BoardsService.createBoard(boardInfo, this.state.userId)
            .then((result) => {
                this.setState(prevState => {
                    prevState.boards.splice(0, 0, result.data.board);
                    return {
                        boards: prevState.boards,
                        creatingBoard: false
                    }
                })
                Notify.success('Board has been created', '', false);
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                this.setState({creatingBoard: false})
            });
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    
    render() {
        return (
          <BoardsView
            className="boards"
            handleChange={this.handleChange}
            createBoard={this.createBoard}
            deleteBoard={this.deleteBoard}
            boards={this.state.boards}
            loadingBoards={this.state.loadingBoards}
            creatingBoard={this.state.creatingBoard}
            deletingBoard={this.state.deletingBoard}
            errorLoadingBoards={this.state.errorLoadingBoards}
            toggleCreatingBoard={this.state.toggleCreatingBoard}
            toggleCreatingBoardWindow={this.toggleCreatingBoardWindow}
            loadBoards={this.loadBoards}
            boardName={this.state.boardName}
          />
        );
    }
}

export default Boards
