import React from 'react';
import {
	Header,
	Title,
	Left,
	Right,
	Body
} from 'native-base';

import { PRIMARY } from '../constants/colorConstants';

const AppHeader = ({ left, title, right }) => (
	<Header
		style={{ backgroundColor: PRIMARY }}
	>
		<Left>
			{left}
		</Left>
		<Body>
			<Title>
				{title}
			</Title>
		</Body>
		<Right>
			{right}
		</Right>
	</Header>
);

export default AppHeader;
