import React from 'react'

import './cards-style.css';

function CardView(props) {
    return (
        <li className="card mb-1 list-group-item">
            { props.card.title }
        </li>
    );
}

export default CardView;
