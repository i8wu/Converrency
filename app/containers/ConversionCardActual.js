import React from 'react';
import { connect } from 'react-redux';

import {
	SUBMIT_CONVERSION,
	SUBMIT_ENTRY,
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,
} from '../constants/reduxConstants';
import ConversionCard from '../components/ConversionCard';

class ConversionCardActual extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			convertedValue: null,
			fromValue: null,
			error: false,
		}
	}

	doConversion = () => {
		// Verify input is a number with at most 2 decimals
		const moneyRegex = new RegExp(/^\d+(\.\d{0,2})?$/);
		if (moneyRegex.test(this.state.fromValue)) {
			const { onConvert, optionFrom, optionTo, rates } = this.props;
			const fromRate = rates[optionFrom];
			const toRate = rates[optionTo];

			const convertedValue = (
				(this.state.fromValue) * (toRate / fromRate)
			).toFixed(2); // toFixed keeps decimals to 2 places

			this.setState({
				convertedValue,
				error: false,
			});
			onConvert(this.state.fromValue, convertedValue); // Update history
		} else {
			this.setState({ error: true });
		}
	}

	swapOptions = () => {
		const { onSelectFrom, onSelectTo, optionFrom, optionTo } = this.props;
		// clear values
		this.setState({
			convertedValue: null,
			fromValue: null
		});
		onSelectFrom(optionTo);
		onSelectTo(optionFrom);
	}

	updateFromOption = (option) => {
		const { onSelectFrom } = this.props;
		// clear values
		this.setState({
			convertedValue: null,
			fromValue: null
		});
		onSelectFrom(option);
	}

	updateToOption = (option) => {
		const { onSelectTo } = this.props;
		// clear values
		this.setState({
			convertedValue: null,
			fromValue: null
		});
		onSelectTo(option);
	}

	updateFromValue = (fromValue) => {
		this.setState({ fromValue });
	}

	render() {
		const {
			currencyList, onSelectTo, onSelectFrom, optionFrom, optionTo, rates
		} = this.props;

		return (
			<ConversionCard
				convertedValue={(this.state.convertedValue) ?
					String(this.state.convertedValue) : null
				}
				currencyList={currencyList}
				doConversion={this.doConversion}
				error={this.state.error}
				fromValue={(this.state.fromValue) ?
					String(this.state.fromValue): null
				}
				onSelectFrom={this.updateFromOption}
				onSelectTo={this.updateToOption}
				optionFrom={optionFrom}
				optionTo={optionTo}
				swapOptions={this.swapOptions}
				updateFromValue={this.updateFromValue}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		currencyList: state.currency.rates.allIds,
		optionFrom: state.currency.optionFrom,
		optionTo: state.currency.optionTo,
		rates: state.currency.rates.byId,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onConvert: (fromValue, convertedValue) => {
			dispatch({ type: SUBMIT_CONVERSION, fromValue, convertedValue });
		},
		onSelectFrom: (option) => {
			dispatch({ type: SUBMIT_OPTION_FROM, option });
		},
		onSelectTo: (option) => {
			dispatch({ type: SUBMIT_OPTION_TO, option });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversionCardActual);
