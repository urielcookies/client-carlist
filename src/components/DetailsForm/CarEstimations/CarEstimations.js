import React, {useState, useEffect} from 'react';
import numeral from 'numeral';
import { Table, Input, Divider, Icon, Header} from 'semantic-ui-react'

const CarEstimations = (props) => {
  const {
    cost,
    expenses,
  } = props;

  const [estimateProfit, setEstimateProfit] = useState(0);
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

      setDividedCash(
        (input - totalInvestment) / division
      );

      setROI(
        (((input - totalInvestment) / totalInvestment) * 100).toFixed(2)
      )

      event.target.value = Number(event.target.value)
      setDefaultEstimateSale(input)
    } else {
      setEstimateProfit(0)
      setROI(0)
      setDividedCash(0);
      setDefaultEstimateSale(0)
    }
  };

  const [defaultEstimateSale, setDefaultEstimateSale] = useState(0);
  const [dividedCash, setDividedCash] = useState(0);
  useEffect(() => {
    if (totalInvestment) {

    setDefaultEstimateSale(
      (((30 * totalInvestment) / 100) + totalInvestment).toFixed(2)
    )
    
    setDividedCash(
      (Number((((30 * totalInvestment) / 100) + totalInvestment)) - totalInvestment) / division
    )

    setEstimateProfit(
      Number((((30 * totalInvestment) / 100) + totalInvestment)) - totalInvestment
    );

    setROI(
      ((( Number((((30 * totalInvestment) / 100) + totalInvestment).toFixed(2)) - totalInvestment) / totalInvestment) * 100).toFixed(2)
    )
  }
  }, [totalInvestment])

  // require("./stylez.css");
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
              {numeral(cost).format('$0,0.00')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Expenses</Table.Cell>
            <Table.Cell textAlign="center">
              {numeral(expense).format('$0,0.00')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Total</Table.Cell>
            <Table.Cell textAlign="center">
              {numeral(totalInvestment).format('$0,0.00')}
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
              {numeral(estimateProfit).format('$0,0.00')}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Divided by</Table.Cell>
            <Table.Cell textAlign="center">
              <Input type="number" defaultValue={division} onChange={(e, {value}) => {
                setDivision(value)
                setDividedCash(
                  Number(value) ? estimateProfit / value : estimateProfit
                );
              }} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell textAlign="left">Split of {division}</Table.Cell>
            <Table.Cell positive={(dividedCash > 0)} negative={(dividedCash < 0)} textAlign="center">
              {numeral(dividedCash).format('$0,0.00')}
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
