import React, {useEffect, useState} from 'react';
import {Modal, Tab} from 'semantic-ui-react'
import GivePermissions from './GivePermission'
import LoadAllUserPermission from './LoadAllUserPermission';

import {fetchUsersWithCarAccess} from '../../../../endpoints';

const PermissionsModal = ({carInfoId, close, show}) => {
  const [usersWithPermissions, setUsersWithPermissions] = useState([]);

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = () => fetchUsersWithCarAccess(carInfoId)
    .then(({data}) => {
      setUsersWithPermissions(data);
    })

  const panes = [
    { 
      menuItem: 'All Users Permissions', 
      render: () =>(
        <Tab.Pane>
          <LoadAllUserPermission {...{carInfoId, close, getUsers, usersWithPermissions}} />
        </Tab.Pane>
      )
    },
    { 
      menuItem: 'Give Permission',
      render: () => (
        <Tab.Pane>
          <GivePermissions {...{carInfoId, close, getUsers}} />
        </Tab.Pane>
      ) 
    },
  ]

  return (
    <Modal
      closeOnDimmerClick={false}
      open={show}
      onClose={close}
      basic
      size='small'
      style={{backgroundColor: 'white', height: '350px'}}>
      <Modal.Header style={{color: 'black', textAlign: 'center'}}>Permissions</Modal.Header>
      <Modal.Content>
        <Tab panes={panes} />
      </Modal.Content>
    </Modal>
  );
}

export default PermissionsModal;
