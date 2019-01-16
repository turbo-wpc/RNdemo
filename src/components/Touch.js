import React, { PureComponent, Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native'

export default class Touch extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      redViewBgColor: 'red'
    }
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder:  (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this._highlight()
        console.warn(evt.nativeEvent.locationX)
      },
      onPanResponderMove: (evt, gestureState) => {
      },
      onPanResponderRelease: (evt, gestureState) => {
        this._unhighlight()
      },
      onPanResponderTerminate: (evt, gestureState) => {
      }
    })
  }

  _unhighlight(){
    this.setState({redViewBgColor: 'red'})
  }

  _highlight(){
    this.setState({redViewBgColor: 'blue'})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.redView,{backgroundColor: this.state.redViewBgColor}]}
            {...this._panResponder.panHandlers}
        ></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  redView: {
    width: 100,
    height: 100,
    marginTop: 100,
    marginLeft: 100
  }
})