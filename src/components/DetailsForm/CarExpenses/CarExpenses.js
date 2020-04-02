import React, {useState} from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {isEmpty} from 'lodash';
import {Table, Button, Divider, Icon, Header, Modal, Form, Dimmer, Loader } from 'semantic-ui-react';
import {useFormik, withFormik, Form as FormikForm, Field} from 'formik';

import {createExpense, updateExpense, deleteExpense} from '../../../endpoints/index';

const CarInvestment = (props) => {
  const {
    carId,
    expenses,
    isCarExpensesLoading,
    userHasWritePermissions,
    setIsCarExpensesLoading,
  } = props;

  const [updateMode, setUpdateMode] = useState(false);
  const [updateExpenseInfo, setUpdateExpenseInfo] = useState(null)

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const [deleteMode, setDeleteMode] = useState(false)

  const updateExpenseHandler = (expense, mode) => {
    if (mode === 'delete') {
      setDeleteMode(true)
    } else setDeleteMode(false);
    setOpenAddExpenseModal(true);
    setUpdateMode(true);
    setUpdateExpenseInfo(expense);

    formik.setFieldValue('Id', expense.Id);
    formik.setFieldValue('Expense', expense.Expense);
    formik.setFieldValue('Cost', expense.Cost);
  };

  // MAKE DELETE SAME MODAL JUST CHANGE SAVE TO DLETE AND HAVE A DELETE STATE FOR HEADER
  // THINK OF ADDING A BOTTOM FOOTER WITH HOME, MY CARS, SETTINGS WHERE THE ROYERS SLIDE FROM LEFT TO RIGHT
  // ASC DESC SELECT OPYION


  const formik = useFormik({
    initialValues: {
      CarInformationId: carId,
      Expense:  '',
      Cost: '',
    },
    onSubmit: values => {
      if (!deleteMode && updateMode) {
        updateExpense(values, setIsCarExpensesLoading);
      } else if (!deleteMode) {
        createExpense(values, setIsCarExpensesLoading)
      }
      formik.resetForm();
      setUpdateMode(false);
      setUpdateExpenseInfo(null);
      setOpenAddExpenseModal(false);
      setDeleteMode(false);
      // setIsCarExpensesLoading(true);
    },
  });

  return (
    <div>
      {userHasWritePermissions && <Button fluid content="Add Expense" color="teal" basic onClick={() => {setOpenAddExpenseModal(true); setUpdateMode(false)}} />}
        <div>
          <Divider />          

          <Divider horizontal>
            <Header as='h4'>
              <Icon name='wrench' />
              Expenses
            </Header>
          </Divider>
          <Divider />
          
          {isCarExpensesLoading
          ? <div style={{height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Loader active inline='centered' /></div>
          : <div style={{maxHeight: '50vh', overflowX: 'auto'}}>
              <Table unstackable basic='very'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center">Expense</Table.HeaderCell>
                    <Table.HeaderCell textAlign="center">Cost</Table.HeaderCell>
                    {userHasWritePermissions && <Table.HeaderCell textAlign="center">Actions</Table.HeaderCell>}
                  </Table.Row>
                </Table.Header>

                <Table.Body>{
                  expenses.map((expense) => {
                    return (
                      <Table.Row key={expense.Id}>
                        <Table.Cell textAlign="center" width="4">{expense.Expense}</Table.Cell>
                        <Table.Cell textAlign="center" width="2">{numeral(expense.Cost).format('$0,0.00')}</Table.Cell>
                        {userHasWritePermissions && 
                          <Table.Cell textAlign="center" width="6">
                            <Button size='tiny' icon='edit outline' onClick={() => updateExpenseHandler(expense)} />
                            <Button size='tiny' icon='trash alternate' onClick={() => updateExpenseHandler(expense, 'delete')} />
                          </Table.Cell>
                        }
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
            <Modal.Header style={{color: 'black', textAlign: 'center'}}>{deleteMode ? 'Delete' : updateMode ? 'Update' : 'Add'} Car Expense</Modal.Header>
            <Modal.Content>
              <Form as="div">
                <form onSubmit={formik.handleSubmit}>
                  <Form.Group widths='equal'>

                      <Form.Input
                        name="Expense"
                        type="text"
                        label='Expense'
                        placeholder='Engine Swap'
                        onChange={formik.handleChange}
                        value={formik.values.Expense} />

                      <Form.Input
                        name="Cost"
                        type="number"
                        label='Cost'
                        placeholder='3.14'
                        onChange={formik.handleChange}
                        value={formik.values.Cost} />
                          
                    </Form.Group>
                    {updateMode && <div style={{color: 'gray', padding: '5px 0 10px 0', textAlign: 'center'}}>Created on {moment.utc(updateExpenseInfo.CreatedTime).local().format('LLL')}</div>}
                    <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}} >
                      {!deleteMode
                        ? <Button basic color="teal" type="submit" disabled={formik.values.Cost === "" || formik.values.Expense === ""}>Save</Button>
                        : <Button basic color="red" onClick={() => {deleteExpense(updateExpenseInfo.Id, setIsCarExpensesLoading); setDeleteMode(false)}}>Delete</Button>
                      }
                      <Button basic onClick={() => {setOpenAddExpenseModal(false); setUpdateExpenseInfo(false); setUpdateMode(false); setDeleteMode(false); formik.resetForm()}} >Cancel</Button>
                    </div>
                </form>
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

// export default withFormik({
//   mapPropsToValues() {
//     return {
//       Cost: '',
//       Expense: '',
//     }
//   },
//   handleSubmit(formValues, formikProps) {
//     // to be removed
//     console.log('?', formValues)
//   }
// })(CarInvestment);

export default CarInvestment;
