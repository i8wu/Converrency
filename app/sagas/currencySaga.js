import { put, takeLatest, select, takeEvery, call } from 'redux-saga/effects';
import moment from 'moment';

import {
	SUBMIT_CONVERSION,
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,
	RECEIVE_RATES,
	UPDATE_HISTORY,
	UPDATE_OPTION_FROM,
	UPDATE_OPTION_TO,
} from '../constants/reduxConstants';
import currencyService from '../services/currencyService';

const getCurrency = state => state.currency;


function* updateConversion(action) {
	const { optionFrom, optionTo, history }  = yield select(getCurrency);

	// Clone history object and add new conversion
	const newByIds = { ...history.byId };
	const nextId = history.byId.length;
	newByIds[nextId] = {
		optionFrom,
		optionTo,
		timestamp: Date.now(),
		value: action.value,
	}
	const newAllIds = Object.keys(newByIds).sort();

	// Construct new history from old history
	const newHistory = Object.assign({}, history, {
			byId: newByIds,
			allIds: newAllIds
		});

	yield put({ type: UPDATE_HISTORY, history: newHistory });
}

function* updateOptionFrom(action) {
	yield put({ type: UPDATE_OPTION_FROM, option: action.option });
}

function* updateOptionTo(action) {
	yield put({ type: UPDATE_OPTION_TO, option: action.option });
}

function* updateRates() {
	console.log('called');
	const rates = yield call(currencyService.fetchRates);

	if (rates) {
		// TODO: Update options if null
		yield put({ type: RECEIVE_RATES, rates: rates });
	}
}

export default function* currencySaga() {
	yield takeLatest(SUBMIT_OPTION_FROM, updateOptionFrom);
	yield takeLatest(SUBMIT_OPTION_TO, updateOptionTo);
	yield takeEvery(SUBMIT_CONVERSION, updateConversion);
	yield call(updateRates);
}
