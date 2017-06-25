import {
	RECEIVE_RATES,
	UPDATE_HISTORY,
	UPDATE_OPTION_FROM,
	UPDATE_OPTION_TO,
} from '../constants/reduxConstants';

const initialState = {
	optionFrom: null,
	optionTo: null,
	rates: {
		lastUpdated: null,
		byId: {},
		allIds: []
	},
	history: {
		byId: {},
		allIds: []
	}
};

export default function currency(state = initialState, action) {
	switch (action.type) {
	case RECEIVE_RATES: {
		return Object.assign({}, state, {
			rates: action.rates
		});
	}
	case UPDATE_HISTORY: {
		return Object.assign({}, state, {
			history: action.history
		}); 
	}
	case UPDATE_OPTION_FROM: {
		return Object.assign({}, state, {
			optionFrom: action.option
		}); 
	}
	case UPDATE_OPTION_TO: {
		return Object.assign({}, state, {
			optionTo: action.option
		}); 
	}
	default:
		return state;
	}
}
