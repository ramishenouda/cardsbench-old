import React from 'react';

import './dropdown-menu-style.css'

function DropDownMenuView(props) {
    const style = {
        display: props.toggle === true ? 'block' : 'none'
    }

    return (
        <div className="react-dropdown-menu">
            <span onClick={() => props.toggleDropDownMenu('dropdown-toggle')} className="dropdown-toggle-botton">
                { props.text } <i className="dropdown-toggle-symbol mb-1"></i>
            </span>
            <div style={style} className="dropdown-items text-center list-group mt-3">
                { props.dropDownMenuItems }
            </div>
        </div>
    );
}

export default DropDownMenuView;
