import React from 'react';

function Board(props) {
    return (
        <div className="col-12 col-sm-4 col-md-6 col-lg-4 mb-2">
            <div className="card">
                <div className="card-img-wrapper">
                    <img className="card-img-top card-img" alt={props.boardName + 'board'} src="https://i.pinimg.com/564x/6f/d6/8c/6fd68ced202b643053e9f281de52a016.jpg"/>
                    <div className="card-content d-flex justify-content-between">
                        <div className="card-title pt-1"> { props.boardName } </div>
                    </div>
                    <ul className="list-inline board-options animate text-center">
                        <li className="list-inline-item">
                            <button onClick={props.deleteBoard} className="btn">DELETE</button>
                        </li>
                        <li className="list-inline-item">
                            <button onClick={props.boardSettings} className="btn">SETTING</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Board
