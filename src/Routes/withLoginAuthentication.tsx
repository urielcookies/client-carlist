import { ComponentType } from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie } from '../endpoints/index';

const withLoginAuthentication = (Component: ComponentType) => (ComponentProps: any) => (!getCookie('token')
  ? <Redirect to="/" />
  : <Component {...ComponentProps} />);

export default withLoginAuthentication;
