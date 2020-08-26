import React from 'react'

import LoaderView from './../loader/loader-view'
import ErrorPage from '../error-page/error-page-view';

import './board-details-style.css';
import List from '../lists/lists-container';

function BoardDetails(props) {
    if (props.loadingBoard) {
        return (
            <div>
                <div className="boards-loader">
                    <div className="loader-view pb-5 mb-5 d-flex justify-content-center">
                        <LoaderView width={100} height={100} />
                    </div>
                    <div className="loader-view loader-text mt-5 pt-5 d-flex justify-content-center">
                        <h5>Loading board...</h5>
                    </div>
                </div>
            </div>
        );
    }

    if(props.errorWhileLoadingBoard) {
        return <ErrorPage code={"500"} text={"Error while loading the board."} buttonHTML = {
            <button onClick={() => props.loadBoard()} className="error-page-button">TRY AGAIN</button>
        } />
    }

    const lists = props.board.lists.map(list => <List key={list.id} list={list} />)

    return (
        <div className="board-details mt-2">
            <div className="container text-right">
                <button
                    onClick={() => props.addList()}
                    className="newboard-button"
                >
                    Add List
                </button>
            </div>
            <div className="container">
                <div className="board-head">
                    <span className="board-title">{ props.board.boardName } </span>
                </div>
                <div className="board-contents">
                    <ul className="list-group list-group-horizontal">
                        { lists }
                        {props.creatingList ? (
                            <li className="list-group-item ml-2">
                                <h4>hello </h4>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        hey
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            ''
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BoardDetails;
