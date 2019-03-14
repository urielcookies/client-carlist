import React, {useState} from 'react';
import { Container, Table, Button, Divider, Icon, Header, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import {withFormik, Form as FormikForm, Field} from 'formik';

const DeleteExpense = (props) => (
  <Modal
    trigger={<Button size='small' icon='trash alternate' onClick={props.handleOpen} />}
    open={props.modalOpen}
    onClose={props.handleClose}
    basic
    size='small'
  >
    <Header icon='browser' content='Delete Expense' />
    <Modal.Content>
      <h3>Are you sure you want to delete this?</h3>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='blue' onClick={props.handleClose} inverted>
        <Icon name='cancel' /> No
      </Button>
      <Button color='red' onClick={props.removeExpense} inverted>
        <Icon name='remove' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

const CarInvestment = (props) => {
  const {
    expenses,
    setFieldValue
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [updateMode, setUpdateMode] = useState(false)

  const [cost, setCost] = useState('');
  const [expense, setExpense] = useState('');

  const cancel = () => {
    setUpdateMode(false);
  };

  const handleOpen = () => {
    setModalOpen(true)
  }

  const removeExpense = () => {
    console.log('REMOVED');
    setModalOpen(false);
  }

  const handleClose = () => {
    setModalOpen(false);
  }

  const addExpense = () => {
    console.log('Add Expense');
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
              <label htmlFor="model">Expense</label>
              {!updateMode && <Field type="text" name="expense" />}
              {updateMode && <Field type="text" name="expense" onChange={(event) => setExpense(event.target.value)} value={expense} />}
              <label htmlFor="model">Cost</label>
              {!updateMode && <Field type="number" name="cost" />}
              {updateMode && <Field type="number" name="cost" onChange={(event) => setCost(event.target.value)} value={cost} />}
            </Form.Group>
            <div style={{textAlign: 'right'}}>
              <br />
              <Button
                onClick={(!updateMode ? addExpense : updateExpense)}>
                  {(!updateMode ? 'Add' : 'Update')}
              </Button>
              {!updateMode && <Button type='reset'>Cancel</Button>}
              {updateMode && <Button onClick={cancel}>Cancel</Button>}
            </div>
        </FormikForm>
      </Form>

      <Divider horizontal>
        <Header as='h4'>
          <Icon name='dollar sign' />
          Expenses
        </Header>
      </Divider>

      <Table unstackable basic='very'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Expense</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{
          expenses.map((expense) => {
            return (
              <Table.Row key={expense.id}>
                <Table.Cell>{expense.expense}</Table.Cell>
                <Table.Cell>{expense.cost}</Table.Cell>
                <Table.Cell>
                  <Button size='small' icon='edit outline' onClick={() => {
                    setUpdateMode(true);
                    setExpense(expense.expense);
                    setCost(expense.cost);
                    }} />
                  <DeleteExpense {...modalProps} />
                </Table.Cell>
              </Table.Row>
            );
          })
        }</Table.Body>
      </Table>
    </div>
  );
};

export default withFormik({
  mapPropsToValues(formikProps) {
    return {
      cost: '',
      expense: '',
    }
  },
  handleSubmit(formValues, formikProps) {
    formikProps.resetForm();
    console.log('formValues', formValues);
    console.log('formikProps', formikProps);
  }
})(CarInvestment);