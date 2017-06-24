import React, { Component } from 'react';
import {
	View
} from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Home from './scenes/Home';

export default class DayJar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			store: configureStore({}, () => this.setState({ isLoading: false })),
			isLoading: true,
		};
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
