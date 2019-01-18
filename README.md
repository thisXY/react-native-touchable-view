# react-native-touchable-view
你可以依赖这个TouchableView的长按,滑动,X轴滑动,Y轴滑动,长按后滑动等手势响应得到回调和一系列参数(如相对父组件x、y坐标,相对页面x、y坐标,x轴位移、y轴位移)处理你的业务(如手势动画)。

### 安装

```bash
npm install react-native-touchable-view --save
```

### 属性
| parameter                  | type                               | required | default | description                                                                                                                                                                                                                        
| :------------------------- | :--------------------------------- | :------- | :-------| :---------------------------------------------------------------                                                                
| style                      | oneOfType([number, object, array]) | no       |         | 样式    
| longPressTestTime          | number                             | no       | 500     | 长按判定时间 (ms)
| moveTestDistance           | number                             | no       | 5       | 滑动判定距离
| moveTestDirectionDistance  | number                             | no       | 10      | 滑动方向判定距离
| moveThrottleTime           | number                             | no       | 10      | 滑动响应节流时间 (ms)
| isCapture                  | bool                               | no       | false   | 是否捕获事件 (捕获后子事件View将不可响应)
| isTermination              | bool                               | no       | false   | 是否在非捕获事件下可被其他手势终止事件 (一般在事件View叠加或交叉时会触发)
| isReleaseTerminated        | bool                               | no       | true    | 被其他手势终止事件后是否提交响应结果
| isPressTestMove            | bool                               | no       | false   | 按下是否判定滑动
| isDisable                  | bool                               | no       | false   | 是否禁用
| xTestAngle                 | number                             | no       | 45      | X轴滑动判定角度 (相对X轴线为0度)
| yTestAngle                 | number                             | no       | 45      | Y轴滑动判定角度 (相对Y轴线为0度; 优先级高于X轴滑动判定角度)
| onPressIn                  | func                               | no       |         | 按下开始 (evt, gestureState)
| onPressOut                 | func                               | no       |         | 按下结束 (evt, gestureState)
| onPress                    | func                               | no       |         | 按下 (evt, gestureState)
| onLongPress                | func                               | no       |         | 长按 (evt, gestureState)
| onMoveStart                | func                               | no       |         | 滑动开始 (evt, gestureState)
| onMove                     | func                               | no       |         | 滑动 (evt, gestureState)
| onLongMove                 | func                               | no       |         | 长按滑动 (evt, gestureState)
| onMoveXStart               | func                               | no       |         | X轴滑动开始 (evt, gestureState)
| onMoveLeftStart            | func                               | no       |         | 向左滑动开始 (evt, gestureState)
| onMoveRightStart           | func                               | no       |         | 向右滑动开始 (evt, gestureState)
| onMoveX                    | func                               | no       |         | X轴滑动 (evt, gestureState)
| onMoveYStart               | func                               | no       |         | Y轴滑动开始 (evt, gestureState)
| onMoveUpStart              | func                               | no       |         | 向上滑动开始 (evt, gestureState)
| onMoveDownStart            | func                               | no       |         | 向下滑动开始 (evt, gestureState)
| onMoveY                    | func                               | no       |         | Y轴滑动 (evt, gestureState)

<br>
关于事件参数evt.nativeEvent一些解释: 
<br>
locationX: 相对父组件X坐标
<br>
locationY: 相对父组件Y坐标
<br>
pageX: 相对页面X坐标
<br>
pageY: 相对页面Y坐标
<br>
<br>
关于事件参数gestureState一些解释:
<br>
dx: X轴位移
<br>
dy: Y轴位移

### 源码

https://github.com/thisXY/react-native-touchable-view
