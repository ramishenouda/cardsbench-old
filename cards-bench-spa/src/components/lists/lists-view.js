import React from 'react'

function ListView(props) {
    return (
        <div>
            <li className="list-group-item ml-2">
                <h4>{ props.listTitle } </h4>
                <ul className="list-group">
                    {props.cards}
                </ul>
            </li>
        </div>
    )
}

export default ListView;
