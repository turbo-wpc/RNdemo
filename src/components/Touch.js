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
      redViewBgColor: 'red',
      childBgColor: 'yellow'
    }
    this._changeChild = this._changeChild.bind(this)
    this._unhighlight = this._unhighlight.bind(this)
    this._highlight = this._highlight.bind(this)
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      // 要求成为响应者：相应的回调函数返回值为 true
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
        this._highlight()
        console.warn(evt.nativeEvent.locationX)
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        console.warn(evt.nativeEvent.locationX)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者
        // 一般来说这意味着一个手势操作已经成功完成
        this._unhighlight()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android
        return true
      }
    })

    this._childPanResponder = PanResponder.create({
      // 要求成为响应者：相应的回调函数返回值为 true
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
        this._changeChild()
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        console.warn(evt.nativeEvent.locationX)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者
        // 一般来说这意味着一个手势操作已经成功完成
        this._unhighlight()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android
        return true
      }
    })
  }

  _unhighlight(){
    this.setState({redViewBgColor: 'red'})
  }

  _highlight(){
    this.setState({redViewBgColor: 'blue'})
    console.warn(6)
  }

  _changeChild(){
    // this.setState({childBgColor: 'grey'})
    console.warn(8)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.redView,{backgroundColor: this.state.redViewBgColor}]}
            {...this._panResponder.panHandlers}
        >
          <View style={[styles.child,{backgroundColor: this.state.childBgColor}]}
              {...this._childPanResponder.panHandlers}
          ></View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  redView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginTop: 100,
    marginLeft: 100
  },
  child: {
    width: 50,
    height: 50
  }
})