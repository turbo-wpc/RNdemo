import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import * as AnimatedComponent from './src/components/Animated'
import { Base } from './src/components/Base'
import PriceRange from './src/components/PriceRange'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Base />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
