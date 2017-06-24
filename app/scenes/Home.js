import React from 'react';
import {
	Container,
	Text
} from 'native-base';

import Header from '../components/AppHeader';

const Home = () => (
	<Container>
		<Header
			title="Converrency"
		/>
		<Text>
			I'm home!
		</Text>
	</Container>
);

export default Home;
