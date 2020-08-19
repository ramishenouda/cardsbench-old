import React, { Component } from 'react';

import DropDownMenuView from './dropdown-menu-view'

class DropDownMenu extends Component {
    state = {
        toggle: false,
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.toggleDropDownMenu);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    toggleDropDownMenu = (event) => {
        if(event === 'dropdown') {
            this.setState({toggle: true});
        } else if (event.target.className !== 'dropdown') {
            setTimeout(() => {
                this.setState({toggle: false});
            }, 250);
        }
    }

    render() {
        return (
          <DropDownMenuView
            text={this.props.text}
            dropDownMenuItems={this.props.dropDownMenuItems}
            toggleDropDownMenu={this.toggleDropDownMenu}
            toggle={this.state.toggle}
          />
        );
    }
}

export default DropDownMenu;
