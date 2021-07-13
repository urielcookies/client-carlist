import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';

import { useActiveUser } from '../../context/ActiveUserContext';

const Navbar = (props) => (
  <Menu id="navigation" inverted style={{ borderRadius: '0px', margin: 0, height: '5vh' }}>
    <Container>
      <Menu.Item as="span" header>
        <Icon size="large" name="car" />
        <Link to={useActiveUser() ? '/home' : '/'}>Car Flipz</Link>
      </Menu.Item>

      <Menu.Menu position="right">
        {/* {!showLogin && (
					<Menu.Item>
						<Icon size='small' name='user outline' />
						<Link to="/login">Login</Link>
					</Menu.Item>
				)} */}
        {useActiveUser() && (
          <Menu.Item>
            <Icon name="settings" onClick={() => props.history.push('/home/settings')} />
          </Menu.Item>
        )}
      </Menu.Menu>
    </Container>
  </Menu>
);

export default withRouter(Navbar);
