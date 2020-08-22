import React from 'react';

import './boards-style.css'

import Board from './board-item'
import LoaderView from '../loader/loader-view'


function BoardsView(props) {
    if (props.loadingBoards) {
        return (
            <div>
                <div className="boards-loader">
                    <div className="loader-view pb-5 mb-5 d-flex justify-content-center">
                        <LoaderView width={100} height={100} />
                    </div>
                    <div className="loader-view loader-text mt-5 pt-5 d-flex justify-content-center">
                        <h5>Loading boards...</h5>
                    </div>
                </div>
            </div>
        );
    }

    if (props.errorLoadingBoards) {
        return (
            <div className="container text-center">
                <div className="pt-5 mt-5 pb-5 noboards-text">
                    Error while loading your boards.
                </div>
                <button
                    disabled={props.creatingBoard}
                    onClick={() => props.loadBoards()}
                    className="newboard-button"
                >
                    Click To Try Again.
                </button>
            </div>
        );
    }

    const boardsToShow = props.boards.map((board) => (
        <Board
            className="board"
            goToBoard={props.goToBoard}
            key={board.boardId}
            addUsers={() => props.addUsers(board.boardId)}
            deleteBoard={() => props.deleteBoard(board.boardId)}
            boardName={board.boardName}
            boardId={board.boardId}
        />
    ));

    return (
        <div>
            <div className="boards-view">
                <div className="text-right mt-3 mb-3 mr-5 ">
                    {!props.creatingBoard && !props.deletingBoard && boardsToShow.length > 0 ? (
                        <button
                            disabled={props.creatingBoard}
                            onClick={() => props.toggleCreatingBoardWindow()}
                            className="newboard-button"
                        >
                            New board
                        </button>
                    ) : (''
                    )}

                    {props.creatingBoard ? (
                            <div>
                                <div className="float-right ml-2">
                                    <LoaderView borderWidth={4} width={30} height={30} />
                                </div>
                                <div>
                                    <h5>Creating your board...</h5>
                                </div>
                            </div>
                        ) : ('')
                    }

                    {props.deletingBoard ? (
                        <div>
                          <div className="float-right ml-2">
                            <LoaderView borderWidth={4} width={30} height={30} />
                          </div>
                          <div>
                            <h5>Deleting your board...</h5>
                          </div>
                        </div>
                    ) : (''
                    )}
                </div>
                <div className="boards">
                    {boardsToShow.length > 0 ? (
                        <div className="container">
                            <div className="row"> { boardsToShow } </div>
                        </div>
                    ) : (
                        <div className="container text-center">
                            <div className="pt-5 mt-5 pb-5 noboards-text">
                                No boards to show. start creating by clicking on new board.
                            </div>
                            <button
                                disabled={props.creatingBoard}
                                onClick={() => props.toggleCreatingBoardWindow()}
                                className="newboard-button"
                            >
                                New board
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {props.toggleCreatingBoard === true ? (
                <div className="text-center create-board-window">
                    <div>
                        <input type="text" name="boardName" onChange={props.handleChange} placeholder="Board Name" />
                    </div>
                    <div>
                        <button className="newboard-button mt-2 mr-1" onClick={() => props.createBoard()}> Create </button>
                        <button className="newboard-button mt-2" onClick={() => props.toggleCreatingBoardWindow()} > Cancel </button>
                    </div>
                </div>
            ) : (''
            )}
      </div>
    );
}

export default BoardsView
