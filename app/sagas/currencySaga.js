import { put, takeLatest, select, takeEvery, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import moment from 'moment';

import {
	REMOVE_HISTORY,
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

function* removeHistory(action) {
	const { history }  = yield select(getCurrency);

	// Clone history object and add new conversion
	const newByIds = { ...history.byId };
	delete newByIds[action.id];
	// sort then reverse so newest is on top
	const newAllIds = Object.keys(newByIds).sort().reverse();

	// Construct new history from old history
	const newHistory = Object.assign({}, history, {
			byId: newByIds,
			allIds: newAllIds
		});

	yield put({ type: UPDATE_HISTORY, history: newHistory });
}

function* updateConversion(action) {
	const { optionFrom, optionTo, history }  = yield select(getCurrency);

	// Clone history object and add new conversion
	const newByIds = { ...history.byId };
	const timestamp = Date.now();
	const nextId = timestamp + optionFrom + optionTo; // Very simple hash
	newByIds[nextId] = {
		optionFrom,
		optionTo,
		timestamp,
		fromValue: action.fromValue,
		convertedValue: action.convertedValue,
	}
	// sort then reverse so newest is on top
	const newAllIds = Object.keys(newByIds).sort().reverse();

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
	while (true) {
		const { optionFrom, optionTo }  = yield select(getCurrency);
		const rates = yield call(currencyService.fetchRates);

		if (rates) {
			// Set default options if haven't been selected
			if (!optionFrom || !optionTo) {
				yield put({ type: UPDATE_OPTION_FROM, option: rates.allIds[0] });
				yield put({ type: UPDATE_OPTION_TO, option: rates.allIds[0] });
			}
			yield put({ type: RECEIVE_RATES, rates: rates });
			break;
		} else {
			// retry in 1 min
			yield delay(1 * 60 * 1000);
		}
	}
}

export default function* currencySaga() {
	yield takeLatest(REMOVE_HISTORY, removeHistory);
	yield takeLatest(SUBMIT_OPTION_FROM, updateOptionFrom);
	yield takeLatest(SUBMIT_OPTION_TO, updateOptionTo);
	yield takeLatest(SUBMIT_CONVERSION, updateConversion);
	yield call(updateRates);
}
