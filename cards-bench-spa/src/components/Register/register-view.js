import React from 'react';

import './register-styles.css';

import LoaderView from '../loader/loader-view'

function RegisterView(props) {
  const style={
    width: props.screenWidth < 769 ? '90%' : '60%',
    padding: '50px 25px 80px 25px',
    margin: '50px auto',
    background: '#efefef',
    textAlign: 'center',
    WebkitBoxShadow: '2px 2px 3px rgba(0,0,0,0.1)',
    boxShadow: '2px 2px 3px rgba(0,0,0,0.1)',
    verticalAlign: 'middle'
  }

  return (
    <div className="register" style={style}>
      <form onSubmit={props.register}>
        <div className="form-check form-check-inline">
          <label className="form-check-label pr-1" htmlFor="inlineRadio1">
            Male
          </label>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="inlineRadio1"
            value="Male"
            onChange={props.handleChange}
            defaultChecked
          />
        </div>
        <div className="form-check form-check-inline">
          <label className="form-check-label pr-1" htmlFor="inlineRadio2">
            Female
          </label>
          <input
            className="form-check-input"
            type="radio"
            name="gender"
            id="inlineRadio2"
            value="Female"
            onChange={props.handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={props.registerInfo.email}
              onChange={props.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="email"
              className="form-control"
              name="confirmEmail"
              placeholder="Confirm Email"
              value={props.registerInfo.confirmEmail}
              onChange={props.handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={props.registerInfo.password}
              onChange={props.handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={props.registerInfo.confirmPassword}
              onChange={props.handleChange}
            />
          </div>
        </div>

        <center>
          <div className="form-group">
            <input
              type="text"
              className="form-control w-50"
              name="knownAs"
              placeholder="Nickname"
              value={props.registerInfo.knownAs}
              onChange={props.handleChange}
            />
          </div>
        </center>
        {
          props.registerInfo.registering === false ? <button className="btn btn-primary">Sign up</button> :
            <center><LoaderView width={48} height={48} borderWidth={8} borderStyle={'solid'} borderColor={'f3f3f3'} /></center>
        }
      </form>
    </div>
  );
}

export default RegisterView;
