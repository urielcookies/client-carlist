import React, {useState} from 'react';
import {Button, Header, Form, Icon, Table, Divider} from 'semantic-ui-react'
import {isEqual, reduce} from 'lodash';
import {useFormik} from 'formik';
import numeral from 'numeral';

import {updateCarStatus} from '../../../endpoints';

import StatusStyle from './StatusStyle';

const Status = (props) => {
  const {
    carExpenses,
    carCost,
    CarInformationId,
    PriceSold,
    setIsCarStatusLoading,
    Sold,
    userHasWritePermissions,
    YearSold
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const editModeHandler = () => setEditMode(!editMode);

  const profit = reduce(carExpenses, (result, {Cost}) => result - Cost, PriceSold - carCost);

  const formik = useFormik({
    initialValues: {
      Sold: Boolean(Sold),
      PriceSold: PriceSold || '',
      YearSold: YearSold || ''
    },
    onSubmit: values => {
      setSubmitLoading(true);
      updateCarStatus({...values, CarInformationId}, setIsCarStatusLoading).then(() => {
        editModeHandler();
        setSubmitLoading(false);
      });
    },
  });

  const disableSave = isEqual(formik.values.PriceSold, '') || isEqual(formik.values.YearSold, '');

  return (
    <StatusStyle>   
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Car Status
        </Header>
      </Divider>

      {userHasWritePermissions && !editMode && (
      <Button
        fluid
        content={Sold ? 'Edit Status' : 'Add Status'}
        color="teal"
        basic
        loading={submitLoading}
        onClick={editModeHandler} />
      )}

      {editMode && (
        <div className="actionButtons">
          <Button disabled={disableSave} fluid basic color="teal" content="Save" type="button" onClick={formik.handleSubmit} />
          <Button fluid basic content="Cancel" onClick={editModeHandler} />
        </div>
      )}
      
      <Divider hidden />

      {editMode
      ? (
          <Form>
            <Form.Group widths='equal'>

              <Form.Checkbox
                toggle
                label='Sold'
                id="Sold"
                name="Sold"
                checked={formik.values.Sold}
                onChange={formik.handleChange} />

              <Form.Input
                name="PriceSold"
                type="number"
                label='Price Sold'
                onChange={formik.handleChange}
                value={formik.values.PriceSold} />

              <Form.Input
                name="YearSold"
                type="number"
                label='Year Sold'
                onChange={formik.handleChange}
                value={formik.values.YearSold} />

            </Form.Group>
          </Form>
        )
      : (
          <Table definition unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="left" width={5}>Status</Table.Cell>
                <Table.Cell textAlign="center">
                  {Sold ? 'Sold' : 'Not Sold'}
                </Table.Cell>
              </Table.Row>
              {Sold &&
                <React.Fragment>
                  <Table.Row>
                    <Table.Cell textAlign="left">Price Sold</Table.Cell>
                    <Table.Cell textAlign="center">
                      {numeral(PriceSold).format('$0,0.00')}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign="left">Year Sold</Table.Cell>
                    <Table.Cell textAlign="center">
                      {YearSold}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell textAlign="left">Profit</Table.Cell>
                    <Table.Cell positive={(profit > 0)} negative={(profit < 0)}  textAlign="center">
                      {numeral(profit).format('$0,0.00')}
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              }
            </Table.Body>
          </Table>
      )}
    </StatusStyle>
  );
}

export default Status;
