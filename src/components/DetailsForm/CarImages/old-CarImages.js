import React, {useState} from 'react';
// import axios from 'axios';
import {Image, Dimmer, Divider, Card, Button, Modal, /* Form, */ Loader} from 'semantic-ui-react';

// import {url} from '../../../endpoints';

const CarImages = (props) => {
	const {/* carId,  */carImages: images/* , setIsImagesLoaded */} = props;
	const [selectedImage, setSelectedImage] = useState('');
	const [open, setOpen] = useState(false);
	const [loading/* , setLoading */] = useState(false);

	const show = () => setOpen(true);
	const close = () => setOpen(false);

	// const makeMain = () => console.log('Make Main');
	// const deleteImage = () => console.log('Delete Main');
	// const onUpload = () => console.log('onUpload');

	const handleImage = (image) => {
		show();
		setSelectedImage(image);
	};

	return (
		<div>
			{loading
				?
				<Dimmer active inverted>
					<Loader inverted>Loading</Loader>
				</Dimmer>
				:
				<div>
					{/* <Form as="div">
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
          </Form> */}

					<Divider />

					<Card.Group stackable itemsPerRow={3}>{
						images.map((image) => (
							<Card onClick={() => handleImage(image)} color='teal' key={image} raised image={image} />
						))
					}</Card.Group>
				</div>
			}
    
			<Modal dimmer="blurring" open={open} onClose={close}>
				<Modal.Header>Image</Modal.Header>
				<Modal.Content image>
					<Image wrapped size='massive' src={selectedImage} />
				</Modal.Content>
				<Modal.Actions style={{justifyContent: 'space-around', display: 'flex'}}>
					<Button onClick={close}>
            Cancel
					</Button>

					{/* <Button
            color="black"
            content="Make main"
            onClick={makeMain}
          />
          
          <Button
            negative
            icon='trash'
            labelPosition='right'
            content="Delete"
            onClick={deleteImage}
          /> */}
				</Modal.Actions>
			</Modal>
		</div>
	);
};

export default CarImages;
