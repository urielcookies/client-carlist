import React, {useState} from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react'
import {withFormik, Form as FormikForm, Field} from 'formik';
import { Card, Form, Icon, Divider, Dropdown, Input, Header, TextArea, Button, Modal, Image as SematicImage, Loader } from 'semantic-ui-react'
import  { Redirect } from 'react-router-dom'

import {url, fetchPartners} from '../../endpoints';

const AddCarForm = (props) => {
  const {
    edit,
    values,
    setFieldValue,
  } = props;

  const [remove, setRemove] = useState(false);
  const [ret, setRet] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);

  const [deleteModalOpen, setDeleteModal] = useState(false);
  const [partners, setPartners] = useState([]);

  const show = () => setOpen(true)
  const close = () => setOpen(false)

  const handleImage = (image, index) => {
    show();
    setSelectedImage(image);
    setIndex(index);
  };

  const setMain = () => {
    close();
    const first = images[index];
    images.splice(index, 1);
    images.unshift(first);
    setImages(images)
  }

  const removeImage = () => {
    close()
    images.splice(index, 1);
    setImages(images)
  }

  const deleteCarInfo = () => {
    axios.post(`${url}/deleteCar/${props.carId}`, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      console.log('delete response', response);
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

  if (!JSON.parse(localStorage.getItem('authenticated'))) {
    return <Redirect to="/" />;
  }

  const oneLastTime = (imgs) => {
    if(ret){
      setRet(false);
      const kiki = [];
      setLoading(true);
      for (const element in imgs) {
        if (typeof imgs[element] === "object") {
          const reader = new FileReader();
          reader.onload = function(){
            const oth = (ok) => {
              kiki.push(ok)
              if (kiki.length === values.images.length) {
                setImages(kiki)
                setLoading(false);
              } 
            }
            const log = (o) => {
              resetOrientation(reader.result, o, oth)
            }
            // const logz = (o) => {
            //   kiki.push(o)
            // };
            getOrientation(imgs[element], log)
            

            // kiki.push(resetOrientation(reader.result, getOrientation(imgs[element], log), logz))
            // kiki.push(reader.result)
            // if (kiki.length === values.images.length) {
            //   setImages(kiki)
            // } 
            // console.log(kiki);
          };
          reader.readAsDataURL(imgs[element]);
        }
      }
    }
  };


  // from http://stackoverflow.com/a/32490603
function getOrientation(file, callback) {
  var reader = new FileReader();

  reader.onload = function(event) {
    var view = new DataView(event.target.result);

    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);

    var length = view.byteLength,
        offset = 2;

    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) {
          return callback(-1);
        }
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;

        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };

  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
};

function resetOrientation(srcBase64, srcOrientation, callback) {
	var img = new Image();	

	img.onload = function() {
  	var width = img.width,
    		height = img.height,
        canvas = document.createElement('canvas'),
	  		ctx = canvas.getContext("2d");
		
    // set proper canvas dimensions before transform & export
		if (4 < srcOrientation && srcOrientation < 9) {
    	canvas.width = height;
      canvas.height = width;
    } else {
    	canvas.width = width;
      canvas.height = height;
    }
	
  	// transform context before drawing image
		switch (srcOrientation) {
      case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
      case 7: ctx.transform(0, -1, -1, 0, height , width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
      default: break;
    }

		// draw image
    ctx.drawImage(img, 0, 0);

		// export base64
		callback(canvas.toDataURL());
  };

	img.src = srcBase64;
}

if (JSON.parse(localStorage.getItem('authenticated')) === 'admin') {
  fetchPartners(partners, setPartners)
}

const options = partners.map((partner, index) => ({
  key: index,
  text: partner,
  value: partner
}));

const kikilol = ({field}) => {
  return (
    <Dropdown
      defaultValue={values.partner}
      selection
      onChange={(e, data) => setFieldValue('partner', data.value)}
      options={options}
      fluid/>
  );
}
  
  return (
    <Container>
      <Header as='h2'>
        <Icon name='car' />
        <Header.Content>Car Information</Header.Content>
      </Header>
      <Form as="div">
        <FormikForm>

          <Form.Group widths='equal'>
            {JSON.parse(localStorage.getItem('authenticated')) === 'admin' &&
              <Form.Field>
                <label htmlFor="partner">Partner</label>
                <Field
                  name="partner"
                  component={kikilol} />
              </Form.Field>
            }
            {JSON.parse(localStorage.getItem('authenticated')) !== 'admin' &&
              <Form.Field disabled>
              <label htmlFor="partner">Partner</label>
              <Field id="partner" type="text" name="partner" />
            </Form.Field>
            }
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
            <Form.Group style={{display: 'flex', justifyContent: 'center'}}>
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
                        textAlign: "center",
                        width: '100%',
                        height: '50%',
                        margin: 'auto',
                        position: 'absolute',
                        top: '0', left: '0', bottom: '0', right: '0',
                      }}>
                        {(loading
                          ? <Loader size='small' active inline='centered' />
                          : <div>
                              <i className="upload icon"></i>
                                Add Images
                              <input multiple id="images" name="images" type="file" style={{display: 'none'}} onChange={(event) => {   
                                setRet(true);             
                                setImages([])
                                setFieldValue("images", event.currentTarget.files);
                              }} />
                          </div>
                        )}  
                    </span>
                  </label>
                </Form.Field>
            </Form.Group>
          }
          {oneLastTime(values.images)}
          {Boolean(images.length) &&
            <div>
              <Divider />
              <SematicImage style={{width: 'auto'}} src={images[0]} size='medium' />
              <Divider hidden />
              <Card.Group itemsPerRow={4}>
                {images.map((image, index) => {
                  return <Card onClick={() => handleImage(image, index)} key={index} color='red' image={image} />;
                })}
              </Card.Group>  
            </div>
          }
          <Divider />
          <span style={{display: 'flex', justifyContent: 'center'}}>
            <Button type="submit" compact disabled={loading} color='teal'>{(edit ? 'Update' : 'Submit')}</Button>
            {
              edit && <Button type="button" compact onClick={() => setDeleteModal(true)}>Delete Car Info</Button>
            }
          </span>
        </FormikForm>

              <Modal dimmer="blurring" open={open} onClose={close}>
        <Modal.Header>Image</Modal.Header>
        <Modal.Content image>
          <SematicImage wrapped size='massive' src={selectedImage} />
        </Modal.Content>
        <Modal.Actions style={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <Button onClick={close}>
            Cancel
          </Button>
          <Button
            content="Remove"
            onClick={removeImage}
          />
          <Button
            content="Set Main"
            onClick={setMain}
          />
        </Modal.Actions>
      </Modal>
      </Form>

      <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModal(false)}
            basic
            size='small'
          >
            <Header icon='browser' content={`Delete ${values.year} ${values.brand} ${values.model}`} />
            <Modal.Content>
              <h3>Are you sure you want to delete <span style={{color: 'teal'}}>{values.year} {values.brand} {values.model}</span> and all its records?</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='blue' onClick={() => setDeleteModal(false)} inverted>
                <Icon name='cancel' /> No
              </Button>
              <Button color='red' onClick={deleteCarInfo} inverted>
                <Icon name='remove' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
    </Container>
  );
};

export default withFormik({
  mapPropsToValues(formikProps) {
    return {
      partner: (formikProps.partner || JSON.parse(localStorage.getItem('authenticated'))),
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

    if (formikProps.props.edit) {
      axios.post(`${url}/updatecarinfo/${formikProps.props.carId}`, formData, {
        headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Accept': '*',
        }
      })
      .then(function (response) {
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
            console.log('create response', response);
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
