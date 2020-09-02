import React from 'react'

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'

import Card from '../cards/cards-container';
import './lists-style.css'

function ListView(props) {
    const dropDownMenuItems = [
        <span className="btn btn-info d-block mb-1" >
            MOVE LIST
        </span>,
        <span onClick={() => props.deleteList(props.listId, props.listOrder)} className="btn btn-danger d-block">
            DELETE
        </span>
    ]

    return (
        <li className="list-group-item p-0 ml-2">
            <div className="list-view p-2">
                    {
                        props.listUpdateId === props.listId ? (
                            <input type="text" name="listTitleToUpdate" className="title-change-input" value={props.listTitleToUpdate} onChange={props.handleChange} autoFocus='on'/>
                        ) : (
                            <div>
                                <span onClick={() => props.toggleChangeTitle(props.listId, props.listTitle, props.listOrder)} className="list-title mb-1">
                                    { props.listTitle } 
                                </span>
                                <span className="list-dropdown-menu">
                                    <DropDownMenu dropDownMenuItems={dropDownMenuItems} />
                                </span>
                            </div>
                        )
                    }
                <div>
                    <ul className="list-group">
                        <Card cards={props.cards} />
                    </ul>
                </div>
            </div>
        </li>
    )
}

function ListToAdd(props) {
    return (
        <li className="list-group-item p-0 ml-2">
            { props.addingList === false ? (
                    <div onClick={props.toggleListAddition} className="toggle-adding-list-button p-2">
                        +  Add list 
                    </div>
                ): (
                    <form onSubmit={props.addList} className="list-to-add">
                        <input
                            autoFocus={true}
                            type="text"
                            value={props.listTitle}
                            onChange={props.handleChange}
                            className="form-control list-input-text"
                            placeholder="List Title"
                            name="listTitle"
                            autoComplete="off"
                        />
                        <div className="mt-1">
                            <button disabled={props.listTitle === ''} className="btn btn-success"> Add </button>
                            <button onClick={props.toggleListAddition} className="ml-1 btn btn-danger"> Cancel </button>
                        </div>
                    </form>
                )
            }
        </li>
    )
}

export default ListView;
export { ListToAdd };
