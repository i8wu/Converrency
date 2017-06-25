import React from 'react';
import {
	Container,
	Content,
	Text,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header from '../components/AppHeader';
import ConversionCard from '../containers/ConversionCardActual';
import HistoryCard from '../containers/HistoryCardActual';

const Home = () => (
	<Container>
		<Header
			title="Converrency"
		/>
		<Content
			// Keeps keyboard up if buttons are pressed
			keyboardShouldPersistTaps="handled"
		>
			<Grid>
				<Row>
					<ConversionCard />
				</Row>
				<Row>
					<HistoryCard />
				</Row>
			</Grid>
		</Content>
	</Container>
);

export default Home;
