import React, {useState} from 'react';
import {map, isEqual} from 'lodash';
import {Button, Table, Divider} from 'semantic-ui-react';
import {removeUserCarPermissions, editCarAccess} from '../../../../endpoints';

const EDIT = 'EDIT';
const DELETE = 'DELETE';

const LoadAllUserPermission = ({carInfoId, close, getUsers, usersWithPermissions}) => {
  const [mode, setMode] = useState(null);

  const editHandler = ({user}) => {
    const carAccessObj = {
      CarInformationId: carInfoId,
      userId: user.UserId,
      WriteBool: !user.Write
    };

    editCarAccess(carAccessObj).then(() => {
      getUsers()
      setMode(null)
    });
  };

  const removeHandler = ({user}) => {
    const carAccessObj = {
      CarInformationId: carInfoId,
      UserId: user.UserId,
    };
    removeUserCarPermissions(carAccessObj).then(() => {
      getUsers();
      setMode(null);
    });
  };
  
  return (
    <div>

      {isEqual(mode, null) && (
        <Table unstackable basic='very'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">User</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Permission</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit/Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {map(usersWithPermissions, (user) => {
              return (
                <Table.Row key={user.UserId}>
                  <Table.Cell textAlign="center" width="4">{user.Username}</Table.Cell>
                  <Table.Cell textAlign="center" width="2">{(user.Write ? 'Edit' : 'View')}</Table.Cell>
                  <Table.Cell textAlign="center" width="6">
                    <Button size='tiny' icon='edit outline' onClick={() => setMode({mode: EDIT, user})} />
                    <Button size='tiny' icon='trash alternate' onClick={() => setMode({mode: DELETE, user})} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>

        </Table>
      )}

      {isEqual(mode && mode.mode, EDIT) && (
        <div>
          <span style={{color: 'black'}}>Give user {mode.user.Username} <span style={{color: 'teal'}}>{(mode.user.Write ? 'View' : 'Edit')}</span> permissions?</span>
          <Divider />

          <div style={{display: 'flex'}}>
            <Button fluid basic color="teal" content="Yes" type="button" onClick={() => editHandler(mode)} />
            <Button fluid basic content="Cancel" onClick={() => setMode(null)} />
          </div>
        </div>
      )}

      {isEqual(mode && mode.mode, DELETE) && (
        <div>

          <span style={{color: 'black'}}>Remove this user from having access to this car?</span>
          <Divider />

          <div style={{display: 'flex'}}>
            <Button fluid basic color="red" content="Remove Access" type="button" onClick={() => removeHandler(mode)} />
            <Button fluid basic content="Cancel" onClick={() => setMode(null)} />
          </div>
        </div>
      )}

      {isEqual(mode, null) && (
        <div style={{display: 'flex'}}>
          <Button fluid basic content="Cancel" onClick={close} />
        </div>
      )}

    </div>
  );
}

export default LoadAllUserPermission;
