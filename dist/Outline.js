"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OutlineInternal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _makeCancellablePromise = _interopRequireDefault(require("make-cancellable-promise"));

var _makeEventProps = _interopRequireDefault(require("make-event-props"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _DocumentContext = _interopRequireDefault(require("./DocumentContext"));

var _OutlineContext = _interopRequireDefault(require("./OutlineContext"));

var _OutlineItem = _interopRequireDefault(require("./OutlineItem"));

var _utils = require("./shared/utils");

var _propTypes2 = require("./shared/propTypes");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var OutlineInternal =
/*#__PURE__*/
function (_PureComponent) {
  (0, _inherits2["default"])(OutlineInternal, _PureComponent);

  function OutlineInternal() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2["default"])(this, OutlineInternal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (_getPrototypeOf2 = (0, _getPrototypeOf3["default"])(OutlineInternal)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      outline: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadOutline", function _callee() {
      var pdf, cancellable, outline;
      return _regenerator["default"].async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pdf = _this.props.pdf;

              _this.setState(function (prevState) {
                if (!prevState.outline) {
                  return null;
                }

                return {
                  outline: null
                };
              });

              _context.prev = 2;
              cancellable = (0, _makeCancellablePromise["default"])(pdf.getOutline());
              _this.runningTask = cancellable;
              _context.next = 7;
              return _regenerator["default"].awrap(cancellable.promise);

            case 7:
              outline = _context.sent;

              _this.setState({
                outline: outline
              }, _this.onLoadSuccess);

              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);

              _this.onLoadError(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[2, 11]]);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onLoadSuccess", function () {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var outline = _this.state.outline;
      (0, _utils.callIfDefined)(onLoadSuccess, outline);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onLoadError", function (error) {
      _this.setState({
        outline: false
      });

      (0, _utils.errorOnDev)(error);
      var onLoadError = _this.props.onLoadError;
      (0, _utils.callIfDefined)(onLoadError, error);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onItemClick", function (_ref) {
      var pageIndex = _ref.pageIndex,
          pageNumber = _ref.pageNumber;
      var onItemClick = _this.props.onItemClick;
      (0, _utils.callIfDefined)(onItemClick, {
        pageIndex: pageIndex,
        pageNumber: pageNumber
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(OutlineInternal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pdf = this.props.pdf;

      if (!pdf) {
        throw new Error('Attempted to load an outline, but no document was specified.');
      }

      this.loadOutline();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pdf = this.props.pdf;

      if (prevProps.pdf && pdf !== prevProps.pdf) {
        this.loadOutline();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _utils.cancelRunningTask)(this.runningTask);
    }
  }, {
    key: "renderOutline",
    value: function renderOutline() {
      var outline = this.state.outline;
      return _react["default"].createElement("ul", null, outline.map(function (item, itemIndex) {
        return _react["default"].createElement(_OutlineItem["default"], {
          key: typeof item.destination === 'string' ? item.destination : itemIndex,
          item: item
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var pdf = this.props.pdf;
      var outline = this.state.outline;

      if (!pdf || !outline) {
        return null;
      }

      var _this$props = this.props,
          className = _this$props.className,
          inputRef = _this$props.inputRef;
      return _react["default"].createElement("div", (0, _extends2["default"])({
        className: (0, _mergeClassNames["default"])('react-pdf__Outline', className),
        ref: inputRef
      }, this.eventProps), _react["default"].createElement(_OutlineContext["default"].Provider, {
        value: this.childContext
      }, this.renderOutline()));
    }
  }, {
    key: "childContext",
    get: function get() {
      return {
        onClick: this.onItemClick
      };
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;

      // eslint-disable-next-line react/destructuring-assignment
      return (0, _makeEventProps["default"])(this.props, function () {
        return _this2.state.outline;
      });
    }
    /**
     * Called when an outline is read successfully
     */

  }]);
  return OutlineInternal;
}(_react.PureComponent);

exports.OutlineInternal = OutlineInternal;
OutlineInternal.propTypes = _objectSpread({
  className: _propTypes2.isClassName,
  inputRef: _propTypes["default"].func,
  onItemClick: _propTypes["default"].func,
  onLoadError: _propTypes["default"].func,
  onLoadSuccess: _propTypes["default"].func,
  pdf: _propTypes2.isPdf
}, _propTypes2.eventProps);

function Outline(props, ref) {
  return _react["default"].createElement(_DocumentContext["default"].Consumer, null, function (context) {
    return _react["default"].createElement(OutlineInternal, (0, _extends2["default"])({
      ref: ref
    }, context, props));
  });
}

var _default = _react["default"].forwardRef(Outline);

exports["default"] = _default;