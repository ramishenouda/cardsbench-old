import React from 'react';

import './boards-style.css'

import Board from './board'
import LoaderView from '../Loader/loader-view'


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

    const boardsToShow = props.boards.map((board) => 
        <Board key={board.boardId} deleteBoard={() => props.deleteBoard(board.boardId)} className='board' boardName={board.boardName} />
    );

    return (
        <div>
            <div className="text-right mt-3 mb-3 mr-5 ">
                {!props.creatingBoard && !props.deletingBoard? <button disabled={props.creatingBoard} onClick={() => props.createBoard()} className="btn btn-square btn-light">New board</button> :
                    ''
                }

                {
                    props.creatingBoard?                     
                    <div >
                        <div className="float-right ml-2">
                            <LoaderView borderWidth={4} width={30} height={30} />
                        </div>
                        <div>
                            <h5>Creating your board...</h5>
                        </div>                    
                    </div> : ''
                }

                {
                    props.deletingBoard?                     
                    <div >
                        <div className="float-right ml-2">
                            <LoaderView borderWidth={4} width={30} height={30} />
                        </div>
                        <div>
                            <h5>Deleting your board...</h5>
                        </div>                    
                    </div> : ''
                }
            </div>
            <div className="boards">
                <div className="container">
                    <div className="row">
                        { boardsToShow }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoardsView
