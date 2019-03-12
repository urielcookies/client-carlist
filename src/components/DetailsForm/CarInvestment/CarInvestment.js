import React, {useState} from 'react';
import { Container, Table, Button, Divider, Icon, Header, Modal } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'

const dummyData = [
  {
    id: 1,
    expense: 'Engine',
    cost: '600',
  },
  {
    id: 2,
    expense: 'Transmission',
    cost: '600',
  },
  {
    id: 3,
    expense: 'Car Wash',
    cost: '200',
  },
  {
    id: 4,
    expense: 'Engine',
    cost: '60',
  },
];
// trigger={<Button size='small' icon='trash alternate' onClick={props.handleOpen}>Show Modal</Button>}
{/* <Button size='small' icon='trash alternate' /> */}
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

const CarInvestment = () => {
  const [edit, setEdit] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const cancel = () => {
    setEdit({})
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

  const kiki = {
    handleOpen,
    modalOpen,
    handleClose,
    removeExpense,
  }
  console.log('edit', edit);

  return (
    <div>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='wrench' />
          Expenses
        </Header>
      </Divider>

      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Expense' value={(edit.expense ? edit.expense : '')} />
          <Form.Input fluid label='Cost' value={(edit.cost ? edit.cost : '')} />
        </Form.Group>
        <Container textAlign='right'>
          <Button>{(!Object.values(edit).length ? 'Add' : 'Update')}</Button>
          {!!Object.values(edit).length && <Button onClick={cancel}>Cancel</Button>}
        </Container>
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
          dummyData.map((expense) => {
            const editInfo = {
              id: expense.id,
              expense: expense.expense,
              cost: expense.cost,
            }

            return (
              <Table.Row key={expense.id}>
                <Table.Cell>{expense.expense}</Table.Cell>
                <Table.Cell>{expense.cost}</Table.Cell>
                <Table.Cell>
                  <Button size='small' icon='edit outline' onClick={() => setEdit(editInfo)} />
                  <DeleteExpense {...kiki} />
                </Table.Cell>
              </Table.Row>
            );
          })
        }</Table.Body>
      </Table>
    </div>
  );
};

export default CarInvestment;
