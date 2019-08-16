import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../endpoints/index';
import {Redirect} from 'react-router-dom';

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
  const style = {
    height: '500px'
  };

  const [code, setCode] = useState([]);
  const hi = (number) => {
    setCode([...code, number]);
  };

  if (JSON.parse(localStorage.getItem('authenticated'))) {
    return <Redirect to="/cars" />;
  }

  if (code.length >= 4) {
    axios.post(`${url}/authenticate`, {code}, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      localStorage.setItem('authenticated', response.request.response)
      setCode([]);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div style={style}>
      <div style={{justifyContent: 'center', height: '60px', fontSize: '3em', display: 'flex', alignItems: 'center'}}>{code.join(' ')}</div>
      <div style={{display: 'flex', height: '25%'}}>
        <span style={{
        fontSize: '3em',
        flex: '3 0 auto',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }} onClick={() => hi(1)}>1</span>
        <span style={{
        fontSize: '3em',
        flex: '3 0 auto',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }} onClick={() => hi(2)}>2</span>
      <span style={{
        fontSize: '3em',
        flex: '3 0 auto',
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }} onClick={() => hi(3)}>3</span>
      </div>

      <div style={{display: 'flex', height: '25%'}}>
        <span style={{
          fontSize: '3em',
          flex: '3 0 auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => hi(4)}>4</span>
      <span style={{
          fontSize: '3em',
          flex: '3 0 auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => hi(5)}>5</span>
        <span style={{
          fontSize: '3em',
          flex: '3 0 auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => hi(6)}>6</span>
      </div>

      <div style={{display: 'flex', height: '25%'}}>
        <span style={{
          fontSize: '3em',
          flex: '3 0 auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => hi(7)}>7</span>
          <span style={{
            fontSize: '3em',
            flex: '3 0 auto',
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }} onClick={() => hi(8)}>8</span>
          <span style={{
            fontSize: '3em',
            flex: '3 0 auto',
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }} onClick={() => hi(9)}>9</span>
      </div>

      <div style={{display: 'flex', height: '25%'}}>
        <span style={{
          fontSize: '3em',
          flex: '3 0 auto',
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => hi(0)}>0</span>
      </div>
    </div>
  )
};

export default Login;