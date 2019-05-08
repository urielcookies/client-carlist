import React, {useState} from 'react';
import axios from 'axios';
import {Image, Divider, Card, Button, Modal, Header} from 'semantic-ui-react'

const CarImages = (props) => {
  const [selectedImage, setSelectedImage] = useState('');
  console.clear()
  const index = selectedImage.indexOf('images')
  console.log('selectedImage', selectedImage.substring(index));

  const [open, setOpen] = useState(false);

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
      <Button onClick={() => console.log('Add Image Modal')} fluid>Add More Images</Button>
      <Divider />
      <Card.Group stackable itemsPerRow={3}>{
        props.images.map((image) => (
          <Card onClick={() => handleImage(image)} color='teal' key={image} raised image={image} />
        ))
      }</Card.Group>

      <Modal dimmer="blurring" open={open} onClose={close}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='massive' src={selectedImage} />
          <Modal.Description>
            <Header>Delete Image</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={close}>
            Nope
          </Button>
          <Button
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
