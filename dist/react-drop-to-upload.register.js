'use strict';

System.register(['react'], function (_export, _context) {
  "use strict";

  var React, Component, PropTypes, _createClass, NOOP, DropToUpload;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

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
  return {
    setters: [function (_react) {
      React = _react.default;
      Component = _react.Component;
      PropTypes = _react.PropTypes;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      NOOP = function NOOP() {
        return 0;
      };

      DropToUpload = function (_Component) {
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


            return React.createElement(this.props.element, {
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
              className: PropTypes.string,
              dropEffect: PropTypes.oneOf(['copy', 'link', 'move', 'none']),
              element: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
              id: PropTypes.string,
              onDropArrayBuffer: PropTypes.func,
              onDropDataURI: PropTypes.func,
              onOver: PropTypes.func,
              onLeave: PropTypes.func,
              style: PropTypes.any
            };
          }
        }]);

        return DropToUpload;
      }(Component);

      _export('default', DropToUpload);
    }
  };
});