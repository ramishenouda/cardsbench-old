import React from 'react';

import './dropdown-menu-style.css'

function DropDownMenuView(props) {
    const style = {
        display: props.toggle === true ? 'block' : 'none'
    }

    const menuItems = props.dropDownMenuItems.map((item, index) =>
      <span key={index} onClick={() => props.toggleDropDownMenu('dropdown')} className="list-group-item dropdown-item"> { item } </span>
    );

    return (
        <div className="dropdown">
            <span onClick={() => props.toggleDropDownMenu('dropdown')} className="dropdown">
                { props.text } <i className="dropdown dropdown-arrow mb-1"></i> 
            </span>

            <div style={style} className="dropdown-items text-center list-group mt-3">
                { menuItems }
            </div>
        </div>
    );
}

export default DropDownMenuView;
