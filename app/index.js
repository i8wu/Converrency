import React, { Component } from 'react';
import {
	View
} from 'react-native';
import { Provider } from 'react-redux';
import RNExitApp from 'react-native-exit-app';
import { setJSExceptionHandler } from 'react-native-exception-handler';

import configureStore from './store/configureStore';
import Home from './scenes/Home';

export default class Converrency extends Component {
	constructor(props) {
		super(props);

		this.state = {
			store: configureStore({}, () => this.finishLoading),
			isLoading: true,
		};
	}

	finishLoading = () => {
		this.setState({ isLoading: false });

		const errorHandler = (e, isFatal) => {
			if (isFatal) {
				AsyncStorage.clear();

				var errorStr = 'Crash: ' + e.name + ': ' + e.message,
					errorStack;

				try {
					errorStack = e.stack.replace(/.*\n/,'').replace(/\n.*/g, '').trim();
					errorStr += ' ' + errorStack;
				} catch (stackErr) {
					logger.log('Error: ' + stackErr);
				}

				logger.trackException(errorStr, isFatal);

				Alert.alert(
					'Unexpected error occurred',
					'Please try restarting the app. If the app is still crashing, please keep an eye out for an update or try again later.',
					[{
						text: 'Okay',
						onPress: () => {
							RNExitApp.exitApp();
						}
					}]
				);
			} else {
				console.log(e); // So that we can see it in the ADB logs in case of Android if needed
			}
		};

		setJSExceptionHandler(errorHandler, true, true);
	}

	render() {
		let mainApp;

		if (!this.state.isLoading) {
			mainApp = (
				<Home />
			);
		} else {
			mainApp = <View />;
		}

		return (
			<Provider store={this.state.store}>
				{mainApp}
			</Provider>
		);
	}
}
