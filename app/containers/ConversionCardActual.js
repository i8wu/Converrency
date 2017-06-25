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
		}
	}

	doConversion = () => {
		const { onConvert, optionFrom, optionTo, rates } = this.props;
		const fromRate = rates[optionFrom];
		const toRate = rates[optionTo];

		const convertedValue = (
			(this.state.fromValue) * (toRate / fromRate)
		).toFixed(2); // toFixed keeps decimals to 2 places

		this.setState({ convertedValue });
		onConvert(convertedValue); // Update history
	}

	swapOptions = () => {
		const { onSelectFrom, onSelectTo, optionFrom, optionTo } = this.props;

		onSelectFrom(optionTo);
		onSelectTo(optionFrom);
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
				fromValue={(this.state.fromValue) ?
					String(this.state.fromValue): null
				}
				onSelectFrom={onSelectFrom}
				onSelectTo={onSelectTo}
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
		onConvert: (value) => {
			dispatch({ type: SUBMIT_CONVERSION, value });
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
