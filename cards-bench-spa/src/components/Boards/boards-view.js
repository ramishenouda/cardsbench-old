import React from 'react';

import ErrorPage from '../error-page/error-page-view';
import LoaderView from '../loader/loader-view'
import PopUpBox from '../pop-up-box/pop-up-box-container';

import Board from './board-item'
import './boards-style.css'

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
        return <ErrorPage code={"500"} text={"Error while loading your boards."} buttonHTML = {
            <button onClick={() => props.loadBoards()} className="error-page-button">CLICK TO TRY AGAIN</button>
        } />
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

    const PopUpBoxHTML = (
        <div className="mt-3">
            <h3 style={{color: '#1c1e21'}} >
                Board Title
            </h3>
            <center>
                <div className="mb-2">
                    <input type="text" autoFocus="on" 
                        onChange={props.handleChange}  
                        name="boardName" 
                        className="form-control" 
                        placeholder="Board Title"
                        style={{ width: window.innerWidth > 767 ? '300px' : ''}}
                        value={props.boardname}
                        autoComplete="off"
                    />
                </div>
            </center>
        </div>
    );

    const popUpBoxStyle = {
        verticalAlign: 'middle',
        background: 'rgba(255, 255, 255, 0.8)',
        width: window.innerWidth > 767 ? '600px' : '',
        height: '200px',
        top: '35%',
        position:'fixed'
    }

    return (
        <div>
            <div className="boards-view">
                <div className="text-right mt-3 mb-3 mr-5 ">
                    {!props.creatingBoard && !props.deletingBoard && boardsToShow.length > 0 ? (
                        <button
                            disabled={props.creatingBoard}
                            onClick={() => props.toggleCreatingBoardWindow()}
                            className="button button-purple"
                        >
                            NEW BOARD
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
                    {boardsToShow.length > 0 || props.creatingBoard ? (
                        <div className="container">
                            <div className="row"> { boardsToShow } </div>
                        </div>
                    ) : (
                        <div className="container text-center">
                            <div className="pt-5 mt-5 pb-5 noboards-text">
                                NO BOARDS TO SHOW. START BY CLICKING ON NEW BOARD.
                            </div>
                            <button
                                disabled={props.creatingBoard}
                                onClick={() => props.toggleCreatingBoardWindow()}
                                className="button button-purple"
                            >
                                NEW BOARD
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {
                props.toggleCreatingBoard === true ? (
                    <div>
                        <PopUpBox
                            style={popUpBoxStyle} 
                            popUpBoxContent={PopUpBoxHTML}
                            cancelButtonFunction={props.toggleCreatingBoardWindow} 
                            confirmButtonFunction={props.createBoard}
                            disableConfirmButton={props.boardName.length < 1}
                        />
                    </div>
                ) : ('')
            }
      </div>
    );
}

export default BoardsView
