import React from 'react'
import { Form, Button } from 'react-bootstrap';

import './cards-style.css';

function CardView(props) {
    return (
        <li className="card list-group-item mb-2">
            { props.card.title }
        </li>
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
              <span> + </span> Add card
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
              />
              <Form.Group className="mt-1">
                <Button type="submit" variant="success mr-1">Add</Button>
                <Button onClick={props.toggleAddingCard} variant="danger">
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </li>
        )}
      </div>
    );
}

export default CardView;
export { AddCardView };
