import { Backdrop, CircularProgress } from '@material-ui/core';

const PageLoad = () => (
  <Backdrop open style={{ zIndex: 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default PageLoad;
