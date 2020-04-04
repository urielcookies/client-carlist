import React, {useState} from 'react';
import numeral from 'numeral';
import {Button,Divider, Header, Icon, Table} from 'semantic-ui-react'

import AddCarFormStyle from './AddCarFormStyle';

const AddCarForm = (props) => {
  const {
    Brand,
    CleanTitle,
    Cost,
    Model,
    Notes,
    userHasWritePermissions,
    Year
  } = props;

  const [editMode, setEditMode] = useState(false);
  const editModeHandler = () => setEditMode(!editMode);

  return (
    <AddCarFormStyle>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='file alternate outline' />
          Car Information
        </Header>
      </Divider>

      {userHasWritePermissions && !editMode && (
      <Button
        fluid
        content='Edit Car Information'
        color="teal"
        basic
        onClick={editModeHandler} />
      )}
        
      {editMode && (
        <div className="actionButtons">
          <Button fluid basic color="teal" content="Save" />
          <Button fluid basic content="Cancel" onClick={editModeHandler} />
        </div>
      )}
      
      {editMode 
      ? (
        <div>EDIT MODE</div>
        )
      : (
          <Table definition unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="left" width={5}>Year</Table.Cell>
                <Table.Cell textAlign="center">
                  {Year}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Brand</Table.Cell>
                <Table.Cell textAlign="center">
                  {Brand}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Model</Table.Cell>
                <Table.Cell textAlign="center">
                  {Model}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Cost</Table.Cell>
                <Table.Cell textAlign="center">
                  {numeral(Cost).format('$0,0.00')}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Clean Title</Table.Cell>
                <Table.Cell textAlign="center">
                  {CleanTitle ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Notes</Table.Cell>
                <Table.Cell textAlign="center">
                  {Notes}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        )
      }
    </AddCarFormStyle>
  );
}

export default AddCarForm;