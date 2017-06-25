import { fork } from 'redux-saga/effects';
import currencySaga from './currencySaga';

// single entry point to start all Sagas at once
export default function* rootSaga() {
	yield [
		fork(currencySaga),
	];
}
