import React from 'react'
import { Form, Button } from 'react-bootstrap';

import DropDownMenu from '../dropdown-menu/dropdown-menu-container'

import './cards-style.css';

function CardView(props) {
    const dropDownMenuItems = [
      <Button
        variant="info"
        size="sm"
        className="mr-1"
      >
        MOVE CARD
      </Button>,
      <Button
        onClick={() => props.deleteCard(props.card.cardId, props.card.order)}
        variant="danger"
        size="sm"
        className="mr-1"
      >
        DELETE
      </Button>,
    ];

    return (
      <div>
        {props.updatingCardId !== props.card.cardId ? (
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
                    <Form onSubmit={props.addCard}>
                        <Form.Control
                            name="cardTitle"
                            value={props.cardTitle}
                            onChange={props.handleChange}
                            type="text"
                            autoComplete="off"
                            placeholder="Card Title"
                            autoFocus="on"
                        />
                        <Form.Group className="mt-1">
                            <Button type="submit" variant="success mr-1"> Add </Button>
                            <Button onClick={props.toggleAddingCard} variant="danger"> Cancel </Button>
                        </Form.Group>
                    </Form>
                </li>
            )}
        </div>
    );
}

export default CardView;
export { AddCardView };
