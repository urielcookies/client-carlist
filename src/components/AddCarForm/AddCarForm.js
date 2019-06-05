import React, {useState} from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import {withFormik, Form as FormikForm, Field} from 'formik';
import { Card, Form, Icon, Divider, Input, Header, TextArea, Button, Select, Radio } from 'semantic-ui-react'
import  { Redirect } from 'react-router-dom'

import {url} from '../../endpoints';

const AddCarForm = (props) => {
  const {
    edit,
    values,
    setFieldValue,
  } = props;

  const [remove, setRemove] = useState(false);
  const [ret, setRet] = useState(false);
  const [images, setImages] = useState([]);

  const deleteCarInfo = () => {
    axios.post(`${url}/deleteCar/${props.carId}`, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      console.log(props);
      setRemove(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  if (remove) {
    if (url === 'http://localhost:5000') {
      window.location.href = "http://localhost:3000/#/cars"
    } else {
      window.location.href = "http://sellingcrap.com/#/cars"
    }
    // window.location.href = "http://sellingcrap.com/#/cars"
    // return <Redirect to='/cars' />
  }


  const oneLastTime = (imgs) => {
    if(ret){
      setRet(false);
      const kiki = [];
      for (const element in imgs) {
        if (typeof imgs[element] === "object") {
          const reader = new FileReader();
          reader.onload = function(){
            kiki.push(reader.result)
            if (kiki.length === values.images.length) {
              setImages(kiki)
            }  
          };
          reader.readAsDataURL(imgs[element]);
        }
      }
    }
  };

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
              <Field id="cleanTitle" type="checkbox" name="cleanTitle" checked={values.cleanTitle} />
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
                        setRet(true);             
                        setImages([])
                        setFieldValue("images", event.currentTarget.files);
                      }} />
                    </span>
                  </label>
                </Form.Field>
            </Form.Group>
          }
          {oneLastTime(values.images)}
          {Boolean(images.length) &&
            <div>
              <Divider />
              <Card.Group itemsPerRow={4}>
                {images.map((image, index) => {
                  return <Card key={index} color='red' image={image} />;
                })}
              </Card.Group>  
            </div>
          }
          <Divider />
          <Button color='teal'>{(edit ? 'Update' : 'Submit')}</Button>
        </FormikForm>
        {
          edit && <Button onClick={deleteCarInfo}>Delete Car Information</Button>
        }
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
      cleanTitle: formikProps.cleanTitle || false,
      notes: formikProps.notes || '',
      images: ''
    }
  },
  handleSubmit(values, formikProps) {
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

    console.log(formikProps.props.carId);
    if (formikProps.props.edit) {
      axios.post(`${url}/updatecarinfo/${formikProps.props.carId}`, formData, {
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': '*',
        }
      })
      .then(function (response) {
        console.log(response);
        formikProps.props.setIsCarInfoLoaded(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
        axios.post(`${url}/upload`, formData, {
          headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          'Accept': '*',
          }
        })
          .then(function (response) {
            if (url === 'http://localhost:5000') {
              window.location.href = "http://localhost:3000/#/cars"
            } else {
              window.location.href = "http://sellingcrap.com/#/cars"
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
  }
})(AddCarForm);
