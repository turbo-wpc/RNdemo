import React ,{ Component } from 'react'
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Slider,
  Button,
  Picker,
  Alert,
  CameraRoll,
  ActivityIndicator,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native'

class Base extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      pickerVal: 'java',
      photos: []
    }
    this.openDatePicker = this.openDatePicker.bind(this)
    this.openTimePicker = this.openTimePicker.bind(this)
    this.getCameraPhoto = this.getCameraPhoto.bind(this)
  }
  openDatePicker(){
    try {
      const { action } = DatePickerAndroid.open({
        // 要设置默认值为今天的话，使用`new Date()`即可date: new Date()
      })
      .then(({year,month,day}) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
          console.warn(year + '-' + (month+1) + '-' + day)
        }
      })
    }
    catch ({ code, message }) {
      console.warn('Cannot open date picker', message)
    }
  }
  openTimePicker(){
    try {
      const {action} = TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      })
      .then(({action, hour, minute})=>{
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          console.warn(hour + '-' + minute)
        }
      })
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }
  alertDialog(){
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Cancel', onPress: () => console.warn('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.warn('OK Pressed')},
      ],
      { cancelable: true }
    )
  }
  getCameraPhoto(){
    CameraRoll.getPhotos({
      // first: 20,
      // assetType: 'Photos'
    })
    .then(r => {
      this.setState({ photos: r.edges })
    })
    .catch((err) => {
      //Error Loading Images
      console.warn(JSON.stringify(err))
    })
  }
  render(){
    return(
      <View style={styles.wrap}>
        <Slider />
        <Button title='test btn' onPress={this.alertDialog} color='red' disabled={false} />
        <Picker
          onValueChange={(itemValue,itemPosition)=>{
          this.setState({
            pickerVal: itemValue
          })
          console.warn(itemValue)
          }}
          selectedValue={this.state.pickerVal}
          style={{backgroundColor: '#ccc',color: '#fff'}}
          mode='dropdown'
          >
          <Picker.Item label='jav' value='java'/>
          <Picker.Item label='js' value='js' />
        </Picker>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator color='red' size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <Button title="Load Images" onPress={this.getCameraPhoto} />
        <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    width: 200
  }
})

export {
  Base
}