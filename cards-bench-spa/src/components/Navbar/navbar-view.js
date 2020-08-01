import React from 'react';
import { Link } from 'react-router-dom';

import LoaderView from '../Loader/loader-view'

import './navbar-styles.css';

function LoginOrRegisterNavbarView(props) {
  return (
    <nav className="navbar navbar-primary bg-light">
      <Link to="/" className="navbar-brand"> CardsBench </Link>
      <form className="form-inline">
        <span onClick={props.toggleLogin} className="btn btn-outline-success mr-2 my-2 my-sm-0">
          Login
        </span>
        <Link to="/register" className="btn btn-outline-info my-2 my-sm-0">
          Register
        </Link>
      </form>
    </nav>
  );
}

function LoginNavbar(props) {
  const unvalidInputStyle = {
    border: '2px solid #D55858',
  }

  return (
    <nav className="navbar navbar-primary bg-light">
      <Link to="/" className="navbar-brand"> CardsBench </Link>
      {
        props.loginInfo.loggingIn === false ?
          <form onSubmit={props.login} className="form-inline my-2 my-lg-0">
            <input
              onChange={props.handleChange}
              style={props.loginInfo.validEmail === 'false' ? unvalidInputStyle : null}
              className="form-control mr-sm-2"
              value={props.loginInfo.email}
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Email"
            />
            <input type="password" name="password" autoComplete="off" placeholder="Password"
              className="form-control mr-sm-2" 
              value={props.loginInfo.password}
              onChange={props.handleChange}
              style={props.loginInfo.validPassword === 'false' ? unvalidInputStyle : null}
            />
            <button className="btn btn-success mr-2 my-2 my-sm-0"
              disabled={props.loginInfo.validForm === false ? true : false }
            >
              Login
            </button>
          <span onClick={props.toggleLogin} className="btn btn-outline-warning my-2 my-sm-0">
            Cancel
          </span>
          </form>
        : <LoaderView width={20} height={20} borderWidth={8} borderStyle={'solid'} borderColor={'f3f3f3'} />
      }
    </nav>
  );
}

function LoggedInNavbarView(props) {
  return (
    <nav className="navbar navbar-primary bg-light">
      <Link to="/" className="navbar-brand"> CardsBench </Link>
      <form className="form-inline">
        <Link to="/boards" className="btn btn-outline-success mr-2 my-2 my-sm-0">
          Boards
        </Link>

        <button onClick={props.logout} className="btn btn-warning bg-warning my-2 my-sm-0">
          <Link className="logout-link" to='/'>
            Logout
          </Link>
        </button>
      </form>
    </nav>
  );
}

export { LoginOrRegisterNavbarView, LoginNavbar, LoggedInNavbarView };
