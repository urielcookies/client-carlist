import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Icon, Menu} from 'semantic-ui-react';

const Navbar = ({history}) => (
  <Menu inverted>
    <Container>
      <Menu.Item as='span' header>
        <Icon size='large' name='car' />
        <Link to="/home">Cookiez Carz</Link>
      </Menu.Item>

      <Menu.Menu position='right'>
          <Menu.Item>
            <Icon name='settings' onClick={() => history.push('/home/settings')} />
          </Menu.Item>
        </Menu.Menu>
    </Container>
  </Menu>
);

export default withRouter(Navbar);