import React, {useState} from 'react'
import {withRouter} from 'react-router-dom';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'

import {loginUser} from '../../endpoints';

const Login = ({history: {push}}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  return (
    <Grid textAlign='center' /* style={{ height: '80vh' }} */ verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {/* <Image src='/logo.png' />  */}
          Log in
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input 
              fluid icon='user' 
              iconPosition='left' 
              placeholder='E-mail address' 
              type="email"
              onChange={(e, {value}) => setEmail(value)}/>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange={(e, {value}) => setPassword(value)}/>

            <Button loading={submitLoading} color='teal' fluid size='large' onClick={() => loginUser({email, password}, push, setErrorMessage, setSubmitLoading)}>
              Login
            </Button>
            <div style={{color: "red", height: "20px"}}>
              <small>{errorMessage}</small>
            </div>
          </Segment>
        </Form>
        {/* <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message> */}
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(Login);