import React, {useState} from 'react';
import axios from 'axios';
import {Image, Dimmer, Divider, Card, Button, Modal, Header, Form, Loader} from 'semantic-ui-react'

import {url} from '../../../endpoints';

const CarImages = (props) => {
  const {carId, images, setIsImagesLoaded} = props;
  const [selectedImage, setSelectedImage] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const show = () => setOpen(true)
  const close = () => setOpen(false) 

  const handleImage = (image) => {
    show();
    setSelectedImage(image);
  };

  const deleteImage = () => {
    close();
    const index = selectedImage.indexOf('images')
    const path = selectedImage.substring(index);

    const formData = new FormData();
    formData.append('path', path);
  
    axios.post(`${url}/deleteimage`, formData, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      setIsImagesLoaded(false);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const onUpload = (event) => {
    setLoading(true);
    let lastImage = null;
    images.forEach(image => {
      const startIndex = image.lastIndexOf('/') + 1;
      const endIndex = image.lastIndexOf('-');
      lastImage = image.substring(startIndex, endIndex);
    });
    
    const formData = new FormData();
  
    for (const image in event.currentTarget.files) {
      if (typeof event.currentTarget.files[image] === "object") {
        lastImage++
        formData.append(lastImage, event.currentTarget.files[image])
      }
    }

    axios.post(`${url}/uploadimages/${carId}`, formData, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
      .then(function (response) {
        setLoading(false);
        setIsImagesLoaded(false);
        console.log('create response', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } 

  const makeMain = () => {
    const index = selectedImage.indexOf('images')
    const path = selectedImage.substring(index);

    const data = {
      currentMain: images[0].substring(index),
      newMain: path
    }
  
    close();
    axios.post(`${url}/makemainimage`, data, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
      .then(function (response) {
        setLoading(false);
        setIsImagesLoaded(false);
        console.log('res', response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      {loading 
      ?       
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      :
      <div>
        <Form as="div">
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
                                <input multiple id="images" name="images" type="file" style={{display: 'none'}} onChange={onUpload} />
                            </div>
                          )}  
                      </span>
                    </label>
                  </Form.Field>
              </Form.Group>
          </Form>

      <Divider />

      <Card.Group stackable itemsPerRow={3}>{
        images.map((image) => (
          <Card onClick={() => handleImage(image)} color='teal' key={image} raised image={image} />
        ))
      }</Card.Group>
      </div>
    }

    
      <Modal dimmer="blurring" open={open} onClose={close}>
        <Modal.Header>Delete Image</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='massive' src={selectedImage} />
        </Modal.Content>
        <Modal.Actions style={{justifyContent: 'space-around', display: 'flex'}}>
          <Button onClick={close}>
            Nope
          </Button>

          <Button
            color="black"
            content="Make main"
            onClick={makeMain}
          />
          
          <Button
            negative
            icon='trash'
            labelPosition='right'
            content="Yes, Delete"
            onClick={deleteImage}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CarImages;
