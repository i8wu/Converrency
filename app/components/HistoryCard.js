import React from 'react';
import {
	Body,
  Button,
	Card,
	CardItem,
  Content,
  Icon,
	Text,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';

import Header from '../components/AppHeader';
import { caption } from '../constants/fontConstants';
import { LIGHT } from '../constants/colorConstants';

const ConversionCard = ({ history, removeHistory }) => {
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
          <Row>
            <Col>
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
            </Col>
            <Col>
              <TrashIcon
                id={key}
                onPress={removeHistory}
              />
            </Col>
          </Row>
        </Body>
      </CardItem>
    )
  });

  return (
  	<Card>
      <Content>
      <CardItem header>
        <Text>
          History
        </Text>
      </CardItem>
        {items}
      </Content>
    </Card>
  );
}

const TrashIcon = ({ id, onPress }) => (
  <Button
    danger
    style={styles.trashButton}
    onPress={() => onPress(id)}
  >
    <Icon
      ios='ios-trash'
      android="md-trash"
    />
  </Button>
);

// Not using Stylesheet because native-base doesn't like it?...
const styles = {
  itemContainer: { borderBottomWidth: 1, borderBottomColor: LIGHT, },
  trashButton: { alignSelf: 'flex-end' },
};

export default ConversionCard;
