import React from 'react'

function CardView(props) {
    return (
        <li className="list-group-item">
            { props.card.title }
        </li>
    );
}

export default CardView;
