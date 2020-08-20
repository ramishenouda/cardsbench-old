import React, { Component } from 'react';

import DropDownMenuView from './dropdown-menu-view'

class DropDownMenu extends Component {
    state = {
        toggle: false,
    }

    componentDidMount() {
        window.onclick = (event) => {
           if (!event.target.matches('.dropdown')) {
               this.toggleDropDownMenu(false);
           }
        } 
    }

    componentWillUnmount() {
        window.onclick = null;
    }

    toggleDropDownMenu = (event) => {
        if (event === false || this.state.toggle === true) {
            this.setState({toggle: false});
        }

        else if (event === 'dropdown') {
            this.setState({toggle: true});
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
