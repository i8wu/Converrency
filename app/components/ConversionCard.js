import React from 'react';
import {
	Button,
	Card,
	CardItem,
	Icon,
	Input,
	Item,
	Picker,
	Text,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Header from '../components/AppHeader';

const ConversionCard = ({
	convertedValue, currencyList, doConversion, error, fromValue, onSelectFrom, 
	onSelectTo, optionTo, optionFrom, swapOptions, updateFromValue
}) => (
	<Card>
		<CardItem>
			<Grid>
				<Row>
					<Col
						size={2}
					>
						<CurrencyPicker
							currencyList={currencyList}
							selected={optionFrom}
							onValueChange={(val) => onSelectFrom(val)}
						/>
					</Col>
					<Col
						size={1}
					>
						<SwapButton
							onPress={swapOptions}
						/>
					</Col>
					<Col
						size={2}
					>
						<CurrencyPicker
							currencyList={currencyList}
							selected={optionTo}
							onValueChange={(val) => onSelectTo(val)}
						/>
					</Col>
				</Row>
			</Grid>
		</CardItem>
		<CardItem>
			<Item
				error={error}
			>
				<Input
					keyboardType="numeric"
					placeholder="Enter value to convert"
					onChangeText={(val) => updateFromValue(val)}
					value={fromValue}
				/>
				<Button
					onPress={() => doConversion()}
				>
					<Text>
						Convert
					</Text>
				</Button>
			</Item>
		</CardItem>
		<CardItem>
			<Input
				disabled
				keyboardType="numeric"
				placeholder="Converted Value"
				value={convertedValue}
			/>
		</CardItem>
	</Card>
);

export default ConversionCard;

const SwapButton = ({ onPress }) => (
	<Button
		light
		onPress={() => onPress()}
	>
		<Icon
			ios='ios-swap'
			android="md-swap"
		/>
	</Button>
);

const CurrencyPicker = ({ currencyList, onValueChange, selected }) => {
	if (Array.isArray(currencyList)) {
		// Map array to picker items
		const items = currencyList.map((currency) => (
			<Picker.Item label={currency} value={currency} key={currency} />
		));

		return (
			<Picker
				supportedOrientations={['portrait']}
				iosHeader="Select one"
				headerBackButtonText="Go Back"
				mode="dropdown"
				selectedValue={selected ? selected : currencyList[0]}
				onValueChange={(val) => onValueChange(val)}
			>
				{items}
			</Picker>
		);
	}
}
