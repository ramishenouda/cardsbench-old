import React, { useState } from 'react'
import { FormGroup, Form, Button } from 'react-bootstrap';

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'
import PopUpBox from '../pop-up-box/pop-up-box-view'

import Card from '../cards/cards-container';
import './lists-style.css'

function ListView(props) {
    const [listViewPadding, setPadding] = useState(props.cards.length === 0 ? '' : 'p-2');

    const addCardToList = (card) => {
        setPadding('p-2')
    }

    const removeCardFromList = (cardId) => {
        props.cards.pop();
        setPadding(props.cards.length === 0 ? '' : 'p-2')
    }

    const dropDownMenuItems = [
        <span onClick={() => props.toggleChangeOrder(props.listId, props.listOrder, props.listTitle)} className="button button-small button-info d-block mb-1" >
            Move
        </span>,
        <span onClick={() => props.deleteList(props.listId, props.listOrder)} className="button button-small button-danger d-block">
            Delete
        </span>
    ]

    const listsViewStyle = {
        overflowY: props.cards.length > 4 ? 'scroll' : '',
        maxHeight: props.maxHeight + 'px',
    }

    let options = [];

    for (let index = 0; index < props.numberOfLists; index++) {
        if (index === props.listOrder)
            continue;

        const option = <option key={index}> { index + 1 } </option>
        options.push(option);
    }

    const popUpBoxContent = (
        <FormGroup>
        <Form.Label>Order</Form.Label>
            <Form.Control onChange={props.handleChange} name="newListOrder" as="select">
                { options }
            </Form.Control>
        </FormGroup>
    )

    return (
        <li className="list-group-item p-0 ml-3">
            <div className="list-item">
            {
                props.listToUpdateId === props.listId && !props.changingOrder ? (
                    <input type="text" name="listTitleToUpdate" autoComplete="off" className="list-title-change-input" value={props.listTitleToUpdate} onChange={props.handleChange} autoFocus='on'/>
                ) : (
                    <div className="list-title-div">
                        <span className="list-title" onClick={() => props.toggleChangeTitle(props.listId, props.listTitle, props.listOrder)}>
                            { props.listTitle }
                        </span>
                        <span className="float-right">
                            <DropDownMenu dropDownMenuItems={dropDownMenuItems} />
                        </span>
                    </div>
                )
            }
            <div style={listsViewStyle} className={`list-view ${listViewPadding}`}>
                {
                    props.listToUpdateId === props.listId && props.changingOrder ? (
                        <PopUpBox popUpBoxContent={popUpBoxContent} confirmButtonFunction={() => props.changeListOrder()} cancelButtonFunction={() => props.toggleChangeOrder('')} />
                    ) : ('')
                }
                <div>
                    <ul className="list-group">
                        <Card 
                            cards={props.cards} 
                            addCardToList={addCardToList} 
                            removeCardFromList={removeCardFromList}
                            listParams={props.listParams}
                            listId={props.listId} 
                        />
                    </ul>
                </div>
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
                    <form className="list-to-add">
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
                        <div className="mt-2">
                            <Button type="submit" onClick={props.addList} disabled={props.listTitle.trim() === ''} className="button button-success button-small button-add-list"> Add </Button>
                            <button onClick={props.toggleListAddition} className="ml-1 button button-danger button-small button-cancel-add-list"> Cancel </button>
                        </div>
                    </form>
                )
            }
        </li>
    )
}

export default ListView;
export { ListToAdd };
