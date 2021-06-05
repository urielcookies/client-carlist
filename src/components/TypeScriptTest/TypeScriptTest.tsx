import React, { useState, FC } from 'react';
import { Restore, Favorite, LocationOn } from '@material-ui/icons';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import TypeScriptTestStyle from './TypeScriptTestStyle';

const TypeScriptTest: FC = () => {
  const [value, setValue] = useState<number>(0);

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
        <BottomNavigationAction label="Favorites" icon={<Favorite />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOn />} />
      </BottomNavigation>
    </TypeScriptTestStyle>
  );
};

export default TypeScriptTest;

