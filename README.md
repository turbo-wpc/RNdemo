# react native demo

## TODO
* WebView
* RefreshControl
* StatusBar
* Navigator
* 手势

## 图片
### 使用方式
* 1
```javascript
import glassImg from '../images/glasses'
<Image source={glassImg} />
```
* 2
```javascript
const glassImg = require('../images/glasses.png')
<Image source={glassImg} />
```
* 3
```javascript
<Image source={require('../images/glasses.png')} />
```
* 4
```javascript
<Image source={{uri: 'https://...'}} />
```
### 打包
* 只有实际被用到（即被 require）的图片才会被打包到你的 app
* Packager 会打包所有的图片并且依据屏幕精度提供对应的资源
  * 譬如说，iPhone 7 会使用check@2x.png，而 iPhone 7 plus 或是 Nexus 5 上则会使用check@3x.png
  * 如果没有图片恰好满足屏幕分辨率，则会自动选中最接近的一个图片
### 注意事项
* 读取本地静态图片（使用require('./my-icon.png')语法）无需指定尺寸，因为它们的尺寸在加载时就可以立刻知道

