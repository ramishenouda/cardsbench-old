import React from 'react'

import './lists-style.css'

function ListView(props) {
    return (
        <div>
            <div className="list-view p-1 ml-1">
                <span className="list-title"> { props.listTitle } </span>
                <ul className="list-group">
                    {props.cards}
                </ul>
                <div className="">
                    <li className="card list-group-item ml-2">
                        <span>
                            <span> + </span> Add another card
                        </span>
                    </li>
                </div>
            </div>
        </div>
    )
}

function ListToAdd(props) {
    return (
        <div>
            <li className="list-view list-group-item ml-2">
                <form onSubmit={props.addList} className="list-to-add list-group-item ml-2">
                    <input
                      autoFocus={true}
                      type="text"
                      value={props.listTitle}
                      onChange={props.handleChange}
                      className="list-input-text"
                      placeholder="List Title"
                      name="listTitle"
                      autoComplete="off"
                    />
                    <div className="mt-1">
                        <button disabled={props.listTitle === ''} className="btn btn-success"> Add </button>
                        <button onClick={props.toggleListCreation} className="ml-1 btn btn-danger"> Cancel </button>
                    </div>
                </form>
            </li>
        </div>
    )
}

export default ListView;
export {ListToAdd};
