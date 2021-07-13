import { ReactNode } from 'react';
import { Container } from 'semantic-ui-react';
import { getCookie } from '../endpoints/index';

const withContainerUI = (Component: ReactNode) => () => (getCookie('token')
  ? <Container id="content" style={{ height: getCookie('token') ? '85.5vh' : '95vh' }}>{Component}</Container>
  : <div id="content" style={{ height: getCookie('token') ? '93vh' : '95vh' }}>{Component}</div>);

export default withContainerUI;
