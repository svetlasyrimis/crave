import React from 'react';

export default (props) => (
  <>
    <div className="Registerform">
      <h3>Register Form</h3>
      <form className="reg" onSubmit={props.handleSubmit}>
        <label
          htmlFor="name">Username</label>
        <input
          type="text"
          name="name"
          value={props.registerForm.name}
          id="name"
          onChange={props.handleChange} />
        <label
          htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={props.registerForm.password}
          id="password"
          onChange={props.handleChange} />

        <label
          htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={props.registerForm.email}
          id="email"
          onChange={props.handleChange} />

        <input type="submit" value="Sign Up!" />
      </form>
    </div>
  </>
);