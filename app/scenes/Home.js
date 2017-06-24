import React from 'react';
import {
	Container,
	Content,
	Text,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header from '../components/AppHeader';
import ConversionCard from '../components/ConversionCard';
import HistoryCard from '../components/HistoryCard';

const Home = () => (
	<Container>
		<Header
			title="Converrency"
		/>
		<Content>
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
