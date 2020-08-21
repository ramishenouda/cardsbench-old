import React from 'react';
import { Link } from 'react-router-dom';

import LoaderView from '../loader/loader-view'
import DropDownMenu from '../dropdown-menu/dropdown-menu-container'

import './navbar-styles.css';


function NavbarView(props) {
  let form;

  if (props.authenticated) {
    const decodedToken = props.decodedToken();

    if (props.isSmallScreen === false) {
      const dropDownMenuItems = [
        <Link style={{textDecoration: 'none'}} className="list-group-item dropdown-item" to="/profile">
          Profile
        </Link>,
        <Link style={{textDecoration: 'none'}} className="list-group-item dropdown-item" onClick={props.logout} to="/">
          Logout
        </Link>
      ]

      form = (
        <form className="form-inline">
          <Link to="/" className="ml-3 item"> Home </Link>
          <Link to="/boards" className="ml-3 item"> Boards </Link>
          <div className="ml-3 item">
            <DropDownMenu text={decodedToken.family_name} dropDownMenuItems={dropDownMenuItems} />
          </div>
        </form>
      );
    } else {
      const dropDownMenuItems = [
        <Link style={{textDecoration: 'none'}} className="list-group-item dropdown-item" to="/profile">
          Profile
        </Link>,
        <Link style={{textDecoration: 'none'}} className="list-group-item dropdown-item" onClick={props.logout} to="/">
          Logout
        </Link>
      ]

      form = (
        <form className="form-inline">
          <Link to="/boards" className="item"> Boards </Link>
          <div className="ml-3 item">
            <DropDownMenu text={decodedToken.family_name} dropDownMenuItems={dropDownMenuItems} />
          </div>
        </form>
      );
    }

  } else if (props.showLoginBar) {
    form = (
      <form onSubmit={props.login} className="form-inline my-2 my-lg-0">
        <input name="email" type="email" autoComplete="off" placeholder="Email"
          className="form-control mr-sm-2"
          value={props.loginInfo.email}
          onChange={props.handleChange}
          disabled={props.loginInfo.loggingIn}
        />
        <input type="password" name="password" autoComplete="off" placeholder="Password"
          className="form-control mr-sm-2" 
          value={props.loginInfo.password}
          onChange={props.handleChange}
          disabled={props.loginInfo.loggingIn}
        />

        {
          props.loginInfo.loggingIn === false ? 
            <button className="btn btn-outline-light mr-2 my-2 my-sm-0"
              disabled={props.loginInfo.validForm === false ? true : false }
            >
              Login
            </button> :
            <span className="mr-2 my-2 my-sm-0">
              <LoaderView width={20} height={20} borderWidth={8} borderStyle={'solid'} borderColor={'f3f3f3'} />
            </span>
        }
        <span onClick={props.toggleLogin} className="btn btn-outline-warning my-2 my-sm-0" disabled={props.loginInfo.loggingIn}>
          Cancel
        </span>
      </form>
    );
  } else {
    form = (
      <form className="form-inline">
        <span onClick={props.toggleLogin} className="btn btn-outline-dark mr-2 my-2 my-sm-0">
          Login
        </span>
        <Link to="/register" className="btn btn-outline-light my-2 my-sm-0">
          Register
        </Link>
      </form>
    );
  }

  return (
    <nav className="navbar navbar-primary bg-dark">
      <Link to="/" className="navbar-brand"> CardsBench </Link>
      { form }
    </nav>
  );
}

export default NavbarView