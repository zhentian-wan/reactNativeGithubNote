/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    NavigatorIOS
} from 'react-native';
import Main from './App/components/main';

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class githubnotetaker extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Github note taker',
            component: Main
          }}
        />
    );
  }
}

AppRegistry.registerComponent('githubnotetaker', () => githubnotetaker);
