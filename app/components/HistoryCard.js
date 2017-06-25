import React from 'react';
import {
	Body,
	Card,
	CardItem,
	Text,
} from 'native-base';
import moment from 'moment';

import Header from '../components/AppHeader';
import { caption } from '../constants/fontConstants';
import { LIGHT } from '../constants/colorConstants';

const ConversionCard = ({ history }) => {
  const items = (history.allIds).map((key) => {
    const {
      fromValue, convertedValue, optionFrom, optionTo, timestamp
    } = history.byId[key];
    return (
      <CardItem
        key={key}
        style={styles.itemContainer}
      >
        <Body>
          <Text>
            {
              fromValue + ' ' + optionFrom + ' -> '
              + convertedValue + ' ' + optionTo
            }
          </Text>
          <Text
            style={caption}
          >
            {moment(timestamp).format('MMMM Do YYYY')}
          </Text>
        </Body>
      </CardItem>
    )
  });

  return (
  	<Card>
      {items}
    </Card>
  );
}

// Not using Stylesheet because native-base doesn't like it?...
const styles = {
  itemContainer: { borderBottomWidth: 1, borderBottomColor: LIGHT, },
};

export default ConversionCard;
