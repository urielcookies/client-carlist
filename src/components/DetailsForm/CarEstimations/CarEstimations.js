import React, {useState, useEffect} from 'react';
import { Table, Input, Divider, Icon, Header} from 'semantic-ui-react'
import './style.css';

const CarEstimations = (props) => {
  const {
    cost,
    expenses,
  } = props;

  const [estimateProfit, setEstimateProfit] = useState(0);
  const [halfed, setHalfed] = useState(0);
  const [roi, setROI] = useState(0);
  const [division, setDivision] = useState(2);

  const totalInvestment = expenses.reduce((result, record) => {
    return result + Number(record.Cost)
  }, 0) + Number(cost);

  const expense = expenses.reduce((result, record) => {
    return result + Number(record.Cost)
  }, 0)

  const changeHandler = (event) => {
    if (Number(event.target.value)) {
      const input = Number(event.target.value);
      setEstimateProfit(
        input - totalInvestment
      );
      setHalfed(
        (input - totalInvestment) / 2
      );
      setROI(
        (((input - totalInvestment) / totalInvestment) * 100).toFixed(2)
      )
      setDefaultEstimateSale(input)
    } else {
      setEstimateProfit(0)
      setHalfed(0)
      setROI(0)
      setDefaultEstimateSale(0)
    }
  };

  const [defaultEstimateSale, setDefaultEstimateSale] = useState(0);
  useEffect(() => {
    totalInvestment && setDefaultEstimateSale(((30 * totalInvestment) / 100) + totalInvestment)
  }, [totalInvestment])

  return (
    <div>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='bar chart' />
          Car Data
        </Header>
      </Divider>

      <Table definition unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="left" width={4}>Car</Table.Cell>
            <Table.Cell textAlign="center">
              {cost}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Expenses</Table.Cell>
            <Table.Cell textAlign="center">
              {expense}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Total</Table.Cell>
            <Table.Cell textAlign="center">
              {totalInvestment}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
          
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='calculator' />
          Estimates
        </Header>
      </Divider>

      <Table definition unstackable>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="left" width={4}>Estimate Profit</Table.Cell>
            <Table.Cell positive={(estimateProfit > 0)} negative={(estimateProfit < 0)} textAlign="center">
              {estimateProfit}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Divided by</Table.Cell>
            <Table.Cell textAlign="center">
              <Input type="number" defaultValue={division} onChange={(e, {value}) => setDivision(value)} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Return of {division}</Table.Cell>
            <Table.Cell positive={(halfed > 0)} negative={(halfed < 0)} textAlign="center">
              {halfed}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Return of Investment</Table.Cell>
            <Table.Cell positive={(roi > 0)} negative={(roi < 0)} textAlign="center">
              {roi}%
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Estimate Sale</Table.Cell>
            <Table.Cell textAlign="center">
              <Input type="number" value={defaultEstimateSale} onChange={changeHandler} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
}

export default CarEstimations;
