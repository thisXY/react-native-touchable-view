# react-native-touchable-view
你可以依赖这个TouchableView的长按,滑动,X轴滑动,Y轴滑动,长按后滑动等手势响应得到回调和一系列参数(如相对父组件x、y坐标,相对页面x、y坐标)处理你的业务(如手势动画)。

### 安装

```bash
npm install react-native-touchable-view --save
```

### 属性
| parameter              | type                                 | required | default | description                                                                                                                                                                                                                        
| :--------------------- | :----------------------------------- | :------- | :-------| :-------------------------------------------------------------------------------------------------                                                                 
| style                  | oneOfType([number, object, array])   | no       |         | 样式    
| longPressTestTime      | number                               | no       | 500     | 长按判定时间 (ms)
| moveTestDistance       | number                               | no       | 10      | 滑动判定距离
| moveCoolingTime        | number                               | no       | 10      | 滑动冷却时间 (ms)
| onPressIn              | func                                 | no       | null    | 按下开始 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onPressOut             | func                                 | no       | null    | 按下结束 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onPress                | func                                 | no       | null    | 按下 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onLongPress            | func                                 | no       | null    | 长按 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onMove                 | func                                 | no       | null    | 滑动 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onLongMove             | func                                 | no       | null    | 长按滑动 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onMoveXStart           | func                                 | no       | null    | X轴滑动开始 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onMoveX                | func                                 | no       | null    | X轴滑动 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onMoveYStart           | func                                 | no       | null    | Y轴滑动开始 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)
| onMoveY                | func                                 | no       | null    | Y轴滑动 (<br><br>evt: 可以在evt.nativeEvent里获取页面坐标,相对坐标等信息, <br><br>gestureState<br><br>)

### 注意
onPressIn、onPressOut、onPress、onLongPress、onLongMove至少有一个属性不为null时将捕获点击事件成为响应者
<br>
onMove、onLongMove、onMoveXStart、onMoveX、onMoveYStart、onMoveY至少有一个属性不为null时将捕获滑动事件成为响应者

### 源码

https://github.com/thisXY/react-native-touchable-view
