import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Notify from '../../services/sweetalert-service'
import LoaderView from './../loader/loader-view'

import * as BoardsService from '../../services/boards-service'
import BoardDetailsView from './board-details-view'

class BoardDetails extends Component {
    state = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        board: {},
        loadingBoard: true,
        errorWhileLoadingBoard: false,
        updatingBoardTitle: false,
        boardTitle: '',
        currentBoardTitle: '',
        showSavingLoader: false,
        savingLoaderText: 'Updating title...',
        showMenu: false,
    }

    componentDidMount() {
        this.loadBoard();

        window.addEventListener('click', this.unToggleUpdatingTitle);
        window.addEventListener('keyup', this.unToggleUpdatingTitle);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.unToggleUpdatingTitle);
        window.removeEventListener('keyup', this.unToggleUpdatingTitle);
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

    toggleUpdatingTitle = () => {
        this.setState({
            updatingBoardTitle: !this.state.updatingBoardTitle,
            boardTitle: this.state.board.boardName,
            currentBoardTitle: this.state.board.boardName,
        });
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    deleteBoard = (boardId) => {
        Notify.warning('Are you sure?', 'You won\'t be able to revert this!')
            .then(result => {
                if (result.value) {
                    this.setState({deletingBoard: true});
                    BoardsService.deleteBoard(boardId, this.state.userId)
                        .then(() => {
                            Notify.success('Board has been deleted!', '', false, '', 'center');
                            this.setState({ boardDeleted: true })
                        }).catch((err) => {
                            Notify.error('Error', '', true);
                            console.log(err);
                        });
                }
            })
    }

    unToggleUpdatingTitle = (event) => {
        event.preventDefault();
        if (
            this.state.updatingBoardTitle === false ||
            ((event.target.matches('.board-title') ||
            event.target.matches('.board-title-input')) &&
            event.key === undefined)
            ) {
                return;
            }
            
        if (event.key === 'Escape')
            this.toggleUpdatingTitle();
        
        if (event.key === undefined || event.key === 'Enter') {
            if (this.state.boardTitle === this.state.currentBoardTitle) {
                this.toggleUpdatingTitle();
                return;
            }

            const boardInfo = {
                boardId: this.state.board.boardId, 
                boardName: this.state.boardTitle,
                currentBoardTitle: this.state.board.boardName
            }

            this.setState((prevState) => {
                prevState.board.boardName = boardInfo.boardName;
                prevState.showSavingLoader = true;
                return {
                    board: prevState.board,
                    showSavingLoader: prevState.showSavingLoader,
                    savingLoaderText: 'Updating title...'
                }
            })

            this.toggleUpdatingTitle();

            BoardsService.updateBoard(this.state.userId, boardInfo)
                .then(() => {})
                .catch((err) => {
                    this.setState((prevState) => {
                        prevState.board.boardName = boardInfo.currentBoardTitle;
        
                        return {
                            board: prevState.board
                        }
                    })
                }).finally(() => {
                    this.setState({ showSavingLoader: false })
                });
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        if (this.state.boardDeleted)
            return <Redirect to='/boards' />

        return (
            <div>
                {
                    this.state.showSavingLoader ? (
                        <div>
                            <div className="saving-changes-loader">
                                <LoaderView width={10} height={10} />
                            </div>
                            <div className="saving-changes-loader-text mr-4">
                                {this.state.savingLoaderText}
                            </div>
                        </div>
                    ) : ('')
                }

                <BoardDetailsView
                  board={this.state.board}
                  handleChange={this.handleChange}
                  errorWhileLoadingBoard={this.state.errorWhileLoadingBoard}
                  loadingBoard={this.state.loadingBoard}
                  loadBoard={this.loadBoard}
                  toggleUpdatingTitle={this.toggleUpdatingTitle}
                  updatingBoardTitle={this.state.updatingBoardTitle}
                  boardTitle={this.state.boardTitle}
                  unToggleUpdatingTitle={this.unToggleUpdatingTitle}
                  showMenu={this.state.showMenu}
                  toggleMenu={this.toggleMenu}
                  deleteBoard={this.deleteBoard}
                  boardId={this.state.board.boardId}
                />
            </div>
        );
    }
}

export default BoardDetails;
