import React from 'react';
import { connect } from 'react-redux';

import {
	SUBMIT_ENTRY,
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,

} from '../constants/reduxConstants';
import ConversionCard from '../components/ConversionCard';

const ConversionCardActual = ({
	currencyList, onSelectTo, onSelectFrom, optionFrom, optionTo
}) => (
	<ConversionCard
		currencyList={currencyList}
		onSelectFrom={onSelectFrom}
		onSelectTo={onSelectTo}
		optionFrom={optionFrom}
		optionTo={optionTo}
		/*
		updateConversion
		convertedValue*/
	/>
);

function mapStateToProps(state) {
	return {
		currencyList: state.currency.rates.allIds,
		optionFrom: state.currency.optionFrom,
		optionTo: state.currency.optionTo,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		onSelectFrom: (option) => {
			dispatch({ type: SUBMIT_OPTION_FROM, option });
		},
		onSelectTo: (option) => {
			dispatch({ type: SUBMIT_OPTION_TO, option });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ConversionCardActual);
