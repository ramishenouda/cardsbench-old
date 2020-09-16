import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'
import PopUpBox from '../pop-up-box/pop-up-box-view'

import './cards-style.css';

function CardView(props) {
    const display = props.options.length > 2 ? 'd-block' : '';
    const dropDownMenuItems = [
      <span
        onClick={() => props.toggleMoving(props.card.cardId, props.card.order, props.card.title)}
        className={`button button-info button-small ${display} mb-1`}
      >
        Move
      </span>,
      <span
        onClick={() => props.deleteCard(props.card.cardId, props.card.order)}
        className={`button button-danger button-small ${display} mb-1`}
      >
        Delete
      </span>,
    ];

    const layoutBoolean = props.card.order > props.options.length - 2;

    const dropdownMenuStyle = {
      bottom: layoutBoolean ? 0 : '',
      top: !layoutBoolean ? 0 : ''
    }

    let options = [];
    for (let index = 0; index < props.options.length; index++) {
      if (index === props.card.order)
        continue;

      options.push(props.options[index])
    }
  
    const popUpBoxContent = (
      <FormGroup>
      <Form.Label>Order</Form.Label>
          <Form.Control onChange={props.handleChange} name="newCardOrder" as="select">
              { options }
          </Form.Control>
      </FormGroup>
    )

    return (
      <div>
        {props.updatingCardId !== props.card.cardId || props.changingOrder || props.addingCard? (
          <li className="card list-group-item mb-2">
            <span className="float-right">
              <DropDownMenu style={dropdownMenuStyle} dropDownMenuItems={dropDownMenuItems} />
            </span>
            <span
              className="card-title"
              onClick={() =>
                props.toggleCardTitleUpdate(
                  props.card.title,
                  props.card.cardId,
                  props.card.order
                )
              }
            >
              {props.card.title}
            </span>
          </li>
        ) : (
          <li className="card mb-2">
              <textarea onChange={props.handleChange} autoFocus="on" name="cardTitle" className="card-title-change-input" value={props.cardTitle}>
              </textarea>
          </li>
        )}

        {
          props.updatingCardId === props.card.cardId && props.changingOrder ? (
              <PopUpBox popUpBoxContent={popUpBoxContent} confirmButtonFunction={() => props.moveCard()} cancelButtonFunction={() => props.toggleMoving('')} />
          ) : ('')
        }
      </div>
    );
}

function AddCardView(props) {
    return (
        <>
            {props.addingCard === false ? (
              <div className="add-card-view">
                  <li 
                    onClick={props.toggleAddingCard}
                    className="add-card-button"
                  >
                    <span>
                        + Add card
                    </span>
                  </li>
              </div>
            ) : (
              <div className="add-card-menu mb-2">
                <li>
                    <form onSubmit={props.addCard}>
                        <input
                            name="cardTitle"
                            value={props.cardTitle}
                            onChange={props.handleChange}
                            type="text"
                            placeholder="Card Title"
                            autoFocus="on"
                            autoComplete="off"
                            className="card-input-text"
                        />
                        <span 
                          disabled={props.cardTitle.trim() === ''} 
                          onClick={props.addCard} 
                          type="submit" 
                          className="ml-2 add-button"
                        > 
                          +
                        </span>
                    </form>
                </li>
              </div>
            )}
        </>
    );
}

export default CardView;
export { AddCardView };
