import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder } from 'react-native';
/**
 * 手势响应
 */
class Touchable extends Component {
  static propTypes = {
    // 样式
    style: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.array]),
    // 子组件
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
    // 长按判定时间 (ms)
    longPressTestTime: PropTypes.number,
    // 滑动判定距离
    moveTestDistance: PropTypes.number,
    // 滑动冷却时间 (ms)
    moveCoolingTime: PropTypes.number,
    /**
     * 按下开始
     * @param evt
     * @param gestureState
     */
    onPressIn: PropTypes.func,
    /**
     * 按下结束
     * @param evt
     * @param gestureState
     */
    onPressOut: PropTypes.func,
    /**
     * 按下
     * @param evt
     * @param gestureState
     */
    onPress: PropTypes.func,
    /**
     * 长按
     * @param evt
     * @param gestureState
     */
    onLongPress: PropTypes.func,
    /**
     * 滑动
     * @param evt
     * @param gestureState
     */
    onMove: PropTypes.func,
    /**
     * 长按滑动
     * @param evt
     * @param gestureState
     */
    onLongMove: PropTypes.func,
    /**
     * X轴滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveXStart: PropTypes.func,
    /**
     * X轴滑动
     * @param evt
     * @param gestureState
     */
    onMoveX: PropTypes.func,
    /**
     * Y轴滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveYStart: PropTypes.func,
    /**
     * Y轴滑动
     * @param evt
     * @param gestureState
     */
    onMoveY: PropTypes.func,
  };

  static defaultProps = {
    style: null,
    children: null,
    longPressTestTime: 500,
    moveTestDistance: 10,
    moveCoolingTime: 10,
    onPressIn: null,
    onPressOut: null,
    onPress: null,
    onLongPress: null,
    onMove: null,
    onLongMove: null,
    onMoveXStart: null,
    onMoveX: null,
    onMoveYStart: null,
    onMoveY: null,
  }

  constructor(props) {
    super(props);
    this.state = {};

    // 按下坐标
    this.pressInCoordinate = { x: 0, y: 0 };
    // 长按判定定时器
    this.longPressTestTimer = null;
    // 滑动方向 ['X', 'Y', false]
    this.moveDirection = false;
    // 是否长按
    this.isLongPress = false;
    // 滑动时间记录
    this.moveTime = 0;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => true,

      onStartShouldSetPanResponderCapture: () => [this.props.onPressIn, this.props.onPressOut, this.props.onPress, this.props.onLongPress, this.props.onLongMove]
        .filter(action => action !== null).length > 0,

      onMoveShouldSetPanResponderCapture: () => [this.props.onMove, this.props.onLongMove, this.props.onMoveXStart, this.props.onMoveX, this.props.onMoveYStart, this.props.onMoveY]
        .filter(action => action !== null).length > 0,

      onPanResponderGrant: (evt, gestureState) => {
        this.pressInCoordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        this.moveDirection = false;
        this.isLongPress = false;
        const evtRecord = { ...evt };
        const gestureStateRecord = { ...gestureState };

        this.clearLongPressTestTimer();
        this.longPressTestTimer = setTimeout(() => {
          if (!this.moveDirection) {
            // 长按
            this.props.onLongPress && this.props.onLongPress(evtRecord, gestureStateRecord);
            this.isLongPress = true;
          }
        }, this.props.longPressTestTime);

        // 按下开始
        this.props.onPressIn && this.props.onPressIn(evt, gestureState);
      },

      onPanResponderMove: (evt, gestureState) => {
        const moveCoolingTime = this.moveTime;
        this.moveTime = new Date().getTime();
        if (this.moveTime - moveCoolingTime <= this.props.moveCoolingTime) {
          return;
        }

        const coordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        switch (this.moveDirection) {
          // X轴滑动
          case 'X':
            this.props.onMoveX && this.props.onMoveX(evt, gestureState);
            break;
          // Y轴滑动
          case 'Y':
            this.props.onMoveY && this.props.onMoveY(evt, gestureState);
            break;
          // 未判定滑动方向
          case false:
            if ((coordinate.y - this.pressInCoordinate.y) ** 2 + (coordinate.x - this.pressInCoordinate.x) ** 2 >= this.props.moveTestDistance ** 2) {
              const tan = (coordinate.y - this.pressInCoordinate.y) / (coordinate.x - this.pressInCoordinate.x);
              if (tan >= 1 || tan <= -1) {
                this.moveDirection = 'Y';
                this.props.onMoveYStart && this.props.onMoveYStart(evt, gestureState);
                this.props.onMoveY && this.props.onMoveY(evt, gestureState);
              }
              else {
                this.moveDirection = 'X';
                this.props.onMoveXStart && this.props.onMoveXStart(evt, gestureState);
                this.props.onMoveX && this.props.onMoveX(evt, gestureState);
              }
            }
            break;
        }
        // 滑动
        this.props.onMove && this.props.onMove(evt, gestureState);
        if (this.isLongPress) {
          // 长按滑动
          this.props.onLongMove && this.props.onLongMove(evt, gestureState);
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        this.onPressOut(evt, gestureState);
      },

      onPanResponderTerminate: (evt, gestureState) => {
        this.onPressOut(evt, gestureState);
      },
    });
  }

  clearLongPressTestTimer = () => {
    if (this.longPressTestTimer) {
      clearTimeout(this.longPressTestTimer);
      this.longPressTestTimer = null;
    }
  }

  onPressOut = (evt, gestureState) => {
    this.clearLongPressTestTimer();
    // 无滑动
    if (!this.moveDirection) {
      // 按下
      this.props.onPress && this.props.onPress(evt, gestureState);
    }
    // 按下结束
    this.props.onPressOut && this.props.onPressOut(evt, gestureState);
  }

  render() {
    return (
      <View
        style={this.props.style}
        {...this.panResponder.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}

export default Touchable;
