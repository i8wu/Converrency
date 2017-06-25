import { put, takeLatest, select, takeEvery, call } from 'redux-saga/effects';
import moment from 'moment';

import {
	SUBMIT_OPTION_FROM,
	SUBMIT_OPTION_TO,
	RECEIVE_RATES,
	UPDATE_OPTION_FROM,
	UPDATE_OPTION_TO
} from '../constants/reduxConstants';
import currencyService from '../services/currencyService';

function* updateOptionFrom(action) {
	try {
		yield put({ type: UPDATE_OPTION_FROM, option: action.option });
	} catch(e) {
		console.log(e);
	}
}

function* updateOptionTo(action) {
	yield put({ type: UPDATE_OPTION_TO, option: action.option });
}

function* updateRates() {
	console.log('called');
	const rates = yield call(currencyService.fetchRates);

	if (rates) {
		console.log(JSON.stringify(rates));
		yield put({ type: RECEIVE_RATES, rates: rates });
	}
}

export default function* currencySaga() {
	yield takeLatest(SUBMIT_OPTION_FROM, updateOptionFrom);
	yield takeLatest(SUBMIT_OPTION_TO, updateOptionTo);
	yield call(updateRates);
}
