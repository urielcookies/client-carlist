import { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import { getCookie } from '../endpoints/index';

const withContainerUI = (Component: ReactNode) => () => (getCookie('token')
  ? <Container id="content" style={{ height: getCookie('token') ? '93vh' : '95vh', borderBottom: '1px solid red' }}>{Component}</Container>
  : <div id="content" style={{ height: getCookie('token') ? '93vh' : '95vh', borderBottom: '1px solid red' }}>{Component}</div>);

export default withContainerUI;
