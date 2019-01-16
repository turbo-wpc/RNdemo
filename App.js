import React, {Component} from 'react'
import {
  StyleSheet,
  StatusBar,
  View
} from 'react-native'
import * as AnimatedComponent from './src/components/Animated'
import { Base } from './src/components/Base'
import PriceRange from './src/components/PriceRange'
import Touch from './src/components/Touch'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Touch />
      </View>
    )
  }
}

const barHeight = StatusBar.currentHeight
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1FB9FF',
    paddingTop: barHeight
  }
})
