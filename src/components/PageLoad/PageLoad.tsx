import { Backdrop, CircularProgress } from '@material-ui/core';

const PageLoad = () => (
  <Backdrop open>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default PageLoad;
