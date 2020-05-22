import React from 'react';
import {Modal, Tab} from 'semantic-ui-react'
import GivePermissions from './GivePermission'
import LoadAllUserPermission from './LoadAllUserPermission';

const PermissionsModal = ({close, show}) => {
  const panes = [
    { menuItem: 'All Users Permissions', render: () => <Tab.Pane><LoadAllUserPermission {...{close}} /></Tab.Pane> },
    { menuItem: 'Give Permission', render: () => <Tab.Pane><GivePermissions {...{close}} /></Tab.Pane> },
  ]

  return (
    <Modal
      closeOnDimmerClick={false}
      open={show}
      onClose={close}
      basic
      size='small'
      style={{backgroundColor: 'white', height: '350px'}}>
      <Modal.Header style={{color: 'black', textAlign: 'center'}}>User to Give Permissions</Modal.Header>
      <Modal.Content>

        <Tab panes={panes} />

      </Modal.Content>
    </Modal>
  );
}

export default PermissionsModal;


// import React, {useState} from 'react';
// import {isEqual} from 'lodash';
// import {Button, Form, Modal, Tab} from 'semantic-ui-react'
// import GivePermissions from './GivePermission'
// import LoadAllUserPermission from './LoadAllUserPermission';

// const PermissionsModal = ({close, show}) => {
//   const [removeMode, setRemoveMode] = useState(false);
//   const [username, setUsername] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
  
//   const givePermissionHandler = () => {
//     // setIsLoading(true)
//     // API
//     console.log('Send', {username, edit});
//     // setIsLoading(false)
//     close();
//   };

//   // Show list of users with icon next to it that when clicked it removes permissions
  
//   // two tabs
//   // Give permissions
//   // Remove permissions
//   // --- If remove permission dont show other modal to confirm but instead render diifeentview forthis modal to confirm removal
  
//   return (
//     <Modal
//       closeOnDimmerClick={false}
//       open={show}
//       onClose={close}
//       basic
//       size='small'
//       style={{backgroundColor: 'white'}}>
//       <Modal.Header style={{color: 'black', textAlign: 'center'}}>User to Give Permissions</Modal.Header>
//       <Modal.Content>

//         <Form as="div">
//           <Form.Group widths='equal'>
            
//               <Form.Input
//                 name="username"
//                 label='Give Permission'
//                 placeholder="username"
//                 onChange={({target: {value}}) => setUsername(value)}
//                 value={username} />

//               <Form.Checkbox
//                 toggle
//                 label={edit ? `${username} can edit data` : `${username} can only view data`}
//                 id="edit"
//                 name="edit"
//                 checked={edit}
//                 onChange={({target: {checked}}) => setEdit(checked)} />
                  
//             </Form.Group>

//             {isEqual(errorMessage, '') && (
//               <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px'}}>
//                 <small style={{color: 'red'}}>Username does not exist</small>
//               </div>
//             )}
            
//             <div style={{display: 'flex'}}>
//               <Button fluid basic loading={isLoading} disabled={isEqual(username, '')} color="teal" content="Give Permission" type="button" onClick={givePermissionHandler} />
//               <Button fluid basic content="Cancel" onClick={close} />
//             </div>

//         </Form>
//       </Modal.Content>
//     </Modal>
//   );
// }
