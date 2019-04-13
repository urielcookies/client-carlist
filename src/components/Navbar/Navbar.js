import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container,
    Image,
    Menu,
} from 'semantic-ui-react'

const Navbar = () => (
    <Menu fixed='top' inverted>
        <Container>
            <Menu.Item as='span' header>
              <Image 
                size='mini' 
                src='http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c39c.png' 
                style={{ marginRight: '1.5em' }} />
              <Link to="/cars">Selling Crap</Link>
            </Menu.Item>
        </Container>
    </Menu>
);

export default Navbar;