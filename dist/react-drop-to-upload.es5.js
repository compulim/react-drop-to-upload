'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NOOP = function NOOP() {
  return 0;
};

var DropToUpload = function (_Component) {
  _inherits(DropToUpload, _Component);

  function DropToUpload(props) {
    _classCallCheck(this, DropToUpload);

    var _this = _possibleConstructorReturn(this, (DropToUpload.__proto__ || Object.getPrototypeOf(DropToUpload)).call(this, props));

    _this.handleDragOver = _this.handleDragOver.bind(_this);
    _this.handleDragLeave = _this.handleDragLeave.bind(_this);
    _this.handleDrop = _this.handleDrop.bind(_this);
    return _this;
  }

  _createClass(DropToUpload, [{
    key: 'handleDragOver',
    value: function handleDragOver(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      if (this.props.dropEffect) {
        evt.dataTransfer.dropEffect = this.props.dropEffect;
      }

      this.props.onOver(evt);
    }
  }, {
    key: 'handleDragLeave',
    value: function handleDragLeave(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      this.props.onLeave(evt);
    }
  }, {
    key: 'handleDrop',
    value: function handleDrop(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      var _props = this.props;
      var onDrop = _props.onDrop;
      var onDropArrayBuffer = _props.onDropArrayBuffer;
      var onDropDataURI = _props.onDropDataURI;


      var files = [].slice.call(getEventFiles(evt));

      if (files.length) {
        onDrop === NOOP || onDrop(files);

        onDropArrayBuffer === NOOP || Promise.all(files.map(function (file) {
          return readAsArrayBuffer(file);
        })).then(function (arrayBuffers) {
          return onDropArrayBuffer(arrayBuffers, files);
        });

        onDropDataURI === NOOP || Promise.all(files.map(function (file) {
          return readAsDataURI(file);
        })).then(function (dataURIs) {
          return onDropDataURI(dataURIs, files);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;


      return _react2.default.createElement(this.props.element, {
        className: props.className,
        id: props.id,
        onDragOver: this.handleDragOver,
        onDragLeave: this.handleDragLeave,
        onDrop: this.handleDrop,
        style: props.style
      }, this.props.children);
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        element: 'div',
        onDrop: NOOP,
        onDropArrayBuffer: NOOP,
        onDropDataURI: NOOP,
        onOver: NOOP,
        onLeave: NOOP
      };
    }
  }, {
    key: 'propTypes',
    get: function get() {
      return {
        className: _react.PropTypes.string,
        dropEffect: _react.PropTypes.oneOf(['copy', 'link', 'move', 'none']),
        element: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.string]),
        id: _react.PropTypes.string,
        onDropArrayBuffer: _react.PropTypes.func,
        onDropDataURI: _react.PropTypes.func,
        onOver: _react.PropTypes.func,
        onLeave: _react.PropTypes.func,
        style: _react.PropTypes.any
      };
    }
  }]);

  return DropToUpload;
}(_react.Component);

exports.default = DropToUpload;


function getEventFiles(evt) {
  return evt.target.files || (evt.dataTransfer ? evt.dataTransfer.files : null);
}

function readAsArrayBuffer(file) {
  return readAs(file, 'ArrayBuffer');
}

function readAsDataURI(file) {
  return readAs(file, 'DataURL');
}

function readAs(file, type) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onerror = function () {
      return reject(reader.error);
    };
    reader.onloadend = function () {
      return resolve(reader.result);
    };

    reader['readAs' + type](file);
  });
}