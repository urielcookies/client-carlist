import React, { useState, FC } from 'react';
import { Restore, HomeOutlined, Settings } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import TypeScriptTestStyle from './TypeScriptTestStyle';

const TypeScriptTest: FC = () => {
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
      >
        <BottomNavigationAction label="Recents" icon={<Restore />} />
        <BottomNavigationAction label="Home" icon={<HomeOutlined />} />
        <BottomNavigationAction label="Settings" icon={<Settings />} />
      </BottomNavigation>
    </TypeScriptTestStyle>
  );
};

export default TypeScriptTest;

