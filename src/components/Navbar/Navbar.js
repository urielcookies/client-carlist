import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Icon, Menu} from 'semantic-ui-react';

const Navbar = () => (
  <Menu inverted>
    <Container>
      <Menu.Item as='span' header>
        <Icon size='large' name='car' />
        <Link to="/">Selling Crap</Link>
      </Menu.Item>
    </Container>
  </Menu>
);

export default Navbar;