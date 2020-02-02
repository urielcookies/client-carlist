import React, {useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Table, Button, Divider, Icon, Header, Modal, Form } from 'semantic-ui-react';
import {withFormik, Form as FormikForm, Field} from 'formik';

import {deleteCarExpense, url} from '../../../endpoints/index';

const Input = (inputProps) => {
  const {label, placeholder, type, defaultValue} = inputProps;
  return (
    <Form.Input fluid {...{defaultValue, label, placeholder, type}} />
  );
};

const CarInvestment = (props) => {
  const {
    expenses,
    setFieldValue,
    values,
    resetForm
  } = props;

  // console.log('props', props);

  // const [modalOpen, setModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateExpenseInfo, setUpdateExpenseInfo] = useState(null)
  // const [expenseId, setExpenseId] = useState(null);
  
  const [cost, setCost] = useState('');
  const [expense, setExpense] = useState('');

  // console.log('updateMode', updateMode);
  // console.log('uexpenses', expenses);

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const updateExpenseHandler = (expense) => {
    setOpenAddExpenseModal(true);
    setUpdateMode(true);
    setUpdateExpenseInfo(expense);
  };

  const saveExpense = () => {
    if (updateMode) {
      console.log('UPDATE EXPENSE');
    } else {
      console.log('CREATE EXPENSE');
    }
  };
  // MAKE DELETE SAME MODAL JUST CHANGE SAVE TO DLETE AND HAVE A DELETE STATE FOR HEADER
  // THINK OF ADDING A BOTTOM FOOTER WITH HOME, MY CARS, SETTINGS WHERE THE ROYERS SLIDE FROM LEFT TO RIGHT
  // ASC DESC SELECT OPYION
  return (
    <div>
      <Button fluid content="Add Expense" color="teal" basic onClick={() => {setOpenAddExpenseModal(true); setUpdateMode(false)}} />
        <div>
          <Divider />          

          <Divider horizontal>
            <Header as='h4'>
              <Icon name='wrench' />
              Expenses
            </Header>
          </Divider>
          <Divider />
          
          {!isEmpty(expenses) && <div style={{maxHeight: '50vh', overflowX: 'auto'}}>
          <Table unstackable basic='very'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign="center">Expense</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Cost</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{
              expenses.map((expense) => {
                return (
                  <Table.Row key={expense.Id}>
                    <Table.Cell textAlign="center" width="4">{expense.Expense}</Table.Cell>
                    <Table.Cell textAlign="center" width="2">{expense.Cost}</Table.Cell>
                    <Table.Cell textAlign="center" width="6">
                      <Button size='tiny' icon='edit outline' onClick={() => updateExpenseHandler(expense)} />
                      <Button size='tiny' icon='trash alternate' onClick={console.log} />
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }</Table.Body>
          </Table>
          </div>}


          <Modal
            closeOnDimmerClick={false}
            open={openAddExpenseModal}
            onClose={() => setOpenAddExpenseModal(false)}
            basic
            size='small'
            style={{backgroundColor: 'white'}}>
              {console.log(updateExpenseInfo)}
            <Modal.Header style={{color: 'black', textAlign: 'center'}}>{updateMode ? 'Update' : 'Add'} Car Expense</Modal.Header>
            <Modal.Content>
              <Form as="div">
                <FormikForm>
                  <Form.Group widths='equal'>

                      <Field
                        name="Expense"
                        component={(fieldProps) => 
                          <Input
                            label='Expense'
                            placeholder='Engine Swap'
                            type="text"
                            {...{defaultValue: updateMode ? updateExpenseInfo.Expense : '', ...fieldProps}} />} />

                      <Field
                        name="Cost" 
                        component={(fieldProps) => 
                          <Input
                          label='Cost'
                          placeholder='3.14'
                          type="number"
                          {...{defaultValue: updateMode ? updateExpenseInfo.Cost : '', ...fieldProps}} />} />

                    </Form.Group>
                    {updateMode && <div style={{color: 'gray', padding: '5px 0 10px 0', textAlign: 'center'}}>Created on {moment.utc(updateExpenseInfo.CreatedTime).local().format('LLL')}</div>}
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}} >
                      <Button basic color="teal" type="submit">Save</Button>
                      <Button basic onClick={() => {setOpenAddExpenseModal(false); setUpdateExpenseInfo(false); setUpdateMode(false);}} >Cancel</Button>
                    </div>
                </FormikForm>
              </Form>
            </Modal.Content>
          </Modal>
{/* 
          <Modal
            open={modalOpen}
            onClose={handleClose}
            basic
            size='small'
          >
            <Header icon='browser' content='Delete Expense' />
            <Modal.Content>
              <h3>Are you sure you want to delete this?</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='blue' onClick={handleClose} inverted>
                <Icon name='cancel' /> No
              </Button>
              <Button color='red' onClick={removeExpense} inverted>
                <Icon name='remove' /> Yes
              </Button>
            </Modal.Actions>
          </Modal> */}
        </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues() {
    return {
      Cost: '',
      Expense: '',
    }
  },
  handleSubmit(formValues, formikProps) {
    // to be removed
    console.log()
  }
})(CarInvestment);
