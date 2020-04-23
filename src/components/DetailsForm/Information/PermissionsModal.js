import React, {useState} from 'react';
import {isEqual} from 'lodash';
import {Button, Form, Modal} from 'semantic-ui-react'

const PermissionsModal = ({close, show}) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const givePermissionHandler = () => {
    // setIsLoading(true)
    // API
    console.log('Send', {username, edit});
    close();
  };

  return (
    <Modal
      closeOnDimmerClick={false}
      open={show}
      onClose={close}
      basic
      size='small'
      style={{backgroundColor: 'white'}}>
      <Modal.Header style={{color: 'black', textAlign: 'center'}}>User to Give Permissions</Modal.Header>
      <Modal.Content>

        <Form as="div">
          <Form.Group widths='equal'>
            
              <Form.Input
                name="username"
                label='Give Permission'
                placeholder="username"
                onChange={({target: {value}}) => setUsername(value)}
                value={username} />

              <Form.Checkbox
                toggle
                label={edit ? `${username} can edit data` : `${username} can only view data`}
                id="edit"
                name="edit"
                checked={edit}
                onChange={({target: {checked}}) => setEdit(checked)} />
                  
            </Form.Group>

            {isEqual(errorMessage, '') && (
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
                <small style={{color: 'red'}}>Username does not exist</small>
              </div>
            )}
            
            <div style={{display: 'flex'}}>
              <Button fluid basic loading={isLoading} disabled={isEqual(username, '')} color="teal" content="Give Permission" type="button" onClick={givePermissionHandler} />
              <Button fluid basic content="Cancel" onClick={close} />
            </div>

        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default PermissionsModal;
