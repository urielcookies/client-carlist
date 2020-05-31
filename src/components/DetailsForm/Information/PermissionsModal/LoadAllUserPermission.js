import React, {useEffect, useState} from 'react';
import {map} from 'lodash';
import {Button} from 'semantic-ui-react';
import {fetchUsersWithCarAccess} from '../../../../endpoints';

const LoadAllUserPermission = ({carInfoId, close}) => {
  // HAVE AN EDIT AND DELETE (TABLE UI)

  const [usersWithPermissions, setUsersWithPermissions] = useState([]);

  useEffect(() => {
    fetchUsersWithCarAccess(carInfoId)
      .then(({data}) => {
        setUsersWithPermissions(data);
      })
  }, []);
  
  return (
    <div>
      {map(usersWithPermissions, (user) => (
        <div key={user.UserId} style={{color: 'black'}}>
          {user.Username}
          {user.Email}
        </div>
      ))}

      <div style={{display: 'flex'}}>
          <Button fluid basic color="teal" content="Dont Know" type="button" onClick={close} />
          <Button fluid basic content="Cancel" onClick={close} />
        </div>
    </div>
  );
}

export default LoadAllUserPermission;
