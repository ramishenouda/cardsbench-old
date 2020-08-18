import React from 'react';

function Board(props) {

    return (
        <div className="col-12 col-sm-4 col-md-6 col-lg-4 mb-2">
            <div className="card">
                <div className="card-image">
                    <img className="img-responsive" alt={props.boardName + 'board'} width = "100%" src="https://materializecss.com/images/office.jpg"/>
                </div>
                <div className="card-content d-flex justify-content-between">
                    <div className="card-title pt-1"> { props.boardName } </div>
                    <div className="settings-icon dropbtn dropdown pr-2 pt-2">
                        <div className="dropdown-content">
                            <button className="btn">Add Users</button>
                            <button onClick={props.deleteBoard} className="btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Board
