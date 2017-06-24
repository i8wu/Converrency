import {
	Dimensions,
	Platform
} from 'react-native';

const window = Dimensions.get('window');

export const appHeight = window.height;
export const appWidth = window.width;
export const isAndroid = Platform.OS === 'android';
