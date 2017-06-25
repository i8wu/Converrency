import React from 'react';
import { connect } from 'react-redux';

import {
	REMOVE_HISTORY,
	SUBMIT_CONVERSION,
	SUBMIT_ENTRY,
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,
} from '../constants/reduxConstants';
import HistoryCard from '../components/HistoryCard';

const HistoryCardActual = ({ history, removeHistory }) => (
	<HistoryCard
		history={history}
		removeHistory={removeHistory}
	/>
);

function mapStateToProps(state) {
	return {
		history: state.currency.history,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		removeHistory: (id) => {
			dispatch({ type: REMOVE_HISTORY, id });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCardActual);
