import React from 'react'

import Card from '../cards/cards-container';
import './lists-style.css'

function ListView(props) {
    return (
        <li className="list-group-item p-0 ml-2">
            <div className="list-view p-2">
                <span onClick={props.changeTitle} className="list-title mb-1"> { props.listTitle } </span>
                <ul className="list-group">
                    <Card cards={props.cards} />
                </ul>
            </div>
        </li>
    )
}

function ListToAdd(props) {
    return (
        <div>
            <li className="list-group-item p-0 ml-2">
                <div className="add-list-button p-2">
                    +  Add list 
                </div>
            </li>
            {/* <li className="list-view list-group-item ml-2">
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
            </li> */}
        </div>
    )
}

export default ListView;
export { ListToAdd };
