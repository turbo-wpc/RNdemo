/**
 * react native Animated
 * 
 * 一、Animated 提供了两种类型的值
 *    Animated.Value() 用于单个值
 *    Animated.ValueXY() 用于矢量值
 *        Animated.Value() 可以绑定到样式或是其他属性上，也可以进行插值运算
 *        单个 Animated.Value() 可以用在任意多个属性上
 * 
 * 二、Animated 用于创建动画的主要方法
 *    Animated.timing()：最常用的动画类型，使一个值按照一个过渡曲线而随时间变化
 *    Animated.spring()：弹簧效果，基础的单次弹跳物理模型实现的 spring 动画
 *    Animated.decay()：衰变效果，以一个初始的速度和一个衰减系数逐渐减慢变为0
 * 
 * 三、Animated 实现组合动画的主要方式
 *    Animated.parallel()：一个动画数组，同时开始里面的全部动画
 *        默认情况下，如果有任何一个动画停止了，其余的也会被停止
 *        可以通过stopTogether 选项设置为 false 来取消这种关联
 *    Animated.sequence()：一个动画数组，按顺序执行里面的动画，等待一个完成后再执行下一个
 *        如果当前的动画被中止，后面的动画则不会继续执行
 *    Animated.stagger()：一个动画数组，传入一个时间参数来设置队列动画间的延迟，即在前一个动画开始之后，隔一段指定时间才开始执行下一个动画里面的动画，并不关心前一个动画是否已经完成
 *
 * 四、Animated 封装了四个可以动画化的组件
 *    Animated.View
 *    Animated.Text
 *    Animated.Image
 *    Animated.ScrollView
 *      也可以使用 Animated.createAnimatedComponent() 来封装你自己的组件（用 Animated.View 包裹可以达到同样的效果）
 * 
 * 五、合成动画值：可以使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值
 *    Animated.add()
 *    Animated.divide()
 *    Animated.modulo()
 *    Animated.multiply()
 * 
 * 六、插值函数
 *    interpolate()：将输入值范围转换为输出值范围
 */

import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'

const { width: screenW, height: screenH } = Dimensions.get('window')

class Opacity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeOutOpacity: new Animated.Value(1)     //实例化动画初始值
    }
    this.fadeOutAnimated = Animated.timing(     //创建动画，并配置相应的参数
      this.state.fadeOutOpacity,
      {
        toValue: 0,
        duration: 3000
      }
    )
  }

  _startAnimated() {
    this.fadeOutAnimated.start(() => {
      this.state.fadeOutOpacity.setValue(1)
      this._startAnimated()
    })
  }

  render(){
    return (
      <View style={styles.mainStyle}>
        <Animated.View style={{width: 320, height: 136, opacity: this.state.fadeOutOpacity}}>
          <Image ref="image" style={{width:320,height:136}}
                source={require('../images/header-bg.png')}>
          </Image>
        </Animated.View>

        <TouchableOpacity onPress={this._startAnimated.bind(this)}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Mixture extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animatedValue: new Animated.Value(0),
    }

    this.rotateAnimated = Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    )
  }

  _startAnimated() {
    this.state.animatedValue.setValue(0)
    this.rotateAnimated.start(() => this._startAnimated())
  }

  render(){
    const rotateZ = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    const opacity = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    const rotateX = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '180deg', '0deg']
    })

    const textSize = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [18, 32, 18]
    })

    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 200, 0]
    })

    const scale = this.state.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    return (
      <View style={styles.mainStyle}>
        <Animated.View
          style={{
              marginTop: 10,
              width: 100,
              height: 100,
              transform: [
                {rotateZ}
              ]
          }}
        >
          <Image style={{width:100,height:100}}
                source={require('../images/header-bg.png')}>
          </Image>
        </Animated.View>

        <Animated.View
          style={{
            marginTop: 10,
            width: 100,
            height: 100,
            opacity,
            backgroundColor:'red'
          }}
        />

        <Animated.Text
          style={{
            marginTop: 10,
            width:100,
            fontSize: 18,
            color: 'white',
            backgroundColor:'red',
            transform: [
              {rotateX}
            ]
          }}
        >
          窗外风好大，我没穿外褂
        </Animated.Text>

        <Animated.Text
          style={{
            marginTop: 10,
            height: 100,
            lineHeight: 100,
            fontSize: textSize,
            color: 'red'
          }}
        >
          IAMCJ嘿嘿嘿
        </Animated.Text>

        <Animated.View
          style={{
            marginTop: 10,
            width: 100,
            height: 100,
            marginLeft,
            backgroundColor:'red',
            transform: [
              {scale}
            ]
          }}
        />

        <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Spring extends Component {
  constructor(props) {
    super(props)
    this.state = {
      springValue: new Animated.Value(1),
    }
    this.springAnimated = Animated.spring(
      this.state.springValue,
      {
        toValue: 1,
        friction: 2,
        tension: 10
      }
    )
  }

  _startAnimated() {
    this.state.springValue.setValue(0.5)
    this.springAnimated.start()
  }

  render(){
    return (
      <View style={styles.mainStyle}>
        <Animated.View
          style={{
            width: 282,
            height: 51,
            transform:[
              {scale: this.state.springValue}
            ]
          }}
        >
          <Image ref="image" style={{width:282,height:51}}
                source={require('../images/header-bg.png')}>
          </Image>
        </Animated.View>

        <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class AnimatedParallel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dogOpacityValue: new Animated.Value(1),
      dogACCValue : new Animated.Value(0)
    }
    this.parallelAnimated = Animated.parallel(
      [
        Animated.timing(
          this.state.dogOpacityValue,
          {
            toValue: 1,
            duration: 1000
          }
        ),
        Animated.timing(
          this.state.dogACCValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear
          }
        )
      ],
      {
        stopTogether: false
      }
    )

    this._startAnimated = this._startAnimated.bind(this)
  }

  _startAnimated() {
    this.state.dogOpacityValue.setValue(0)
    this.state.dogACCValue.setValue(0)
    this.parallelAnimated.start()
  }

  render(){
    //透明度
    const dogOpacity = this.state.dogOpacityValue.interpolate({
      inputRange: [0,0.2,0.4,0.6,0.8,1],
      outputRange: [0,1,0,1,0,1]
    })
    //眼镜左边
    const left = this.state.dogACCValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 127]
    })
    //眼镜旋转
    const rotateZ = this.state.dogACCValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '380deg']
    })
    //项链上面
    const neckTop = this.state.dogACCValue.interpolate({
      inputRange: [0, 1],
      outputRange: [350, 130]
    })

    return (
      <View style={styles.mainStyle}>
        <View style={styles.dogWrap}>
          {/*// 狗头*/}
          <Animated.View
            style={{
              width: 375,
              height: 240,
              opacity:dogOpacity
            }}
          >
            <Image ref="image" style={{width:375,height:242}}
                  source={require('../images/dog.jpg')}>
            </Image>
          </Animated.View>
          {/*// 项链*/}
          <Animated.View
            style={{
              width: 250,
              height: 100,
              position: 'absolute',
              top: neckTop,
              left: 93
            }}
          >
            <Image ref="image" style={{width:250,height:100,resizeMode:'stretch'}}
                  source={require('../images/necklace.jpg')}>
            </Image>
          </Animated.View>
          {/*// 眼镜*/}
          <Animated.View
            style={{
              width: 120,
              height: 25,
              position: 'absolute',
              top:60,
              left,
              transform:[
                {rotateZ}
              ]
            }}
          >
            <Image ref="image" style={{width:120,height:25,resizeMode:'stretch'}}
                  source={require('../images/glasses.png')}>
            </Image>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class AnimatedSequence extends Component {
  constructor(props) {
    super(props)
    this.state = {
      turnRotateValue: new Animated.Value(0),
      turnShakeValue: new Animated.Value(0),
      macValue: new Animated.Value(0)
    }
    this.sequenceAnimated = Animated.sequence(
      [
        Animated.timing(
          this.state.turnRotateValue,
          {
            toValue: 1,
            duration: 5000,
            easing: Easing.in
          }
        ),
        Animated.timing(
          this.state.turnShakeValue,
          {
            toValue: 1,
            duration: 500,
            easing: Easing.in,
            delay:300
          }
        ),
        Animated.spring(
          this.state.macValue,
          {
            toValue: 1,
            friction: 3,
            tension:10
          }
        )
      ]
    )
    this._startAnimated = this._startAnimated.bind(this)
  }

  _startAnimated() {
    this.sequenceAnimated.start()
  }

  render(){
    //转盘旋转
    const turnRotateZ = this.state.turnRotateValue.interpolate({
      inputRange: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
      outputRange: [
        '0deg',
        '180deg',
        '360deg',
        '720deg',
        '1080deg',
        '1800deg',
        '2520deg',
        '3060deg',
        '3420deg',
        '3600deg',
        '3690deg'
      ]
    })
    //转盘震动
    const marginLeft = this.state.turnShakeValue.interpolate({
      inputRange: [0,0.2,0.4,0.6,0.8,1],
      outputRange: [0,-40,40,-40,40,0]
    })
    //MacTop
    const macTop = this.state.macValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-300,50]
    })

    return (
      <View style={styles.mainStyle}>
        <View style={styles.lotteryBox}>
          {/*// 转盘*/}
          <Animated.View
            style={{
              width: 300,
              height: 300,
              marginLeft,
              transform:[
                {rotateZ:turnRotateZ}
              ]
            }}
          >
            <Image ref="image" style={{width:300,height:300}}
                  source={require('../images/turntable.png')}>
            </Image>
          </Animated.View>

          {/*// mac*/}
          <Animated.View
            style={{
              width: 300,
              height: 204,
              position: 'absolute',
              top: macTop,
              left: 0
            }}
          >
            <Image ref="image" style={{width:300,height:204}}
                  source={require('../images/macpro.png')}>
            </Image>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class AnimatedStagger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redValue: new Animated.Value(0),
      blueValue : new Animated.Value(0)
    }
    this.staggerAnimated = Animated.stagger(1000,
      [
        Animated.timing(
          this.state.redValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.in
          }
        ),
        Animated.timing(
          this.state.blueValue,
          {
            toValue: 1,
            duration: 2000,
            easing: Easing.in
          }
        )
      ]
    )

    this._startAnimated = this._startAnimated.bind(this)
  }
  _startAnimated() {
    this.staggerAnimated.start()
  }

  render(){
    const redMarginLeft = this.state.redValue.interpolate({
      inputRange: [0,1],
      outputRange: [0,200]
    })
    const blueMarginLeft = this.state.blueValue.interpolate({
      inputRange: [0,1],
      outputRange: [0,200]
    })

    return (
      <View style={styles.mainStyle}>
        {/*// 红色*/}
        <Animated.View
            style={{
              width: 100,
              height: 100,
              backgroundColor:'red',
              marginLeft:redMarginLeft
            }}
        >
        </Animated.View>
        {/*// 蓝色*/}
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor:'blue',
            marginLeft:blueMarginLeft
          }}
        >
        </Animated.View>

        <TouchableOpacity style={styles.touchStyle} onPress={this._startAnimated.bind(this)}>
          <Text style={{width:200,height:100,textAlign:'center',lineHeight:100}}>点击开始动画</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  dogWrap: {
    width: 375,
    height: 240,
    overflow: 'hidden'
  },
  lotteryBox: {
    width: 300,
    height: 300,
    backgroundColor: '#fff'
  }
})

export {
  Opacity,
  Mixture,
  Spring,
  AnimatedParallel,
  AnimatedSequence,
  AnimatedStagger
}
