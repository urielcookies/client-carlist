import React, {useState} from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import {withFormik, Form as FormikForm, Field} from 'formik';
import { Form, Icon, Divider, Input, Header, TextArea, Button, Select, Radio } from 'semantic-ui-react'

const AddCarForm = (props) => {
  const {
    initialValues,
    setFieldValue,
  } = props;

  return (
    <Container>
      <Header as='h2'>
        <Icon name='car' />
        <Header.Content>Car Information</Header.Content>
      </Header>
      <Form as="div">
        <FormikForm>

          <Form.Group widths='equal'>
            <Form.Field>
              <label htmlFor="year">Year</label>
              <Field id="year" type="text" name="year" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="brand">Brand</label>
              <Field id="brand" type="text" name="brand" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="model">Model</label>
              <Field id="model" type="text" name="model" />
            </Form.Field>
          </Form.Group>

          <Form.Group inline>
            <Form.Field>
              <label htmlFor="cost">Cost</label>
              <Field id="cost" type="number" name="cost" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="cleanTitle">Clean Title</label>
              <Field id="cleanTitle" type="checkbox" name="cleanTitle" checked={initialValues.cleanTitle} />
            </Form.Field>
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Field>
              <label htmlFor="notes">Notes</label>
              <Field id="notes" component="textarea" name="notes" />
            </Form.Field>
          </Form.Group>
          {
            !Boolean(props.location)
            ||
            <Form.Group style={{width: '50%', margin: '0 auto'}}>
              <Form.Field>
                  <label htmlFor="images" style={{
                    fontSize: '13px',
                    position: 'relative',
                    background: 'rgb(224, 225, 226)',
                    height: '40px',
                    width: '180px',
                    borderRadius: '15px'
                  }}>
                    <span style={{
                        width: '50%',
                        height: '50%',
                        overflow: 'auto',
                        margin: 'auto',
                        position: 'absolute',
                        top: '0', left: '0', bottom: '0', right: '0',
                      }}>
                        <i className="upload icon"></i>
                        Add Images
                      <input multiple id="images" name="images" type="file" style={{display: 'none'}} onChange={(event) => {
                          setFieldValue("images", event.currentTarget.files);
                      }} />
                    </span>
                  </label>
                </Form.Field>
            </Form.Group>
          }
          <Divider />
          <Button color='teal'>Submit</Button>
        </FormikForm>
      </Form>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues(formikProps) {
    return {
      year: formikProps.year || '',
      brand: formikProps.brand || '',
      model: formikProps.model || '',
      cost: formikProps.cost || '',
      cleanTitle: formikProps.cleanTitle,
      notes: formikProps.notes || '',
      images: ''
    }
  },
  handleSubmit(values) {
    console.log('handleSubmit', values);

    const formData = new FormData();
    for (const key in values) {
      if (key === 'images') {
        Object.keys(values[key]).forEach((number) => {
          formData.append(`image-${Number(number)}`, values[key][Number(number)]);
        })
      }
      else {
        formData.append(key, values[key]);
      }
    }
    console.log([...formData])
    axios.post('http://127.0.0.1:5000/upload', formData, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
})(AddCarForm);
