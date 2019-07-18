import React from 'react';
import {Field, withFormik} from 'formik';
import {Button, Input, Dropdown, Form} from 'semantic-ui-react'
import axios from 'axios';
import {url} from '../../../endpoints/index';

const Status = ({handleSubmit, setFieldValue, values}) => {
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

  const kiki_2 = (props) => {
    console.log(values);
    const {field} = props;
    return (
      <Input
        defaultValue={values.priceSold}
        onChange={(e, data) => setFieldValue('priceSold', data.value)}
        placeholder="price sold"
        type="number"
        fluid/>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Form as="div">
        <Form.Group widths='equal'>
          <Form.Field>
            <label htmlFor="year">Status</label>
            <Field
              name="soldStatus"
              component={kiki} />
          </Form.Field>

          <Form.Field>
            <label htmlFor="year">Price Sold</label>
            <Field id="year" type="number" name="priceSold" />
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
      priceSold: (props.priceSold || ""),
    }
  },
  handleSubmit(formValues, formikProps) {
    if (formValues.sold === "" || formValues.priceSold === "") {
      return;
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
