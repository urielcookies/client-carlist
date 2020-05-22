import React from 'react';
import {Button} from 'semantic-ui-react';

const LoadAllUserPermission = ({close}) => {
  // LOAD users acces to this car
  // HAVE AN EDIT AND DELETE (TABLE UI)
  return (
    <div>
      
      <div style={{display: 'flex'}}>
          <Button fluid basic color="teal" content="Dont Know" type="button" onClick={close} />
          <Button fluid basic content="Cancel" onClick={close} />
        </div>
    </div>
  );
}

export default LoadAllUserPermission;
