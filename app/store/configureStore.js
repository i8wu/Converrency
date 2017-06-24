import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState, onComplete) {
	const middlewares = [sagaMiddleware];

	/*
	if ( DEBUG_ENABLED ) {
		// neat middleware that logs actions
		const loggerMiddleware = createLogger();
		middlewares.push(loggerMiddleware);
	}*/

	const store = createStore(
		rootReducer,
		applyMiddleware(...middlewares),
		autoRehydrate()
	);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/rootReducer', () => {
			const nextRootReducer = rootReducer;

			store.replaceReducer(nextRootReducer);
		});
	}

	persistStore(store,
		{
			storage: AsyncStorage,
		},
		() => {
			onComplete();
			sagaMiddleware.run(rootSaga); // Run sagas after hydration
		}
	);
	return store;
}
