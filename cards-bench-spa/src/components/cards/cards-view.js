import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'
import PopUpBox from '../pop-up-box/pop-up-box-view'

import './cards-style.css';

function CardView(props) {
    const dropDownMenuItems = [
      <span
        onClick={() => props.toggleMoving(props.card.cardId, props.card.order, props.card.title)}
        className="btn btn-info d-block mb-1" 
      >
        MOVE CARD
      </span>,
      <span
        onClick={() => props.deleteCard(props.card.cardId, props.card.order)}
        className="btn btn-danger d-block"
      >
        DELETE
      </span>,
    ];

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
              <DropDownMenu dropDownMenuItems={dropDownMenuItems} />
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
        <div>
            {props.addingCard === false ? (
                <li
                  onClick={props.toggleAddingCard}
                  className="card add-card-button list-group-item ml-2"
                >
                    <span>
                        + Add card
                    </span>
                </li>
            ) : (
                <li className="card list-group-item ml-2">
                    <form onSubmit={props.addCard}>
                        <input
                            name="cardTitle"
                            value={props.cardTitle}
                            onChange={props.handleChange}
                            type="text"
                            placeholder="Card Title"
                            autoFocus="on"
                            autoComplete="off"
                            className="form-control list-input-text"
                        />
                        <div className="mt-1">
                            <button onClick={props.addCard} type="submit" className="btn btn-success mr-1"> Add </button>
                            <button onClick={props.toggleAddingCard} className="btn btn-danger"> Cancel </button>
                        </div>
                    </form>
                </li>
            )}
        </div>
    );
}

export default CardView;
export { AddCardView };
