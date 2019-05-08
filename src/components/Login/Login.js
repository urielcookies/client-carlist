import React from 'react';
import {Link} from 'react-router-dom';

const Login = (props) => {
  setTimeout(() => {
    document.querySelector('#root > div > div.ui.inverted.top.fixed.menu > div > span > a').style.display = 'none';
  }, 500);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.children[0].value.toLowerCase() === 'uriel' || e.target.children[0].value.toLowerCase() === 'omar') {
      props.history.push('cars');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="username"/>
      <input placeholder="password" />
      <button type="submit">Login</button>
    </form>
  )
};

export default Login;