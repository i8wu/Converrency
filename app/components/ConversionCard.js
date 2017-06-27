import React from 'react';
import {
	View
} from 'react-native';
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

import Header from '../components/AppHeader';

const ConversionCard = ({
	convertedValue, currencyList, doConversion, error, fromValue, onSelectFrom, 
	onSelectTo, optionTo, optionFrom, swapOptions, updateFromValue
}) => (
	<Card>
		<CardItem>
			<CurrencyPicker
				currencyList={currencyList}
				onValueChange={(val) => onSelectFrom(val)}
				selected={optionFrom}
				style={{ flex: 2 }}
			/>
			<SwapButton
				onPress={swapOptions}
				style={{ flex: 1 }}
			/>
			<CurrencyPicker
				currencyList={currencyList}
				onValueChange={(val) => onSelectTo(val)}
				selected={optionTo}
				style={{ flex: 2 }}
			/>
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

const SwapButton = ({ onPress, style }) => (
	<Button
		light
		onPress={() => onPress()}
		style={{...style, ...{ justifyContent: 'center' }}}
	>
		<Icon
			ios='ios-swap'
			android="md-swap"
		/>
	</Button>
);

const CurrencyPicker = ({ currencyList, onValueChange, selected, style }) => {
	if (Array.isArray(currencyList)) {
		// Map array to picker items
		const items = currencyList.map((currency) => (
			<Picker.Item label={currency} value={currency} key={currency} />
		));

		return (
			<View
				style={style}
			>
				<Picker
					headerBackButtonText="Go Back"
					iosHeader="Select one"
					onValueChange={(val) => onValueChange(val)}
					mode="dropdown"
					selectedValue={selected ? selected : currencyList[0]}
					supportedOrientations={['portrait']}
				>
					{items}
				</Picker>
			</View>
		);
	}
}
