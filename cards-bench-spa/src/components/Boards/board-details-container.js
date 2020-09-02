import React, { Component } from 'react'

import * as BoardsService from '../../services/boards-service'
import BoardDetailsView from './board-details-view'
import Notify from '../../services/sweetalert-service';

class BoardDetails extends Component {
    state = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        board: {},
        loadingBoard: true,
        errorWhileLoadingBoard: false,
        showSavingLoader: false,
        savingLoaderText: 'Saving Changes'
    }

    componentDidMount() {
        this.loadBoard();
    }

    getItemFromChild(list, options) {
        if (options === 'SHOW-THE-LOADING-BAR') {
            this.setState({ showSavingLoader: true })
            return;
        } else if (options === 'ERROR-LIST-ADDITION') {
            Notify.error('Error adding the list.', 'Refresh the page and try again.');
            this.setState({ showSavingLoader: false });
            return;
        }

        if (list.listId !== '' && options === 'DELETE-LIST') {
            this.setState(prevState => {
                prevState.board.lists = prevState.board.lists.filter(x => x.listId !== list.listId)
                    .map(l => {
                        if (l.order > list.listOrder)
                            l.order--;
                        
                        return l;
                    })
                return { board: prevState.board, showSavingLoader: false }
            })
        } else if (list !== '') {
            this.setState(prevState => { 
                prevState.board.lists.push(list);  
                return { board: prevState.board, showSavingLoader: false }
            });
        } else {
            this.setState({ showSavingLoader: false });
        }
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
            sendListToParent={this.getItemFromChild.bind(this)}
            showSavingLoader={this.state.showSavingLoader}
            savingLoaderText={this.state.savingLoaderText}
          />
        );
    }
}

export default BoardDetails;
