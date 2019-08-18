import React from 'react';
import {Field, withFormik} from 'formik';
import {Button, Input, Dropdown, Divider, Form} from 'semantic-ui-react'
import axios from 'axios';
import {url} from '../../../endpoints/index';

const Status = (props) => {
  const {handleSubmit, partner, setFieldValue, values} = props;
  const options = [
    {
      key: 0,
      text: 'Sold',
      value: true,
    },
    {
      key: 1,
      text: 'Unsold',
      value: false,
    }
  ];

  const kiki = ({field}) => {
    return (
      <Dropdown
        defaultValue={values.soldStatus}
        selection
        onChange={(e, data) => setFieldValue('soldStatus', data.value)}
        options={options}
        fluid/>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form as="div">
      <Input
        fluid
        action={{ color: 'teal', labelPosition: 'left', icon: 'user', content: 'Partner' }}
        actionPosition='left'
        value={partner}/>
        <Divider />
        <Form.Group widths='equal'>
          <Form.Field>
            <label htmlFor="year">Status</label>
            <Field
              name="soldStatus"
              component={kiki} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="priceSold">Price Sold</label>
            <Field id="priceSold" type="number" name="priceSold" />
          </Form.Field>

          <Form.Field>
            <label htmlFor="yearSold">Year Sold</label>
            <Field id="yearSold" type="text" name="yearSold" />
          </Form.Field>
        </Form.Group>

        <Button type="submit" content="Save" />
      </Form>
    </form>
  );
}

export default withFormik({
  mapPropsToValues(props) {
    return {
      soldStatus: (props.sold || false),
      priceSold: (props.priceSold === '0' ? '' : props.priceSold),
      yearSold: (!props.yearSold ? '' : props.yearSold),
    }
  },
  handleSubmit(formValues, formikProps) {
    if(!formValues.soldStatus) {
      formikProps.setFieldValue('priceSold', '');
      formikProps.setFieldValue('yearSold', '');
    }
    axios.post(`${url}/updatecarstatus/${formikProps.props.carId}`, formValues, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      formikProps.props.setIsCarStatusLoaded(false);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
})(Status);
