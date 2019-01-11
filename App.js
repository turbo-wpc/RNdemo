import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import * as AnimatedComponent from './src/components/Animated'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AnimatedComponent.AnimatedParallel />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
