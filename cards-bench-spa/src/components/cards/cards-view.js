import React from 'react'

import './cards-style.css';

function CardView(props) {
    return (
        <li className="card list-group-item mb-2">
            { props.card.title }
        </li>
    );
}

export default CardView;
