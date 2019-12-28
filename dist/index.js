import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Typography, ListItem, ListItemSecondaryAction, FormLabel, TextField, InputAdornment, Paper, List, FormControl, Checkbox, Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, ExpansionPanelDetails, Dialog as Dialog$1, DialogTitle as DialogTitle$1, DialogContent as DialogContent$1, DialogActions as DialogActions$1 } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button$1 from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

var validateName = function validateName(name) {
  var nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};
var validateEmail = function validateEmail(email) {
  var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(email);
};
var validatePassword = function validatePassword(password) {
  var pwdRegex = /^.{6,}$/;
  return !pwdRegex.test(password);
};

var validations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	validateName: validateName,
	validateEmail: validateEmail,
	validatePassword: validatePassword
});

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 * A pattern-follower **cancel-button**
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */

var CancelButton = function CancelButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'secondary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n", "color"]);

  var history = useHistory();
  return React.createElement(Button, _extends({
    variant: "outlined",
    color: color,
    children: i18n('button.cancel'),
    onClick: onClick || function () {
      return history.goBack();
    }
  }, other));
};

CancelButton.propTypes = {
  onClick: PropTypes.func,
  i18n: PropTypes.func.isRequired,
  color: PropTypes.string
};

/**
 * A pattern-follower save-button. Required handler (onClick)
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */

var SaveButton = function SaveButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n", "color"]);

  return React.createElement(Button, _extends({
    variant: "contained",
    color: color // type="submit"
    ,
    children: i18n('button.save'),
    onClick: onClick
  }, other));
};

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired,
  color: PropTypes.string
};

/**
 * Delete Confirmation Dialog
 */

var DeleteConfirmationDialog =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DeleteConfirmationDialog, _React$Component);

  function DeleteConfirmationDialog() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DeleteConfirmationDialog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DeleteConfirmationDialog)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      open: false
    });

    return _this;
  }

  _createClass(DeleteConfirmationDialog, [{
    key: "open",
    // open dialog
    value: function open() {
      this.setState({
        open: true
      });
    } // close dialog

  }, {
    key: "close",
    value: function close() {
      this.setState({
        open: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          title = _this$props.title,
          message = _this$props.message,
          onConfirm = _this$props.onConfirm,
          i18n = _this$props.i18n;
      return React.createElement(Dialog, {
        open: this.state.open,
        onClose: function onClose() {
          return _this2.close();
        },
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, React.createElement(DialogTitle, {
        id: "alert-dialog-title"
      }, title), React.createElement(DialogContent, null, React.createElement(DialogContentText, {
        id: "alert-dialog-description"
      }, message)), React.createElement(DialogActions, null, React.createElement(Button$1, {
        variant: "text",
        onClick: function onClick() {
          return _this2.close();
        },
        className: "ml-5"
      }, i18n('button.cancel')), React.createElement(Button$1, {
        variant: "contained",
        onClick: onConfirm,
        className: "btn-danger text-white",
        autoFocus: true
      }, i18n('button.yes'))));
    }
  }]);

  return DeleteConfirmationDialog;
}(React.Component);

DeleteConfirmationDialog.propTypes = {
  i18n: PropTypes.func.isRequired
};

var TitleAndButtons = function TitleAndButtons(_ref) {
  var title = _ref.title,
      children = _ref.children,
      buttons = _ref.buttons,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'h4' : _ref$variant;
  return React.createElement(Typography, {
    variant: variant,
    className: "mb-15",
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    }
  }, !!title && title !== '' && title, !!children && children, !!buttons && buttons.length > 0 && React.createElement("div", {
    style: {
      flex: 1
    }
  }), buttons.map(function (button, index) {
    return React.cloneElement(button, {
      key: index
    });
  }));
};

TitleAndButtons.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  buttons: PropTypes.arrayOf(PropTypes.element)
};

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& > *': {
        flex: '0 0 auto',
        marginLeft: theme.spacing(1)
      }
    }
  };
});
/**
 *
 * @param {React.ReactNodeArray} buttons
 */

var BottomButtons = function BottomButtons(_ref) {
  var buttons = _ref.buttons;
  var classes = useStyles();
  return React.createElement("div", {
    className: classes.root
  }, buttons.map(function (button, key) {
    return React.cloneElement(button, {
      key: key
    });
  }));
};

BottomButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node)
};

var protectedFieldValue = '******',
    blankFieldPlaceholder = '-';
/**
 * TODO: comment/describe
 */

var DateDetail = function DateDetail(_ref) {
  var item = _ref.item,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'pt-br' : _ref$locale;
  var dateString = item.toLocaleDateString(locale),
      timeString = item.toLocaleTimeString(locale);
  return React.createElement("div", {
    key: 0,
    style: {
      flexBasis: '100%'
    }
  }, React.createElement(Typography, {
    style: {
      color: '#111',
      fontWeight: '700'
    }
  }, dateString + (!timeString || " ".concat(timeString))));
};
/**
 * TODO: comment/describe
 *
 * @param {*} param0
 */


var createConfiguredListItem = function createConfiguredListItem(_ref2) {
  var item = _ref2.item,
      listItemProperties = _ref2.listItemProperties,
      key = _ref2.key,
      onClick = _ref2.onClick,
      remove = _ref2.remove;
  var fields = [];

  if (listItemProperties) {
    listItemProperties.map(function (prop, i) {
      fields.push(React.createElement("div", {
        key: i,
        style: {
          flexBasis: '100%'
        }
      }, React.createElement(Typography, {
        style: {
          color: i > 0 ? '#666' : '#111',
          fontWeight:  '200' 
        }
      }, typeof prop === 'function' ? prop(item) : item[prop])));
    });
  } else if (_typeof(item) !== 'object') {
    fields.push(React.createElement("div", {
      key: 0,
      style: {
        flexBasis: '100%'
      }
    }, React.createElement(Typography, {
      style: {
        color: '#111',
        fontWeight: '700'
      }
    }, item)));
  } else if (item instanceof Date) {
    fields.push(React.createElement(DateDetail, {
      item: item
    }));
  }

  return React.createElement(ListItem, {
    key: key,
    style: {
      flexWrap: 'wrap',
      borderBottom: '1px solid #ddd',
      cursor: onClick ? 'pointer' : 'normal'
    },
    onClick: onClick
  }, fields, !!remove && React.createElement(ListItemSecondaryAction, null, React.createElement(IconButton, {
    edge: "end",
    onClick: function onClick() {
      remove();
    }
  }, React.createElement(DeleteIcon, null))));
};

var searchIdOfTimeout;
/**
 * TODO: comment/describe
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {object} values
 * @param {ModelBase} Type
 * @param {object} firebase
 * @param {function} i18n Translation base function. Has to receive an ID
 * @param {function} handleChange
 */

var createIdOfComponent = function createIdOfComponent(model, property, values, Type, firebase, i18n, handleChange) {
  var singleItem = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : true;
  var useOwnTitle = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
  var config = model.$fieldConfig[property];
  if (!config.searchField || !config.searchListItemProperties || !config.listItemProperties) return React.createElement("div", null, "NEED_TO_CONFIGURE_FIELD:", property, " | FieldType:IdOf", "<".concat(Type.name, ">"));
  var oService = new Type().getService(firebase);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var _useState3 = useState(!!singleItem ? null : []),
      _useState4 = _slicedToArray(_useState3, 2),
      selected = _useState4[0],
      setSelected = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      value = _useState6[0],
      setValue = _useState6[1];

  if (!selected && values[property]) {
    if (!(values[property] instanceof Array && singleItem)) {
      clearTimeout(searchIdOfTimeout);
      searchIdOfTimeout = setTimeout(function () {
        oService.get(values[property]).then(function (r) {
          setSelected(r);
        });
      }, 200);
    } else {
      clearTimeout(searchIdOfTimeout);
      searchIdOfTimeout = setTimeout(function () {
        oService.filter([['uid', 'in', values[property]]]).then(function (r) {
          setSelected(r);
        });
      }, 200);
    }
  }

  var select = function select(item) {
    return function () {
      setSelected(!!singleItem ? item : [].concat(_toConsumableArray(selected), [item]));
      setList([]);
      setValue('');
      handleChange(property, item.uid, item);
    };
  };

  return React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, useOwnTitle && React.createElement(Typography, {
    variant: "h5",
    className: "mb-10"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(TextField, {
    variant: "outlined",
    value: value,
    style: {
      width: '100%'
    },
    onChange: function onChange(e) {
      var text = e.target.value;
      setValue(text);
      clearTimeout(searchIdOfTimeout);

      if (!text) {
        setList([]);
        return;
      }

      var tend = text.substr(0, text.length - 1) + String.fromCharCode(text.substr(text.length - 1, 1).charCodeAt(0) + 1);
      searchIdOfTimeout = setTimeout(function () {
        oService.filter([[[config.searchField, '>=', text], [config.searchField, '<', tend], ['deleted', '==', false]]]); // console.log([
        // 	[
        // 		[config.searchField, '>=', text],
        // 		[config.searchField, '<', tend],
        // 		['deleted', '==', false]
        // 	]
        // ]);

        oService.limit(5).list().then(function (r) {
          setList(r);
        });
      }, 300);
    },
    InputProps: {
      startAdornment: React.createElement(InputAdornment, {
        position: "start"
      }, React.createElement(SearchIcon, null))
    }
  })), !!list.length && React.createElement(Paper, {
    elevation: 10,
    style: {
      position: 'absolute',
      zIndex: 10000,
      left: 0,
      right: 0
    }
  }, React.createElement(List, {
    style: {
      minHeight: 65,
      maxHeight: 150,
      overflow: 'scroll'
    }
  }, list.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: config.searchListItemProperties,
      key: i,
      onClick: select(item)
    });
  }))), !!selected && React.createElement("div", {
    className: "mt-10"
  }, !!singleItem && createConfiguredListItem({
    item: selected,
    listItemProperties: config.listItemProperties,
    key: 0
  }), !singleItem && selected.map(function (item, index) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: config.listItemProperties,
      key: index
    });
  })));
};

var createFormComponent = function createFormComponent(_ref3) {
  var model = _ref3.model,
      property = _ref3.property,
      values = _ref3.values,
      field = _ref3.field,
      error = _ref3.error,
      label = _ref3.label,
      i18n = _ref3.i18n,
      handleChange = _ref3.handleChange;
  var component = null;
  component = createByType({
    model: model,
    property: property,
    values: values,
    label: label,
    error: error,
    i18n: i18n,
    field: field,
    handleChange: handleChange,
    view: false
  });
  return component;
};

var createViewComponent = function createViewComponent(_ref4) {
  var model = _ref4.model,
      property = _ref4.property,
      field = _ref4.field,
      values = _ref4.values,
      label = _ref4.label,
      i18n = _ref4.i18n;
  return React.createElement("div", null, React.createElement(FormLabel, null, i18n(label)), React.createElement("div", {
    style: _objectSpread2({
      fontSize: 18,
      fontWeight: '100'
    }, field.style.field)
  }, createByType({
    model: model,
    property: property,
    values: values,
    label: label,
    i18n: i18n,
    field: field,
    handleChange: null,
    view: true
  })));
};

var createByType = function createByType(_ref5) {
  var model = _ref5.model,
      property = _ref5.property,
      values = _ref5.values,
      label = _ref5.label,
      error = _ref5.error,
      i18n = _ref5.i18n,
      field = _ref5.field,
      handleChange = _ref5.handleChange,
      _ref5$view = _ref5.view,
      view = _ref5$view === void 0 ? false : _ref5$view;
  var component = null;

  switch (field.type) {
    case FieldTypes.Boolean:
      component = createBooleanComponent({
        property: property,
        values: values,
        label: label,
        i18n: i18n,
        field: field,
        handleChange: handleChange,
        view: view
      });
      break;

    default:
      component = createTextComponent({
        property: property,
        values: values,
        field: field,
        label: label,
        i18n: i18n,
        error: error,
        handleChange: handleChange,
        view: view
      });
      break;
  }

  return component;
};

var createTextComponent = function createTextComponent(_ref6) {
  var property = _ref6.property,
      values = _ref6.values,
      field = _ref6.field,
      label = _ref6.label,
      i18n = _ref6.i18n,
      error = _ref6.error,
      handleChange = _ref6.handleChange,
      _ref6$view = _ref6.view,
      view = _ref6$view === void 0 ? false : _ref6$view;
  var component = null;
  component = !!view ? !!field.protected ? protectedFieldValue : !!values[property] && values[property] !== '' ? values[property] : blankFieldPlaceholder : React.createElement(TextField, _extends({}, field.props, {
    style: field.style.field,
    label: i18n(label),
    value: values[property],
    type: !!field.protected ? 'password' : !!field.props.type ? field.props.type : 'text',
    onChange: function onChange(e) {
      return handleChange(property, e.target.value);
    },
    helperText: error ? i18n("form.error.".concat(error)) : ' ',
    error: !!error
  }));
  return component;
};

var createBooleanComponent = function createBooleanComponent(_ref7) {
  var property = _ref7.property,
      values = _ref7.values,
      label = _ref7.label,
      i18n = _ref7.i18n,
      field = _ref7.field,
      handleChange = _ref7.handleChange,
      _ref7$view = _ref7.view,
      view = _ref7$view === void 0 ? false : _ref7$view;
  var usableLabel = i18n(label);
  return !!view ? i18n("boolean.view.".concat(values[property].toString())) : React.createElement(FormControl, null, React.createElement(FormLabel, null, usableLabel), React.createElement(Checkbox, {
    value: property,
    color: "primary",
    checked: values[property],
    onChange: function onChange(e) {
      return handleChange(property, e.target.checked);
    },
    inputProps: {
      'aria-label': usableLabel
    },
    disabled: !!field.disabled
  }));
};

var errorStyles = function errorStyles() {
  return {
    color: '#f44336',
    alignSelf: 'center',
    marginLeft: '10px',
    marginRight: '10px'
  };
};

var ErrorLabel = function ErrorLabel(_ref) {
  var children = _ref.children;
  return children && React.createElement(Typography, {
    variant: "body2",
    style: errorStyles()
  }, children);
};

ErrorLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

var validateTimeout;
/**
 * @param {property} model the model reference
 * @param {property} property the current property name
 * @param {object} Type the field type for usage on construction
 * @param {array} values values set for the field for rendering
 * @param {function} i18n Translation base function. Has to receive an ID
 * @param {function} handleChange Firebase instance for service purposes
 */

var createShapedAsComponent = function createShapedAsComponent(model, property, Type, values, i18n, _handleChange) {
  var newModel = {};
  Object.keys(Type).forEach(function (key, index) {
    if (key == '$fieldConfig') return;
    newModel[key] = '';
  });

  if (!Object.keys(values).length) {
    _handleChange(property, Object.assign({}, newModel));
  }

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      errors = _useState2[0],
      setErrors = _useState2[1];

  var validate = function validate(prop, value) {
    if (!values) return;
    clearTimeout(validateTimeout);
    Type[prop] = value;
    validateTimeout = setTimeout(function () {
      setErrors(_objectSpread2({}, errors, _defineProperty({}, prop, Type.$fieldConfig[prop].validate())));
    }, 100);
  }; // const [values, setValues] = useState(Object.assign({}, newModel));


  var fields = createFields({
    model: Type,
    baseIntl: "".concat(model.getModelName(), ".form.").concat(property),
    errors: errors,
    values: values,
    i18n: i18n,
    handleChange: function handleChange(prop, value) {
      var v = _objectSpread2({}, values, _defineProperty({}, prop, value));

      validate(prop, value);

      _handleChange(property, v);
    }
  });
  return React.createElement("div", {
    className: " mb-15"
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property, ".add"))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, fields));
};
/**
 *
 * @param {object|ModelBase} model
 * @param {string} property
 * @param {object} values
 * @param {string} error
 * @param {FieldType|any} Type
 * @param {object} firebase
 * @param {Function} i18n
 * @param {Function} handleChange
 */


var createArrayOfComponent = function createArrayOfComponent(model, property, values, error, Type, firebase, i18n, handleChange) {
  var defaultCurrentDialogValue = {},
      shouldOverflowListItems = false,
      i18nPropertyLabel = i18n("".concat(model.getModelName(), ".form.").concat(property)),
      inputs,
      errorMessage = !!error && error !== '' && i18n("form.error.".concat(error)),
      typeIsFieldType = Type instanceof FieldType,
      typeIsComplexType = !!Type.complexType,
      isIdOfModelBase = typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;

  if (!(Type instanceof FieldType) && _typeof(Type) !== 'object') {
    defaultCurrentDialogValue = '';
  } else if (!!Type.Type) {
    //collection should be predefined
    defaultCurrentDialogValue = [];
  }

  var _useState3 = useState(values[property] || []),
      _useState4 = _slicedToArray(_useState3, 2),
      list = _useState4[0],
      setList = _useState4[1],
      _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      open = _useState6[0],
      setOpen = _useState6[1],
      _useState7 = useState(defaultCurrentDialogValue),
      _useState8 = _slicedToArray(_useState7, 2),
      currentDialogValue = _useState8[0],
      setCurrentDialogValue = _useState8[1]; //Picking array of items from model instance


  if (!list.length && values[property] && values[property].length) {
    setList(values[property]);
  }

  var save = function save() {
    if (defaultCurrentDialogValue instanceof Array) {
      console.log('currentDialogValue', currentDialogValue);
      list.push.apply(list, _toConsumableArray(currentDialogValue));
    } else if (_typeof(defaultCurrentDialogValue) === 'object') {
      list.push(Object.assign({}, currentDialogValue));
    } else {
      list.push(currentDialogValue);
    }

    setCurrentDialogValue(defaultCurrentDialogValue);
    setList(list);
    setOpen(false);
    handleChange(property, list);
  };

  var remove = function remove(i) {
    return function () {
      list.splice(i, 1);
      setCurrentDialogValue(defaultCurrentDialogValue);
      setList(list);
      setOpen(false);
      handleChange(property, list);
    };
  };

  if (isIdOfModelBase) {
    //Allows overflowing
    shouldOverflowListItems = true; // console.log('isIdOfModelBase', isIdOfModelBase);

    inputs = createIdOfComponent(model, property, values, Type, firebase, i18n, function (p, uid, item) {
      setCurrentDialogValue(item);
    });
  } else if (typeIsFieldType) {
    if (typeIsComplexType) {
      switch (Type.complexType) {
        case ComplexTypes.ShapedAs:
          {
            inputs = createShapedAsComponent(model, property, new Type.Type(), currentDialogValue, i18n, function (p, fullObject) {
              setCurrentDialogValue(fullObject);
            });
            break;
          }

        case ComplexTypes.IdOf:
          {
            //Allows overflowing
            shouldOverflowListItems = true;
            inputs = createIdOfComponent(model, property, values, Type.Type, firebase, i18n, function (p, uid, item) {
              setCurrentDialogValue([].concat(_toConsumableArray(currentDialogValue), [uid]));
            }, false, false);
            break;
          }

        default:
          inputs = "DEFAULT_COMPLEX_TYPE_NOT_IMPLEMENTED: ComplexType: ".concat(Type.complexType, " | Type.name: ").concat(Type.Type.name);
          break;
      }
    } else {
      inputs = "FIELD_TYPE_NOT_IMPLEMENTED: Type ".concat(Type);
    }
  } else if (typeof Type === 'string') {
    switch (Type) {
      case FieldTypes.String:
        inputs = React.createElement(TextField, {
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            setCurrentDialogValue(e.target.value);
          }
        });
        break;

      case FieldTypes.Date:
        inputs = React.createElement(TextField, {
          type: "date",
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            setCurrentDialogValue(e.target.valueAsDate);
          }
        });
        break;

      case FieldTypes.Datetime:
        inputs = React.createElement(TextField, {
          type: "datetime",
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            setCurrentDialogValue(e.target.valueAsDate);
          }
        });
        break;
    }
  }

  return React.createElement("div", {
    className: "break-field mb-15",
    key: property
  }, React.createElement(ExpansionPanel, {
    defaultExpanded: true
  }, React.createElement(ExpansionPanelSummary, {
    expandIcon: React.createElement(ExpandMoreIcon, null)
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18nPropertyLabel, " (", list.length, ")"), errorMessage && React.createElement(Typography, {
    variant: "body1",
    style: {
      color: 'darkred'
    }
  }, errorMessage)), React.createElement(ExpansionPanelActions, {
    style: {
      padding: '0 25px'
    }
  }, React.createElement(Button, {
    variant: 'contained',
    onClick: function onClick() {
      return setOpen(true);
    },
    color: 'primary'
  }, i18n('button.add'))), React.createElement(ExpansionPanelDetails, null, React.createElement(Dialog$1, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    style: {
      root: {
        overflow: shouldOverflowListItems ? 'visible' : ''
      }
    }
  }, React.createElement(DialogTitle$1, null, i18nPropertyLabel), React.createElement(DialogContent$1, {
    style: {
      height: shouldOverflowListItems ? 300 : '',
      overflow: shouldOverflowListItems ? 'visible' : ''
    }
  }, inputs), React.createElement(DialogActions$1, null, React.createElement(SaveButton, {
    onClick: save,
    color: "primary",
    i18n: i18n
  }), React.createElement(CancelButton, {
    onClick: function onClick() {
      return setOpen(false);
    },
    color: "primary",
    autoFocus: true,
    i18n: i18n
  }))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(List, null, list.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: model.$fieldConfig[property].listItemProperties,
      key: i,
      remove: remove(i)
    });
  }))))));
};
/**
 * Creates all the fields based on the parameters passed and the field Type configuration for each one of them
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {object} param0.baseIntl Translate base id
 * @param {object} param0.errors Variable containing the error list
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.firebase Firebase instance for servicing purposes
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createFields = function createFields(_ref) {
  var model = _ref.model,
      baseIntl = _ref.baseIntl,
      errors = _ref.errors,
      values = _ref.values,
      firebase = _ref.firebase,
      i18n = _ref.i18n,
      handleChange = _ref.handleChange;
  var fields = [];
  Object.keys(model.$fieldConfig).forEach(function (property, i) {
    fields.push(createField({
      property: property,
      model: model,
      label: "".concat(baseIntl, ".").concat(property),
      errors: errors,
      values: values,
      firebase: firebase,
      i18n: i18n,
      handleChange: handleChange
    }));

    if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
      fields.push(React.createElement("div", {
        key: i,
        className: "sibling-field",
        style: {
          flexBasis: '100%'
        }
      }));
    }
  });
  return fields.filter(function (item) {
    return !!item && item !== '';
  });
};
/**
 * Creates a field based on the parameters passed and the field Type configuration
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.property Property from the model, destined to this field
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.errors Variable containing the error list
 * @param {object} param0.firebase Firebase instance for service purposes
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createField = function createField(_ref2) {
  var model = _ref2.model,
      property = _ref2.property,
      label = _ref2.label,
      values = _ref2.values,
      errors = _ref2.errors,
      firebase = _ref2.firebase,
      i18n = _ref2.i18n,
      handleChange = _ref2.handleChange;
  var field = model.$fieldConfig[property];
  var component,
      error = '',
      breakField = false,
      errorMessage = null; //If the field should be hidden, won't show up

  if (!!field.hidden) return null;

  if (!field.style) {
    field.style = {
      wrapper: {},
      field: {}
    };
  }

  if (errors[property]) {
    error = errors[property][0];
  }

  field.props = field.props || {};

  if (field.type instanceof FieldType) {
    //Getting the error message
    errorMessage = !!error && error !== '' && i18n("form.error.".concat(error));
    breakField = true;

    switch (field.type.complexType) {
      case ComplexTypes.IdOf:
        //Has to use entire line
        breakField = true;
        component = React.createElement(Card, {
          className: "mb-15",
          style: {
            overflow: 'visible'
          }
        }, React.createElement(CardContent, null, createIdOfComponent(model, property, values, field.type.Type, firebase, i18n, function (property, id) {
          handleChange(property, id);
        }), React.createElement(ErrorLabel, null, errorMessage)));
        break;

      case ComplexTypes.ArrayOf:
        //Has to use entire line
        breakField = true;
        component = createArrayOfComponent(model, property, values, error, field.type.Type, firebase, i18n, function (property, fullArray) {
          handleChange(property, fullArray);
        });
        break;

      case ComplexTypes.ShapedAs:
        //Has to use entire line
        breakField = true;

        if (!model[property]) {
          model[property] = new field.type.Type();
        }

        component = React.createElement(Card, {
          className: "mb-15"
        }, React.createElement(CardContent, null, createShapedAsComponent(model, property, new field.type.Type(), values[property], i18n, function (property, fullObject) {
          delete fullObject.$fieldConfig;
          handleChange(property, fullObject);
        }), React.createElement(ErrorLabel, null, errorMessage)));
        break;
    }
  } else {
    // switch (field.type) {
    // 	default:
    component = createFormComponent({
      model: model,
      property: property,
      values: values,
      field: field,
      error: error,
      label: label,
      i18n: i18n,
      handleChange: handleChange
    });
  }

  return React.createElement("div", {
    key: property,
    className: breakField ? 'break-field' : 'sibling-field',
    style: field.style.wrapper
  }, component);
};
/**
 *
 * @param {object} param0
 * @param {function} param0.model model instance for reference purposes
 * @param {function} param0.handleSave saving function to be invoked
 * @param {string} param0.id register/item ID
 * @param {object} param0.firebase firebase API instance
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 *
 */


var DynamicForm = function DynamicForm(_ref3) {
  var model = _ref3.model,
      handleSave = _ref3.handleSave,
      id = _ref3.id,
      firebase = _ref3.firebase,
      i18n = _ref3.i18n;

  var _useState9 = useState(model),
      _useState10 = _slicedToArray(_useState9, 2),
      values = _useState10[0],
      setValues = _useState10[1],
      _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      errors = _useState12[0],
      setErrors = _useState12[1],
      oService = useCallback(model.getService(firebase), [model, firebase]);

  useEffect(function () {
    if (id && (!model.uid || model.uid !== id)) {
      oService.get(id).then(function (r) {
        model.$fill(r);
        setValues(r);
      });
    }
  }, [model, id, oService, setValues]);
  /**
   * Update values[prop] state
   * @param {string} prop
   */

  var handleChange = useCallback(function (prop, value) {
    var v = _objectSpread2({}, values, _defineProperty({}, prop, value));

    setValues(v);
    validate(prop, value);
  }, [values, setValues, validate]);
  /**
   * Validates a property of the model
   * @param {string} prop
   * @param {any} value
   */

  var validate = useCallback(function (prop, value) {
    clearTimeout(validateTimeout);
    model[prop] = value;
    validateTimeout = setTimeout(function () {
      var validateResult = model.$fieldConfig[prop].validate();
      console.log("validate[".concat(prop, "]"), validateResult);
      setErrors(_objectSpread2({}, errors, _defineProperty({}, prop, validateResult)));
    }, 100);
  }, [errors, model]);
  /**
   * saves model at the server, after validation
   */

  var save = useCallback(function () {
    model.$fill(values);
    var validation = model.$validate();
    console.log("validation", validation);
    setErrors(validation);

    if (!Object.keys(validation).length) {
      if (handleSave) {
        handleSave(values);
      } else {
        oService.save(values);
      }
    }
  }, [setErrors, model, oService]);
  var fields = createFields({
    model: model,
    baseIntl: "".concat(model.getModelName(), ".form"),
    errors: errors,
    values: values,
    firebase: firebase,
    i18n: i18n,
    handleChange: handleChange
  });
  return React.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, React.createElement(Typography, {
    variant: "h4",
    className: "mb-15"
  }, i18n("".concat(model.getModelName(), ".form.$title"))), React.createElement("div", {
    className: "field-group"
  }, fields), React.createElement("div", null, React.createElement(BottomButtons, {
    buttons: [React.createElement(SaveButton, {
      onClick: save,
      i18n: i18n
    }), React.createElement(CancelButton, {
      i18n: i18n
    })]
  })));
};

DynamicForm.propTypes = {
  model: PropTypes.object.isRequired,
  handleSave: PropTypes.func,
  id: PropTypes.string,
  firebase: PropTypes.object.isRequired,
  i18n: PropTypes.func.isRequired
};

/**
 * Will create a displayable list of components
 *
 * @param {*} model
 * @param {*} property
 * @param {*} Type
 * @param {function} i18n
 * @param {function} handleChange
 */

var createArrayOfComponent$1 = function createArrayOfComponent(model, property, Type, i18n, handleChange) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      items = _useState2[0],
      setItems = _useState2[1];

  var component = '';
  var isIdOfModelBase = typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;

  if (isIdOfModelBase) ; else if (Type instanceof FieldType) ; else {
    switch (Type) {
      case FieldTypes.String:
        component = React.createElement(TextField, {
          label: i18n("".concat(model.getModelName(), ".form.").concat(property)),
          onChange: function onChange(e) {
            var v = !e.target.value ? [] : e.target.value.split(';');
            setItems(v.filter(function (s) {
              return !!s;
            }));
            handleChange(property, v.filter(function (s) {
              return !!s;
            }));
          },
          helperText: React.createElement("span", null, items.map(function (item, i) {
            return React.createElement("span", {
              key: i,
              className: "rounded bg-primary p-1 mr-5 text-white"
            }, item);
          }))
        });
        break;
    }
  }

  return React.createElement("div", null, React.createElement("div", null, component));
};
/**
 *
 * @param {object} model
 * @param {function} i18n
 * @param {function} updateFilters
 */


var createFilters = function createFilters(model, i18n, updateFilters) {
  var newModel = {};
  Object.keys(model).map(function (key) {
    if (key == '$fieldConfig') return;
    newModel[key] = '';
  });

  var _useState3 = useState(newModel),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1];

  var handleChange = function handleChange(property, value) {
    var v = _objectSpread2({}, values, _defineProperty({}, property, value));

    setValues(v);
    var mainF = [];
    Object.keys(v).map(function (key, i) {
      var value = v[key];

      if (value && typeof value === 'string') {
        var f = [];
        var tEnd = value.substr(0, value.length - 1) + String.fromCharCode(value.substr(value.length - 1, 1).charCodeAt(0) + 1);
        f.push([key, '>=', value]);
        f.push([key, '<', tEnd]);
        f.push(['deleted', '==', false]);
        mainF.push(f);
      } else if (value instanceof Array && value.length) {
        value.map(function (s) {
          if (!s) return;
          var f = [];
          f.push([key, 'array-contains', s]);
          f.push(['deleted', '==', false]);
          mainF.push(f);
        });
      }
    });
    updateFilters(mainF);
  };

  var filterFields = [];
  model.$fieldConfig.style = model.$fieldConfig.style || {
    field: {},
    wrapper: {}
  };
  Object.keys(model.$fieldConfig).map(function (property, i) {
    var fieldConfig = model.$fieldConfig[property];
    var label = "".concat(model.getModelName(), ".form.").concat(property);
    var component = null;

    if (fieldConfig.type instanceof FieldType) {
      switch (fieldConfig.type.complexType) {
        case ComplexTypes.IdOf:
          break;

        case ComplexTypes.ArrayOf:
          component = createArrayOfComponent$1(model, property, fieldConfig.type.Type, i18n, handleChange);
          break;

        case ComplexTypes.ShapedAs:
          break;
      }
    } else {
      switch (fieldConfig.type) {
        case FieldTypes.String:
        case FieldTypes.Integer:
        case FieldTypes.Float:
          component = React.createElement(TextField, {
            style: model.$fieldConfig.style.field,
            label: i18n(label),
            value: values[property],
            onChange: function onChange(e) {
              return handleChange(property, e.target.value);
            }
          });
          break;
      }
    }

    filterFields.push(React.createElement("div", {
      key: i,
      className: 'mr-10'
    }, component));
  });
  return filterFields;
};

var searchTimeout;

var search = function search(oService, filters) {
  clearTimeout(searchTimeout);
  if (oService.filter && typeof oService.filter === 'function') throw Error('dynamic-list-search-needs-filter()-method-implemented-at-service');

  if (filters && filters.length) {
    //will filter, then
    oService.filter(filters);
  }

  searchTimeout = setTimeout(function () {
    if (!oService.list || typeof oService.list !== 'function') throw Error('dynamic-list-service-has-to-have-list()-method');
    oService.list();
  }, 300);
};

var DynamicList = function DynamicList(_ref) {
  var reduxList = _ref.reduxList,
      model = _ref.model,
      configuration = _ref.configuration,
      baseRoute = _ref.baseRoute,
      i18n = _ref.i18n,
      firebase = _ref.firebase,
      store = _ref.store,
      serviceInstance = _ref.serviceInstance;
  var history = useHistory();
  var oService = useCallback(!!store && !!firebase && !reduxList && model.getService(firebase, store), [store, firebase, reduxList, model]);
  useEffect(function () {
    //direct service instance
    if (!!serviceInstance) oService = serviceInstance;
    search(oService, []);
  }, [oService, serviceInstance]);
  return React.createElement("div", null, React.createElement(TitleAndButtons, {
    title: i18n("".concat(model.getModelName(), ".list.$title")),
    buttons: [React.createElement(Button, {
      variant: "contained",
      color: "primary",
      onClick: function onClick() {
        history.push("".concat(baseRoute, "/form/"));
      }
    }, i18n('button.add'))]
  }), React.createElement(Card, {
    className: "mb-15"
  }, React.createElement(CardContent, null, React.createElement("div", {
    className: "field-group"
  }, createFilters(model, i18n, function (f) {
    search(oService, f);
  })))), React.createElement(Card, {
    className: "mb-15"
  }, React.createElement(CardContent, null, React.createElement(List, null, reduxList.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: configuration.listItemProperties,
      key: i,
      onClick: function onClick() {
        history.push("".concat(baseRoute, "/view/").concat(item.uid));
      }
    });
  })))));
};

DynamicList.propTypes = {
  reduxList: PropTypes.any,
  model: PropTypes.object,
  configuration: PropTypes.object,
  baseRoute: PropTypes.string,
  i18n: PropTypes.func.isRequired,
  firebase: PropTypes.object,
  serviceInstance: PropTypes.object,
  store: PropTypes.any
};

var searchIdOfTimeout$1;
/**
 * Will create an ID of component pattern
 *
 * @param {ModelBase} model The model instance for prop picking
 * @param {string} property Property specifically being treated
 * @param {object} values Values for a sequence selector
 * @param {ModelBase} Type Model type literally
 * @param {function} i18n Translation source function
 * @param {function} handleChange Event handler for changes
 */

var createIdOfComponent$1 = function createIdOfComponent(model, property, values, Type, i18n, firebase) {
  var config = model.$fieldConfig[property];

  if (!config.listItemProperties) {
    return React.createElement("div", {
      style: {
        fontWeight: 'bold',
        color: 'red'
      }
    }, "NEED_TO_CONFIGURE_FIELD: ", property, " | FieldType:IdOf", "<".concat(Type.name, ">"));
  }

  var oService = new Type().getService(firebase);

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  if (!selected && values[property]) {
    clearTimeout(searchIdOfTimeout$1);
    searchIdOfTimeout$1 = setTimeout(function () {
      oService.get(values[property]).then(function (r) {
        setSelected(r);
      });
    }, 200);
  }

  return React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property))), React.createElement("div", {
    className: "mt-10"
  }, !!selected && createConfiguredListItem({
    item: selected,
    listItemProperties: config.listItemProperties,
    key: 0
  })));
};
/**
 * Will create a shaped object display pattern
 *
 * @param {ModelBase} model The model instance for prop picking
 * @param {string} property Property specifically being treated
 * @param {ModelBase} Type Model type literally
 * @param {object} values Values for a sequence selector
 * @param {function} i18n Translation source function
 */


var createShapedAsComponent$1 = function createShapedAsComponent(model, property, Type, values, i18n) {
  var fields = createFields$1({
    model: Type,
    baseIntl: "".concat(model.getModelName(), ".form.").concat(property),
    values: values,
    i18n: i18n
  });
  return React.createElement("div", {
    className: " mb-15"
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property))), React.createElement("div", {
    style: {
      flex: 1
    }
  }, fields));
};
/**
 * Creates an array of items display pattern
 *
 * @param {ModelBase} model The model instance for prop picking
 * @param {string} property Property specifically being treated
 * @param {ModelBase} Type Model type literally
 * @param {function} i18n Translation source function
 */


var createArrayOfComponent$2 = function createArrayOfComponent(model, property, values, Type, i18n, firebase) {
  console.log('-----------');
  console.log('model', model);
  console.log('property', property);
  console.log('model[property]', model[property]);
  console.log('Type', Type);

  var typeInstance = !!Type && !!Type.Type && typeof Type.Type === 'function' && new Type.Type(),
      typeService = !!typeInstance && typeInstance instanceof ModelBase && typeInstance.getService(firebase),
      _useState3 = useState(values[property] || []),
      _useState4 = _slicedToArray(_useState3, 2),
      list = _useState4[0],
      setList = _useState4[1];

  if (!list.length && values[property].length) {
    //Is there a service behind?
    if (typeService) {
      console.log('typeService', typeService);
      typeService.filter([['uid', 'in', values[property]]]).list().then(function (result) {
        console.log('service list', result);
        setList(result);
      });
    } //No service at all, sets raw
    else {
        setList(values[property]);
      }
  }

  return React.createElement("div", {
    className: "break-field mb-15",
    key: property
  }, React.createElement(ExpansionPanel, {
    defaultExpanded: true
  }, React.createElement(ExpansionPanelSummary, {
    expandIcon: React.createElement(ExpandMoreIcon, null)
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property)), " (", list.length, ")")), React.createElement(ExpansionPanelDetails, null, React.createElement("div", {
    style: {
      flex: 1
    }
  }, React.createElement(List, null, list.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: model.$fieldConfig[property].listItemProperties,
      key: i
    });
  }))))));
};
/**
 * Creates all the fields based on the parameters passed and the field Type configuration for each one of them
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {object} param0.baseIntl Variable containing the the labelling pattern
 * @param {object} param0.values Variable containing the values of all fields
 * @param {function} param0.i18n Translation source function
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createFields$1 = function createFields(_ref) {
  var model = _ref.model,
      baseIntl = _ref.baseIntl,
      values = _ref.values,
      i18n = _ref.i18n,
      firebase = _ref.firebase;
  var fields = [];
  Object.keys(model.$fieldConfig).map(function (property, i) {
    fields.push(createField$1({
      property: property,
      model: model,
      label: "".concat(baseIntl, ".").concat(property),
      values: values,
      i18n: i18n,
      firebase: firebase
    }));

    if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
      fields.push(React.createElement("div", {
        key: i,
        className: "sibling-field",
        style: {
          flexBasis: '100%'
        }
      }));
    }
  });
  return fields.filter(function (item) {
    return !!item && item !== '';
  });
};
/**
 * Creates a field based on the parameters passed and the field Type configuration
 *
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.property Property from the model, destined to this field
 * @param {object} param0.label Variable containing the label text
 * @param {object} param0.values Variable containing the values of all fields
 * @param {function} param0.i18n Translation source function
 * @param {object} param0.firebase Firebase instance for servicing purposes
 */


var createField$1 = function createField(_ref2) {
  var model = _ref2.model,
      property = _ref2.property,
      label = _ref2.label,
      values = _ref2.values,
      i18n = _ref2.i18n,
      firebase = _ref2.firebase;
  var field = model.$fieldConfig[property];
  var component,
      breakField = false; //in case the field should be hidden, won't render

  if (!!field.hidden) return null;

  if (!field.style) {
    field.style = {
      wrapper: {},
      field: {}
    };
  }

  field.props = field.props || {};

  if (field.type instanceof FieldType) {
    breakField = true;

    switch (field.type.complexType) {
      case ComplexTypes.IdOf:
        breakField = true;
        component = React.createElement(Card, {
          className: "mb-15",
          style: {
            overflow: 'visible'
          }
        }, React.createElement(CardContent, null, createIdOfComponent$1(model, property, values, field.type.Type, i18n, firebase)));
        break;

      case ComplexTypes.ArrayOf:
        breakField = true;
        component = createArrayOfComponent$2(model, property, values, field.type.Type, i18n, firebase);
        break;

      case ComplexTypes.ShapedAs:
        breakField = true;

        if (!model[property]) {
          model[property] = new field.type.Type();
        }

        component = React.createElement(Card, {
          className: "mb-15"
        }, React.createElement(CardContent, null, createShapedAsComponent$1(model, property, new field.type.Type(), values[property], i18n)));
        break;
    }
  } else {
    //Creates a component by using an external function
    component = createViewComponent({
      model: model,
      property: property,
      field: field,
      values: values,
      label: label,
      i18n: i18n
    });
  }

  return React.createElement("div", {
    key: property,
    className: "".concat(breakField ? 'break-field' : 'sibling-field', " mb-15"),
    style: field.style.wrapper
  }, component);
};
/**
 * Will render a view, based on configuration from "model", translation souce (i18n),
 * firebase connection api, a possible ID and base-routing.
 *
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.id A compulsory object ID, from where to extract display info
 * @param {string} param0.baseRoute Variable containing the base origin of route
 * @param {function} param0.i18n Translation source function
 * @param {object} param0.firebase Firebase instance for servicing purposes
 * @param {object} param0.serviceInstance Firebase substitute instance for servicing purposes
 */


var DynamicView = function DynamicView(_ref3) {
  var model = _ref3.model,
      id = _ref3.id,
      baseRoute = _ref3.baseRoute,
      i18n = _ref3.i18n,
      firebase = _ref3.firebase,
      serviceInstance = _ref3.serviceInstance;

  var _useState5 = useState(model),
      _useState6 = _slicedToArray(_useState5, 2),
      values = _useState6[0],
      setValues = _useState6[1],
      history = useHistory(),
      deleteConfirmationDialogRef = React.createRef(),
      oService = useCallback(model.getService(firebase), [model, firebase]);

  useEffect(function () {
    //TODO: implement service flexibility
    if (id && (!model.uid || model.uid !== id)) {
      oService.get(id).then(function (r) {
        model.$fill(r);
        setValues(r);
      });
    }
  }, [model, id, oService, setValues]);
  var remove = useCallback(function () {
    oService.patch(values.uid, {
      deleted: true
    });
    deleteConfirmationDialogRef.current.close();
    history.push("".concat(baseRoute, "/list"));
  }, [oService, values, deleteConfirmationDialogRef, history]);
  var fields = createFields$1({
    model: model,
    baseIntl: "".concat(model.getModelName(), ".form"),
    values: values,
    i18n: i18n,
    firebase: firebase
  });
  return React.createElement("form", null, React.createElement(TitleAndButtons, {
    title: i18n("".concat(model.getModelName(), ".form.$title")),
    buttons: [React.createElement(Button, {
      variant: "contained",
      color: "primary",
      onClick: function onClick() {
        history.push("".concat(baseRoute, "/form/").concat(values.uid));
      }
    }, i18n('button.edit')), React.createElement(Button, {
      variant: "contained",
      className: "ml-5 btn-danger text-white",
      onClick: function onClick() {
        deleteConfirmationDialogRef.current.open();
      }
    }, i18n('button.delete'))]
  }), React.createElement(DeleteConfirmationDialog, {
    ref: deleteConfirmationDialogRef,
    title: i18n('dynamic.form.deleteConfirmation'),
    onConfirm: function onConfirm() {
      return remove();
    },
    i18n: i18n
  }), React.createElement("div", {
    className: "field-group mt-15"
  }, fields));
};

DynamicView.propTypes = {
  model: PropTypes.object.isRequired,
  id: PropTypes.string,
  baseRoute: PropTypes.string,
  i18n: PropTypes.func.isRequired,
  firebase: PropTypes.object,
  serviceInstance: PropTypes.object
};

export { BottomButtons, CancelButton, DeleteConfirmationDialog, DynamicForm, DynamicList, DynamicView, SaveButton, TitleAndButtons, validations };
