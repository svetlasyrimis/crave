import React from 'react';

export default (props) => (
  <>
    <div className="Loginform">
      <h3>Log In Form</h3>
      <form className="log" onSubmit={props.handleSubmit}>
        <label htmlFor="name">Username</label>
        <input type="text"
          name="name"
          value={props.loginFormData.name}
          id="name"
          onChange={props.handleChange} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={props.loginFormData.password}
          id="password"
          onChange={props.handleChange} />

        <input type="submit" value="Sign In!" />
      </form>
    </div>
  </>
)