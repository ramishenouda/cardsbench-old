import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Notify from '../../services/sweetalert-service'

import * as BoardsService from '../../services/boards-service'
import BoardsView from './boards-view'

class Boards extends Component {
    state = {
        boardInfo: {
            boardName: 'test',
            usersToAdd: '',
        },
        userId: this.props.loggedIn === true ? JSON.parse(localStorage.getItem('user')).id : '',
        boards: {},
        loadingBoards: true,
        errorLoadingBoards: false,
        creatingBoard: false,
        deletingBoard: false
    }

    componentDidMount() {
        if (!this.props.loggedIn) {
            return;
        }

        BoardsService.getUserBoards(this.state.userId)
            .then((result) => {
                this.setState({boards: result.data.boards})
            }).catch((err) => {
                this.setState({errorLoadingBoards: true})
                console.log(err);
            }).finally(() => {
                this.setState({loadingBoards: false});
            })
    }

    createBoard = (questions) => {
        const info = questions !== undefined ? [[questions]] :
        [[
            'Board name:'
        ],
        [
            'Add users?',
            'boyer@g.com, rami@ol.com',
            'Create'
        ]]
        
        const progressSteps = info.length === 1 ? ['1'] : ['1', '2'];

        Notify.mixin(info, progressSteps)
            .then(result => {
                if(result.value === undefined)
                    return;

                if (result.value[0] === '') {
                    this.createBoard('Board name cannot be empty.');
                    this.setState({boardInfo: 
                        {
                            usersToAdd: result.value[1],
                            boardName: ''
                        }
                    });
                    return;
                } 
                
                else if (result.value[0] !== '') {
                    this.setState({boardInfo: { usersToAdd: result.value[1], boardName: result.value[0] },
                        creatingBoard: true
                    }, () => {
                        BoardsService.createBoard(this.state.boardInfo, this.state.userId)
                            .then((result) => {
                                this.setState(prevState => {
                                    prevState.boards.push(result.data.board);
                                    return {
                                        boards: prevState.boards,
                                        creatingBoard: false
                                    }
                                })

                                Notify.success('Board has been created', '', false);
                            }).catch((err) => {
                                console.log(err);
                            });
                    });
                }
        })
    }

    deleteBoard = (boardId) => {
        Notify.warning('Are you sure?', 'You won\'t be able to revert this!')
            .then(result => {
                if (result.value) {
                    this.setState({deletingBoard: true});
                    BoardsService.deleteBoard(boardId, this.state.userId)
                        .then(() => {
                            this.setState(prevState => {
                                prevState.boards = prevState.boards.filter((board) => board.boardId !== boardId);
                                return {
                                    board: prevState.boards,
                                    deletingBoard: false
                                };
                            }, () => {
                                Notify.success('Board has been deleted!', '', false, '', 'center');
                            })
                        }).catch((err) => {
                            Notify.error('Error', '', true);
                            console.log(err);
                        });
                }
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    
    render() {
        if (this.props.loggedIn === false) {
            return <Redirect to={{
                pathname: '/error',
                state: {text: 'Login First', code:'401'}
            }} />
        }

        if (this.state.errorLoadingBoards) {
            return <div> Error </div>
        }

        return (
          <BoardsView
            className="boards"
            createBoard={this.createBoard}
            deleteBoard={this.deleteBoard}
            boards={this.state.boards}
            loadingBoards={this.state.loadingBoards}
            creatingBoard={this.state.creatingBoard}
            deletingBoard={this.state.deletingBoard}
          />
        );
    }
}

export default Boards
