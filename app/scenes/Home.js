import React from 'react';
import {
	View,
} from 'react-native';
import {
	Container,
	Content,
	Text,
} from 'native-base';

import Header from '../components/AppHeader';
import ConversionCard from '../containers/ConversionCardActual';
import HistoryCard from '../containers/HistoryCardActual';

const Home = () => (
	<Container>
		<Header
			title="Converrency"
		/>
		<View
			// Keeps keyboard up if buttons are pressed
			keyboardShouldPersistTaps="handled"
			style={{ flex: 1 }}
		>
			<View
				style={{ flex: 1 }}
			>
				<ConversionCard />
				</View>
			<View
				style={{ flex: 1.5 }}
			>
				<HistoryCard />
			</View>
		</View>
	</Container>
);

export default Home;
