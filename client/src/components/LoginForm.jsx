import React from 'react';

export default (props) => (
  <>
    <div className="login-form">
      <h3>Log In Form</h3>
      <form  onSubmit={props.handleSubmit}>
        <label htmlFor="name">Username</label>
        <br/>
        <input type="text"
          name="name"
          value={props.loginFormData.name}
          id="name"
          onChange={props.handleChange} required/>
        <br/>
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          value={props.loginFormData.password}
          id="password"
          onChange={props.handleChange} required/>
        <br/>
        <input type="submit" value="Sign In!" />
      </form>
    </div>
  </>
)