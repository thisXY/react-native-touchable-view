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
    // 滑动方向判定距离
    moveTestDirectionDistance: PropTypes.number,
    // 滑动响应节流时间 (ms)
    moveThrottleTime: PropTypes.number,
    // 是否在未得到有效滑动方向(X、Y)时一直判定
    isTillDirection: PropTypes.bool,
    // 是否捕获事件 (捕获后子事件View将不可响应)
    isCapture: PropTypes.bool,
    // 是否在非捕获事件下可被其他手势终止事件 (一般在事件View叠加或交叉时会触发)
    isTermination: PropTypes.bool,
    // 被其他手势终止事件后是否提交响应结果
    isReleaseTerminated: PropTypes.bool,
    // 按下是否判定滑动
    isPressTestMove: PropTypes.bool,
    // 是否禁用
    isDisable: PropTypes.bool,
    // X轴滑动判定角度 (相对X轴线为0度)
    xTestAngle: PropTypes.number,
    // Y轴滑动判定角度 (相对Y轴线为0度; 优先级高于X轴滑动判定角度)
    yTestAngle: PropTypes.number,
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
     * 滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveStart: PropTypes.func,
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
     * 向左滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveLeftStart: PropTypes.func,
    /**
     * 向右滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveRightStart: PropTypes.func,
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
     * 向上滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveUpStart: PropTypes.func,
    /**
     * 向下滑动开始
     * @param evt
     * @param gestureState
     */
    onMoveDownStart: PropTypes.func,
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
    moveTestDistance: 5,
    moveTestDirectionDistance: 10,
    moveThrottleTime: 10,
    isTillDirection: false,
    isCapture: false,
    isTermination: false,
    isReleaseTerminated: true,
    isPressTestMove: false,
    isDisable: false,
    xTestAngle: 45,
    yTestAngle: 45,
    onPressIn: () => {},
    onPressOut: () => {},
    onPress: () => {},
    onLongPress: () => {},
    onMoveStart: () => {},
    onMove: () => {},
    onLongMove: () => {},
    onMoveXStart: () => {},
    onMoveLeftStart: () => {},
    onMoveRightStart: () => {},
    onMoveX: () => {},
    onMoveYStart: () => {},
    onMoveUpStart: () => {},
    onMoveDownStart: () => {},
    onMoveY: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {};

    // 是否开始
    this.isStart = false;
    // 按下坐标
    this.pressInCoordinate = { x: 0, y: 0 };
    // 长按判定定时器
    this.longPressTestTimer = null;
    // 是否长按
    this.isLongPress = false;
    // 滑动方向 ['X', 'Y', false, true]
    this.moveDirection = false;
    // 滑动时间记录
    this.moveTime = 0;
    // 是否滑动
    this.isMove = false;
    // 是否被其他手势终止事件
    this.isTerminated = false;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !this.props.isDisable,

      onMoveShouldSetPanResponder: () => !this.props.isDisable,

      onStartShouldSetPanResponderCapture: () => this.props.isCapture,

      onMoveShouldSetPanResponderCapture: () => this.props.isCapture,

      onPanResponderStart: (evt, gestureState) => {
        this.isStart = true;
        this.isLongPress = false;
        this.moveDirection = false;
        this.isMove = false;
        this.isTerminated = false;
        this.pressInCoordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };

        const evtRecord = { ...evt };
        const gestureStateRecord = { ...gestureState };

        this._clearLongPressTestTimer();
        this.longPressTestTimer = setTimeout(() => {
          if (!this.isMove && (this.props.isReleaseTerminated || !this.isTerminated)) {
            // 长按
            this.props.onLongPress(evtRecord, gestureStateRecord);
            this.isLongPress = true;
          }
        }, this.props.longPressTestTime);

        // 按下开始
        this.props.onPressIn(evt, gestureState);
      },

      onPanResponderMove: (evt, gestureState) => {
        const moveThrottleTime = this.moveTime;
        this.moveTime = new Date().getTime();
        if (this.moveTime - moveThrottleTime <= this.props.moveThrottleTime) {
          return;
        }

        const coordinate = { x: evt.nativeEvent.pageX, y: evt.nativeEvent.pageY };
        if (!this.isMove) {
          this.isMove = (coordinate.y - this.pressInCoordinate.y) ** 2 + (coordinate.x - this.pressInCoordinate.x) ** 2 >= this.props.moveTestDistance ** 2;
          if (this.isMove) {
            // 滑动开始
            this.props.onMoveStart(evt, gestureState);
          }
        }
        switch (this.moveDirection) {
          // X轴滑动
          case 'X':
            this.props.onMoveX(evt, gestureState);
            break;
          // Y轴滑动
          case 'Y':
            this.props.onMoveY(evt, gestureState);
            break;
          // 未判定滑动方向
          case false:
            if (this.isMove && (coordinate.y - this.pressInCoordinate.y) ** 2 + (coordinate.x - this.pressInCoordinate.x) ** 2 >= this.props.moveTestDirectionDistance ** 2) {
              // 斜率
              const slope = (coordinate.y - this.pressInCoordinate.y) / (coordinate.x - this.pressInCoordinate.x);
              // 角度
              const angle = Math.atan(Math.abs(slope)) * (180 / Math.PI);
              if (this.props.yTestAngle >= 90 - angle) {
                this.moveDirection = 'Y';
                if (gestureState.dy > 0) {
                  // 向下滑动开始
                  this.props.onMoveDownStart(evt, gestureState);
                }
                else {
                  // 向上滑动开始
                  this.props.onMoveUpStart(evt, gestureState);
                }
                // Y轴滑动开始
                this.props.onMoveYStart(evt, gestureState);
                // Y轴滑动
                this.props.onMoveY(evt, gestureState);
              }
              else if (angle <= this.props.xTestAngle) {
                this.moveDirection = 'X';
                if (gestureState.dx > 0) {
                  // 向右滑动开始
                  this.props.onMoveRightStart(evt, gestureState);
                }
                else {
                  // 向左滑动开始
                  this.props.onMoveLeftStart(evt, gestureState);
                }
                // X轴滑动开始
                this.props.onMoveXStart(evt, gestureState);
                // X轴滑动
                this.props.onMoveX(evt, gestureState);
              }
              else if (!this.props.isTillDirection) {
                // 已判定滑动方向
                this.moveDirection = true;
              }
            }
            break;
        }

        if (this.isMove) {
          // 滑动
          this.props.onMove(evt, gestureState);

          if (this.isLongPress) {
            // 长按滑动
            this.props.onLongMove(evt, gestureState);
          }
        }
      },

      onPanResponderRelease: (evt, gestureState) => {
        this._onPressOut(evt, gestureState);
        this.isStart = false;
      },

      onPanResponderTerminationRequest: () => this.props.isTermination && !this.props.isCapture || this.props.isDisable,

      onPanResponderTerminate: (evt, gestureState) => {
        this.isTerminated = true;
        if (this.props.isReleaseTerminated) {
          this._onPressOut(evt, gestureState);
        }
        this.isStart = false;
      },
    });
  }

  /**
   * 清除长按判定定时器
   * @private
   */
  _clearLongPressTestTimer = () => {
    if (this.longPressTestTimer) {
      clearTimeout(this.longPressTestTimer);
      this.longPressTestTimer = null;
    }
  }

  /**
   * 按下结束
   * @param evt
   * @param gestureState
   * @private
   */
  _onPressOut = (evt, gestureState) => {
    this._clearLongPressTestTimer();
    if (!this.isStart) return;

    if (!this.props.isPressTestMove || !this.isMove) {
      // 按下
      this.props.onPress(evt, gestureState);
    }
    // 按下结束
    this.props.onPressOut(evt, gestureState);
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
