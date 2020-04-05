import React, {useState} from 'react';
import numeral from 'numeral';
import {Button, Divider, Form, Header, Icon, Table} from 'semantic-ui-react'
import {useFormik} from 'formik';

import {updateCarInfo} from '../../endpoints';

import AddCarFormStyle from './AddCarFormStyle';

const AddCarForm = (props) => {
  const {
    Brand,
    CleanTitle,
    Cost,
    Id,
    Model,
    Notes,
    setIsCarInfoLoading,
    userHasWritePermissions,
    Year
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const editModeHandler = () => setEditMode(!editMode);

  const formik = useFormik({
    initialValues: {
      Year: Year || '',
      Brand: Brand || '',
      Model: Model || '',
      Cost: Cost || '',
      CleanTitle: Boolean(CleanTitle),
      Notes: Notes || ''

    },
    onSubmit: values => {
      setSubmitLoading(true);
      updateCarInfo({...values, Id}, setIsCarInfoLoading).then(() => {
        editModeHandler();
        setSubmitLoading(false);
      });
    },
  });

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
        type="button"
        loading={submitLoading}
        onClick={editModeHandler} />
      )}
        
      {editMode && (
        <div className="actionButtons">
          <Button fluid basic color="teal" content="Save" onClick={formik.handleSubmit} />
          <Button fluid basic content="Cancel" onClick={editModeHandler} />
        </div>
      )}
      
      <Divider hidden />

      {editMode 
      ? (
        <div>
           <Form>
              <Form.Group widths='equal'>

                <Form.Input
                  name="Year"
                  type="text"
                  label='Year'
                  onChange={formik.handleChange}
                  value={formik.values.Year} />

                <Form.Input
                  name="Brand"
                  type="text"
                  label='Brand'
                  onChange={formik.handleChange}
                  value={formik.values.Brand} />

                <Form.Input
                  name="Model"
                  type="text"
                  label='Brand'
                  onChange={formik.handleChange}
                  value={formik.values.Model} />

                <Form.Input
                  name="Cost"
                  type="number"
                  label='Cost'
                  onChange={formik.handleChange}
                  value={formik.values.Cost} />

                <Form.Checkbox
                  toggle
                  label='Clean Title'
                  id="CleanTitle"
                  name="CleanTitle"
                  checked={formik.values.CleanTitle}
                  onChange={formik.handleChange} />

                <Form.TextArea
                  name="Notes"
                  label='Notes'
                  onChange={formik.handleChange}
                  value={formik.values.Notes} />

              </Form.Group>
          </Form>
        </div>
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