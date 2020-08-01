import React from 'react';
import './register-styles.css';

function RegisterView(props) {
  return (
    <div className="register">
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
              placeholder="KnownAs (Nickname)"
              value={props.registerInfo.knownAs}
              onChange={props.handleChange}
            />
          </div>
        </center>

        <button className="btn btn-primary">Sign sup</button>
      </form>
    </div>
  );
}

export default RegisterView;
