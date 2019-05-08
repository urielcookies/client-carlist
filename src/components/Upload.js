import React from 'react';
import axios from 'axios';
import {withFormik, Form, Field} from 'formik';

const UploadForm = (props) => {
  const {
      setFieldValue,
      values
  } = props;

  return (
    <div>
      <Form>
        <div>
          <Field type="text" name="car_name" />
        </div>
        <div>
          <Field type="number" name="year" />    
        </div>
        <div>
          <label>
              <Field type="checkbox" name="clean" checked={values.clean} />
              Clean title
          </label>
        </div>
        <div>
          <Field component="select" name="brand" >
            <option value="Ford">Ford</option>
            <option value="GMC">GMC</option>
          </Field>  
        </div>
        <div>
          <input name="file" type="file" onChange={(event) => {
              setFieldValue("file", event.currentTarget.files[0]);
          }} />
        </div>
            <button>Submit</button>
      </Form>
    </div>
  );
};

export default withFormik({
  mapPropsToValues(formikProps) {
    return {
      car_name: formikProps.carName || '',
      year: formikProps.year || '',
      clean: formikProps.clean || true,
      brand: formikProps.brand || 'GMC',
      file: ''
    }
  },
  handleSubmit(values) {
    // console.log(values);
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    console.log(...formData)
    // console.log(values)
    // console.log(JSON.stringify(values))
    // axios.get('http://127.0.0.1:5000/upload')
    axios.post('http://uriel.sellingcrap.com/upload', formData, {
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
    // fetch('http://localhost:5000/upload', { // Your POST endpoint
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   mode: 'no-cors',
    //   body: formData
    // }).then(
    //   response => response.json() // if the response is a JSON object
    // ).then(
    //   success => console.log(success) // Handle the success response object
    // ).catch(
    //   error => console.log(error) // Handle the error response object
    // );
  }
})(UploadForm);
