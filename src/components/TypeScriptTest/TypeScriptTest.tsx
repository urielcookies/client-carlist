import { useState, FC } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Restore, HomeOutlined, Settings } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import TypeScriptTestStyle from './TypeScriptTestStyle';

interface TypeScriptTestProps {
  history: History;
}

const TypeScriptTest: FC<TypeScriptTestProps> = ({ history: { push, goBack } }) => {
  const [value, setValue] = useState<number>(1);

  return (
    <TypeScriptTestStyle>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        id="navigation"
        style={{ height: '7.5vh' }}
      >
        <BottomNavigationAction label="Recents" icon={<Restore />} onClick={() => goBack()} />
        <BottomNavigationAction label="Home" icon={<HomeOutlined />} onClick={() => push('/home')} />
        <BottomNavigationAction label="Settings" icon={<Settings />} onClick={() => push('/home/settings')} />
      </BottomNavigation>
    </TypeScriptTestStyle>
  );
};

export default withRouter(TypeScriptTest);
