import React from 'react';
import { connect } from 'react-redux';

import {
	SUBMIT_CONVERSION,
	SUBMIT_ENTRY,
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,
} from '../constants/reduxConstants';
import HistoryCard from '../components/HistoryCard';

const HistoryCardActual = ({ history }) => (
	<HistoryCard
		history={history}
	/>
);

function mapStateToProps(state) {
	return {
		history: state.currency.history,
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCardActual);
