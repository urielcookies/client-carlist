import React, {useState} from 'react';
import axios from 'axios';
import {Image, Divider, Card, Button, Modal, Header, Form, Loader} from 'semantic-ui-react'

const CarImages = (props) => {
  const [selectedImage, setSelectedImage] = useState('');
  console.clear()
  const index = selectedImage.indexOf('images')
  console.log('selectedImage', selectedImage.substring(index));

  const [open, setOpen] = useState(false);
  const [upLoadOpen, setUpLoadOpen] = useState(false);
  const [imagestoBeAdded, setImagestoBeAdded] = useState([]);

  const show = () => setOpen(true)
  const close = () => setOpen(false)

  const uploadedOpen = () => setUpLoadOpen(true);
  const uploadedClose = () => setUpLoadOpen(false); 

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
  
    axios.post(`http://uriel.sellingcrap.com/deleteimage`, formData, {
      headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      'Accept': '*',
      }
    })
    .then(function (response) {
      props.setIsImagesLoaded(false);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div>
      {/* <Button onClick={() => console.log('Add Image Modal')} fluid>Add More Images</Button> */}
      {/* <input multiple id="images" name="images" type="file" onChange={(event) => {
        console.log('upload', Object.values(event.currentTarget.files));
        uploadedOpen();
        setImagestoBeAdded(Object.values(event.currentTarget.files))
        // setRet(true);             
        // setImages([])
        // setFieldValue("images", event.currentTarget.files);
      }} /> */}
      <Divider />
      <Card.Group stackable itemsPerRow={3}>{
        props.images.map((image) => (
          <Card onClick={() => handleImage(image)} color='teal' key={image} raised image={image} />
        ))
      }</Card.Group>

      {/* <Modal dimmer="blurring" open={upLoadOpen} onClose={uploadedClose}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='massive' src={selectedImage} />
          <Modal.Description>
            <Header>Upload images</Header>
            {imagestoBeAdded.map((file, index) => {
              return (
                <div key={index}>HI</div>
              );
            })}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={uploadedClose}>
            Nope
          </Button>
          <Button
            positive
            icon='trash'
            content="Submit"
            onClick={() => console.log('trash')}
          />
        </Modal.Actions>
      </Modal> */}
    
      <Modal dimmer="blurring" open={open} onClose={close}>
        <Modal.Header>Delete Image</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='massive' src={selectedImage} />
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={close}>
            Nope
          </Button>
          <Button
            disabled
            positive
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
