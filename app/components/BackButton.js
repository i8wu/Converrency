import React from 'react';
import {
	Icon,
	Button,
} from 'native-base';

import { Actions } from 'react-native-router-flux';

const BackButton = ({ onPress }) => (
	<Button
		onPress={() => Actions.pop()}
		transparent
		dark
	>
		<Icon
			ios="ios-arrow-back"
			android="md-arrow-back"
		/>
	</Button>
);

export default BackButton;
