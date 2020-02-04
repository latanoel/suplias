import React, { Component } from 'react';
import {
  ApplicationProvider,
  Layout,
  Text,
  Card,
  Input,
  Icon,
  IconRegistry
} from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Platform, StyleSheet, View } from 'react-native';
import * as Font from 'expo-font';

import { default as User } from "./api-data/buyer";

import { default as appTheme } from "./assets/custom-theme.json";
import { default as appMapping } from './assets/custom-mapping.json';

import Header from "./components/Header";
import Profile from "./components/Profile";
import OrderSummary from "./components/OrderSummary";
import Order from './components/Order';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
  // web: 'Press Ctrl+R to reload',
});

const theme = {...lightTheme, ...appTheme}

export default class App extends Component {

  componentDidMount() {
    Font.loadAsync({
      'App-Font': require('./assets/fonts/GraphikRegular.otf')
    })
  }
  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme} customMapping={appMapping}>
          <Layout style={styles.container}>
            <Layout style={styles.header}>
              <Header user={User}/>
            </Layout>

            <View style={styles.bodySection}>
              <Profile user={User} />
              <OrderSummary setOrder={this.setOrder} />
              <Order/>
            </View>

          </Layout>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  header: {
    padding: 30,
    paddingBottom: 80,
    backgroundColor: '#3B54EC'
  },
  bodySection: {
    marginTop: -60,
    margin: 30,
  },
});
