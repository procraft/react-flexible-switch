'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

var _utils = require('./utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Switch = function (_React$Component) {
  _inherits(Switch, _React$Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.onActivateButton = _this.onActivateButton.bind(_this);
    _this.onSlideEnd = _this.onSlideEnd.bind(_this);
    _this.onSlideStart = _this.onSlideStart.bind(_this);
    _this.onMouseLeave = _this.onMouseLeave.bind(_this);

    _this.state = { sliding: false, value: _this.props.value };
    return _this;
  }

  _createClass(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.addListener();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value === undefined) {
        return;
      }

      if (nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.value != prevState.value) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListener();
    }
  }, {
    key: 'addListener',
    value: function addListener() {
      document.addEventListener(_utils.events.mouse.start, this.onSlideStart, false);
      document.addEventListener(_utils.events.mouse.stop, this.onSlideEnd, false);
    }
  }, {
    key: 'removeListener',
    value: function removeListener() {
      document.removeEventListener(_utils.events.mouse.start, this.onSlideStart, false);
      document.removeEventListener(_utils.events.mouse.stop, this.onSlideEnd, false);
    }
  }, {
    key: 'onActivateButton',
    value: function onActivateButton() {
      this.setState({ value: !this.state.value });
    }
  }, {
    key: 'onSlideEnd',
    value: function onSlideEnd() {
      if (this.props.locked) {
        return;
      }

      if (this.state.sliding) {
        this.setState({ sliding: false, value: !this.state.value });
        (0, _utils.reEnableScroll)();
      }
    }
  }, {
    key: 'onSlideStart',
    value: function onSlideStart(e) {
      if (this.props.locked) {
        return;
      }

      if (e.target == this.refs.circle || e.target == this.refs.switch) {
        this.setState({ sliding: true });
        (0, _utils.disableScroll)();
      }
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave(e) {
      this.onSlideEnd(e);
    }
  }, {
    key: 'classes',
    value: function classes() {
      return (0, _classnames2.default)('react-flexible-switch', { 'react-flexible-switch--sliding': this.state.sliding }, { 'react-flexible-switch--active': this.state.value }, { 'react-flexible-switch--inactive': !this.state.value });
    }
  }, {
    key: 'switchStyles',
    value: function switchStyles() {
      var switchStyles = this.switchStylesProps();
      return (0, _utils.merge)({ borderRadius: switchStyles.width / 2 }, switchStyles);
    }
  }, {
    key: 'translationStyle',
    value: function translationStyle() {
      var circleStyles = this.circleStylesProps();
      var switchStyles = this.switchStyles();

      var offset = switchStyles.width - circleStyles.diameter;
      var translation = this.state.value ? offset : 0;

      if (this.state.sliding && this.state.value) {
        translation -= circleStyles.diameter / 4 + switchStyles.padding / 4;
      }

      return {
        transform: 'translateX(' + translation + 'px)'
      };
    }
  }, {
    key: 'backgroundStyle',
    value: function backgroundStyle() {
      var circleStyles = this.circleStylesProps();
      var backgroundColor = this.state.value ? circleStyles.onColor : circleStyles.offColor;
      return { backgroundColor: backgroundColor };
    }
  }, {
    key: 'circleStylesProps',
    value: function circleStylesProps() {
      return (0, _utils.merge)(defaultCircleStyles, this.props.circleStyles);
    }
  }, {
    key: 'switchStylesProps',
    value: function switchStylesProps() {
      return (0, _utils.merge)(defaultSwitchStyles, this.props.switchStyles);
    }
  }, {
    key: 'circleDimensionsStyle',
    value: function circleDimensionsStyle() {
      var switchStyles = this.switchStyles();
      var circleStyles = this.circleStylesProps();
      var width = this.state.sliding ? circleStyles.diameter + circleStyles.diameter / 4 : circleStyles.diameter;
      return { width: width, height: circleStyles.diameter };
    }
  }, {
    key: 'circleStyles',
    value: function circleStyles() {
      return (0, _utils.merge)(this.circleDimensionsStyle(), this.backgroundStyle(), this.translationStyle(), this.circleStylesProps());
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        {
          style: this.switchStyles(),
          className: this.classes(),
          ref: 'switch',
          onMouseLeave: this.onMouseLeave
        },
        _react2.default.createElement(_Label2.default, {
          active: this.state.value,
          labels: this.props.labels,
          ref: 'label'
        }),
        _react2.default.createElement('span', {
          style: this.circleStyles(),
          className: 'react-flexible-switch-circle',
          ref: 'circle'
        }),
        _react2.default.createElement('button', {
          disabled: this.props.locked,
          onClick: this.onActivateButton,
          style: hiddenButtonStyles,
          type: 'button',
          ref: 'button'
        })
      );
    }
  }]);

  return Switch;
}(_react2.default.Component);

var defaultSwitchStyles = {
  width: 80,
  padding: 4,
  border: '1px solid #CFCFCF',
  display: 'flex',
  position: 'relative',
  backgroundColor: 'white',
  boxSizing: 'content-box'
};

var defaultCircleStyles = {
  diameter: 35,
  borderRadius: 35,
  display: 'block',
  transition: 'transform 200ms, width 200ms, background-color 200ms',
  onColor: '#70D600',
  offColor: '#CFCFCF'
};

var hiddenButtonStyles = {
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  color: 'transparent',
  height: '100%',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: '100%'
};

Switch.propTypes = {
  value: _propTypes2.default.bool,

  circleStyles: _propTypes2.default.shape({
    onColor: _propTypes2.default.string,
    offColor: _propTypes2.default.string,
    diameter: _propTypes2.default.number
  }),

  labels: _propTypes2.default.shape({
    on: _propTypes2.default.string,
    off: _propTypes2.default.string
  }),

  locked: _propTypes2.default.bool,

  onChange: _propTypes2.default.func,

  switchStyles: _propTypes2.default.shape({
    width: _propTypes2.default.number
  })
};

Switch.defaultProps = {
  onChange: function onChange() {},
  circleStyles: defaultCircleStyles,
  switchStyles: defaultSwitchStyles,
  labels: { on: '', off: '' },
  locked: false
};

exports.default = Switch;