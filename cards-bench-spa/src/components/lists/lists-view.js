import React from 'react'
import { FormGroup, Form } from 'react-bootstrap';

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'
import PopUpBox from '../pop-up-box/pop-up-box-view'

import Card from '../cards/cards-container';
import './lists-style.css'

function ListView(props) {
    const dropDownMenuItems = [
        <span onClick={() => props.toggleChangeOrder(props.listId, props.listOrder, props.listTitle)} className="btn btn-info d-block mb-1" >
            MOVE LIST
        </span>,
        <span onClick={() => props.deleteList(props.listId, props.listOrder)} className="btn btn-danger d-block">
            DELETE
        </span>
    ]

    let options = [];

    for (let index = 0; index < props.numberOfLists; index++) {
        if (index === props.listOrder)
            continue;

        const option = <option key={index}> { index + 1 } </option>
        options.push(option);
    }

    const PopUpBoxContent = (
        <FormGroup>
        <Form.Label>Order</Form.Label>
            <Form.Control onChange={props.handleChange} name="newListOrder" as="select">
                { options }
            </Form.Control>
        </FormGroup>
    )

    return (
        <li className="list-group-item p-0 ml-2">
            <div className="list-view p-2">
                {
                    props.listToUpdateId === props.listId && !props.changingOrder ? (
                        <input type="text" name="listTitleToUpdate" autoComplete="off" className="title-change-input" value={props.listTitleToUpdate} onChange={props.handleChange} autoFocus='on'/>
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
                {
                    props.listToUpdateId === props.listId && props.changingOrder ? (
                        <PopUpBox PopUpBoxContent={PopUpBoxContent} confirmButtonFunction={() => props.changeListOrder()} cancelButtonFunction={() => props.toggleChangeOrder('')} />
                    ) : ('')
                }
                <div>
                    <ul className="list-group">
                        <Card cards={props.cards} listParams={props.listParams} listId={props.listId} />
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
