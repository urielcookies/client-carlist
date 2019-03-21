import React, {useState} from 'react';
import axios from 'axios';
import { Container, Table, Button, Divider, Icon, Header, Modal } from 'semantic-ui-react'
import { Step, Input } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import {withFormik, Form as FormikForm, Field} from 'formik';

import {deleteCarExpense} from '../../../endpoints/index';
// const DeleteExpense = (props) => (
//   <Modal
//     name={props.expenseId}
//     trigger={<Button size='small' icon='trash alternate' onClick={props.handleOpen} />}
//     open={props.modalOpen}
//     onClose={props.handleClose}
//     basic
//     size='small'
//   >
//     <Header icon='browser' content='Delete Expense' />
//     <Modal.Content>
//       <h3>Are you sure you want to delete this?</h3>
//     </Modal.Content>
//     <Modal.Actions>
//       <Button basic color='blue' onClick={props.handleClose} inverted>
//         <Icon name='cancel' /> No
//       </Button>
//       {console.log('expense id', props.expenseId)}
//       <Button color='red' onClick={() => props.removeExpense(props.expenseId)} inverted>
//         <Icon name='remove' /> Yes
//       </Button>
//     </Modal.Actions>
//   </Modal>
// )



// const DeleteExpense = (props) => {
//   return (
//     <button onClick={() => alert(props.expenseId)}>
//       hi
//     </button>
//   );
// };









// need to update ezxpenses!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!S
// update car info
// delete images
// delete car id
// upload images
// veichle sold???
// How Much???
// image modal in home page
const CarInvestment = (props) => {
  const {
    expenses,
    setFieldValue
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false)
  const [expenseId, setExpenseId] = useState(null)
  

  const [cost, setCost] = useState('');
  const [expense, setExpense] = useState('');

  const cancel = () => {
    setUpdateMode(false);
  };

  const handleOpen = (expenseId) => {
    setExpenseId(expenseId);
    setModalOpen(true)
  }

  const removeExpense = () => {
    console.log('REMOVED', expenseId);
    deleteCarExpense(expenseId, props.setIsExpensesLoaded)
    setModalOpen(false);
  }

  const handleClose = () => {
    setModalOpen(false);
  }

  const addExpense = () => {
    // props.submitForm();
    cancel();
  }

  const updateExpense = () => {
    setFieldValue('expense', expense);
    setFieldValue('cost', cost);
    cancel();
  }

  const modalProps = {
    handleOpen,
    modalOpen,
    handleClose,
    removeExpense,
  }

  // const DeleteExpense = (props) => (
  //   <Modal
  //     name={props.expenseId}
  //     // trigger={<Button size='small' icon='trash alternate' onClick={props.handleOpen} />}
  //     open={props.modalOpen}
  //     onClose={props.handleClose}
  //     basic
  //     size='small'
  //   >
  //     <Header icon='browser' content='Delete Expense' />
  //     <Modal.Content>
  //       <h3>Are you sure you want to delete this?</h3>
  //     </Modal.Content>
  //     <Modal.Actions>
  //       <Button basic color='blue' onClick={props.handleClose} inverted>
  //         <Icon name='cancel' /> No
  //       </Button>
  //       {console.log('expense id', props.expenseId)}
  //       <Button color='red' onClick={() => props.removeExpense(props.expenseId)} inverted>
  //         <Icon name='remove' /> Yes
  //       </Button>
  //     </Modal.Actions>
  //   </Modal>
  // )

  return (
    <div>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='wrench' />
          Expenses
        </Header>
      </Divider>

      <Form as="div">
        <FormikForm>
          <Form.Group widths='equal'>
            <Form.Field>
              <label htmlFor="expense">Expense</label>
              {!updateMode && <Field id="expense" type="text" name="expense" />}
              {updateMode && <Field id="expense" type="text" name="expense" onChange={(event) => setExpense(event.target.value)} value={expense} />}
            </Form.Field>
            <Form.Field>
              <label htmlFor="cost">Cost</label>
              {!updateMode && <Field id="cost" type="number" name="cost" />}
              {updateMode && <Field id="cost" type="number" name="cost" onChange={(event) => setCost(event.target.value)} value={cost} />}
            </Form.Field>

            </Form.Group>
            <div style={{textAlign: 'right'}}>
              {/* <br /> */}
              <Button
                onClick={(!updateMode ? addExpense : updateExpense)}>
                  {(!updateMode ? 'Add' : 'Update')}
              </Button>
              {!updateMode && <Button type='reset'>Cancel</Button>}
              {updateMode && <Button onClick={cancel}>Cancel</Button>}
            </div>
        </FormikForm>
      </Form>

      {
        Boolean(expense.length)
        ||
        <div>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='dollar sign' />
              {
                Number(expenses.reduce((result, record) => {
                  return result + Number(record.cost)
                }, 0)) + Number(props.cost)
              } in Total
            </Header>
          </Divider>

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
                  <Table.Row key={expense.expenseId}>
                    <Table.Cell textAlign="center" width="4">{expense.expense}</Table.Cell>
                    <Table.Cell textAlign="center" width="2">{expense.cost}</Table.Cell>
                    <Table.Cell textAlign="center" width="6">
                      <Button size='tiny' icon='edit outline' onClick={() => {
                        setUpdateMode(true);
                        setExpense(expense.expense);
                        setCost(expense.cost);
                        }} />
                      {/* <DeleteExpense {...modalProps} expenseId={expense.expenseId} /> */}
                      {/* <DeleteExpense expenseId={expense.expenseId} /> */}
                      
                      <Button size='tiny' icon='trash alternate' onClick={() => handleOpen(expense.expenseId)} />
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }</Table.Body>
          </Table>

          <Divider horizontal>
          <Header as='h4'>
              <Icon name='check' />
              {
                expenses.reduce((result, record) => {
                  return result + Number(record.cost)
                }, 0)
              } in Expenses
            </Header>
          </Divider>

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
          </Modal>
        </div>
      }
    </div>
  );
};

export default withFormik({
  mapPropsToValues() {
    return {
      cost: '',
      expense: '',
    }
  },
  handleSubmit(formValues, formikProps) {
    console.log('formValues', formValues);
    if (!formValues.cost) {
      return
    }
    if (typeof formValues.cost === 'string') {
      return
    }
    if (!formValues.expense.length) {
      return
    }

    formikProps.resetForm();

    console.log('formikProps', formikProps);

    const formData = new FormData();
  
    for (const key in formValues) {
      formData.append(key, formValues[key]);
    }
    console.log('formdata', [...formData])
    axios.post(`http://127.0.0.1:5000/createexpense/${formikProps.props.carId}`, formData, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      formikProps.props.setIsExpensesLoaded(false)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
})(CarInvestment);