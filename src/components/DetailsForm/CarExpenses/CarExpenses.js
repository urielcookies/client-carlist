// import React from 'react';

// const CarExpenses = (props) => {
//   // console.log('Car expenses props', props);
//   return (
//     <div>
//       Car Expenses
//     </div>
//   );
// }

// export default CarExpenses;




import React, {useState} from 'react';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {Table, Button, Divider, Icon, Header, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import {withFormik, Field} from 'formik';

import {deleteCarExpense, url} from '../../../endpoints/index';

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
    setFieldValue,
    values,
    resetForm
  } = props;

  // console.log('props', props);


  const [modalOpen, setModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false)
  const [expenseId, setExpenseId] = useState(null)
  

  const [cost, setCost] = useState('');
  const [expense, setExpense] = useState('');

  // const [updateField, setUpdateField] = useState(false);

  const cancel = () => {
    setUpdateMode(false);
  };

  const handleOpen = (expenseId) => {
    setExpenseId(expenseId);
    setModalOpen(true)
  }

  const removeExpense = () => {
    deleteCarExpense(expenseId, props.setIsExpensesLoaded)
    setModalOpen(false);
  }

  const handleClose = () => {
    setModalOpen(false);
  }

  const addExpense = () => {
    // props.submitForm();
    // cancel();
  }

  const updateExpense = () => {
    setFieldValue('expense', expense);
    setFieldValue('cost', cost);
    // cancel();
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

  const kiki = () => {
    if (!values.cost) {
      return
    }
    // if (typeof formValues.cost === 'string') {
    //   return
    // }
    if (!values.expense.length) {
      return
    }

    resetForm();

    const formData = new FormData();
  
    for (const key in values) {
      formData.append(key, values[key]);
    }
    console.log('formdata', [...formData])
    if (updateMode) {
      console.log('Update')
      axios.post(`${url}/updateexpense/${expenseId}`, formData, {
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': '*',
        }
      })
      .then(function (response) {
        props.setIsExpensesLoaded(false)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    } 
    else {
      console.log('Craete')
      axios.post(`${url}/createexpense/${props.carId}`, formData, {
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': '*',
        }
      })
      .then(function (response) {
        props.setIsExpensesLoaded(false)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    cancel();
    
    // axios.post(`http://127.0.0.1:5000/createexpense/${formikProps.props.carId}`, formData, {
    //   headers: {
    //   'Content-Type': 'application/json',
    //   "Access-Control-Allow-Origin": "*",
    //   'Accept': '*',
    //   }
    // })
    // .then(function (response) {
    //   formikProps.props.setIsExpensesLoaded(false)
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  console.log('updateMode', updateMode);
  console.log('uexpenses', expenses);
  return (
    <div>
      <Button fluid content="Add Expense" color="teal" basic />
      {/* <Form as="div">
        <form onSubmit={kiki}>
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
              <Button
                onClick={(!updateMode ? addExpense : updateExpense)}>
                  {(!updateMode ? 'Add' : 'Update')}
              </Button>
              {!updateMode && <Button type='reset'>Cancel</Button>}
              {updateMode && <Button onClick={cancel}>Cancel</Button>}
            </div>
        </form>
      </Form> */}
      {
        // Boolean(expense.length)
        // ||
        <div>
          <Divider />          

          <Table definition unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="left" width={4}>Car</Table.Cell>
                <Table.Cell textAlign="center">
                  {Number(props.Cost)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Expenses</Table.Cell>
                <Table.Cell textAlign="center">
                  {
                    expenses.reduce((result, record) => {
                      return result + Number(record.Cost)
                    }, 0)
                  }
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell textAlign="left">Total</Table.Cell>
                <Table.Cell textAlign="center">
                  {
                    Number(expenses.reduce((result, record) => {
                      return result + Number(record.Cost)
                    }, 0)) + Number(props.Cost)
                  }
                </Table.Cell>
              </Table.Row>

            </Table.Body>
          </Table>
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
                      <Button size='tiny' icon='edit outline' onClick={() => {
                        setUpdateMode(true);
                        setExpense(expense.Expense);
                        setCost(expense.Cost);
                        setExpenseId(expense.Id);
                        }} />
                      {/* <DeleteExpense {...modalProps} expenseId={expense.expenseId} /> */}
                      {/* <DeleteExpense expenseId={expense.expenseId} /> */}
                      
                      <Button size='tiny' icon='trash alternate' onClick={() => handleOpen(expense.Id)} />
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }</Table.Body>
          </Table>
          </div>}

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
    // to be removed
    console.log()
  }
})(CarInvestment);
