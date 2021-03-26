import React from 'react';
import PropTypes from 'prop-types';
import {Button, Divider, Header, Icon} from 'semantic-ui-react';
import CarImagesStyle from './CarImagesStyle';

// Christine Chubukk suicide
const CarImages = (props) => {
	const {userHasWritePermissions} = props;
	return (
		<CarImagesStyle>
			<Divider horizontal>
				<Header as='h4'>
					<Icon name='image' />
          Car Images
				</Header>
			</Divider>

			{userHasWritePermissions && (
				<Button
					fluid
					content='Upload Images'
					color="teal"
					basic
					onClick={console.log} />
			)}
		</CarImagesStyle>
	);
};

CarImages.propTypes = {
	// parent
	userHasWritePermissions: PropTypes.bool
};

CarImages.defaultProps = {
	userHasWritePermissions: false,
};

export default CarImages;
