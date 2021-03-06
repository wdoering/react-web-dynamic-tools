import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles, Tooltip, IconButton, Typography, TextField, ListItem, ListItemSecondaryAction, FormLabel, InputAdornment, Paper, List, FormControlLabel, Checkbox, useTheme, useMediaQuery, Button, Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, ExpansionPanelDetails, Dialog as Dialog$1, DialogTitle as DialogTitle$1, DialogContent as DialogContent$1, DialogActions as DialogActions$1, Chip } from '@material-ui/core';
import AddRounded from '@material-ui/icons/AddRounded';
import 'date-fns';
import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';
import IconButton$1 from '@material-ui/core/IconButton';
import EmailRounded from '@material-ui/icons/EmailRounded';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import { makeStyles as makeStyles$1 } from '@material-ui/styles';
import classNames from 'classnames';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import CancelRounded from '@material-ui/icons/CancelRounded';
import KeyboardReturnRounded from '@material-ui/icons/KeyboardReturnRounded';
import EditRounded from '@material-ui/icons/EditRounded';
import SaveRounded from '@material-ui/icons/SaveRounded';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button$1 from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import InfoIcon from '@material-ui/icons/InfoRounded';

var validateName = function validateName(name) {
  var nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
};
var validateWebsite = function validateWebsite(webSite) {
  var webSiteRegex = /^((https?:\/\/)|(https?:\/\/)(www\.)|(www\.))?[a-zA-Z]{1,}[\.\-_]{0,}[a-zA-Z0-9%_\-.\+~#=]{1,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return webSiteRegex.test(webSite);
};
var validateEmail = function validateEmail(email) {
  var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(email);
};
var validatePassword = function validatePassword(password) {
  var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  var pwdRegex = new RegExp("^.{".concat(minLength, ",}$"));
  return !pwdRegex.test(password);
};
/**
 * Based on: https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 *
 * Will apply **three** rules:
 *
 * * normalize()ing to NFD Unicode normal form decomposes combined
 * 	 graphemes into the combination of simple ones. The è of Crème ends up expressed as e + ̀.
 * * Using a regex character class to match the U+0300 → U+036F range,
 * 	 it is now trivial to globally get rid of the diacritics,
 *   which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
 * * Removes any non-text/non-number char;
 *
 * @param {string} text The text to be cleansed
 * @param {Boolean} removeSpaces [optional] If spaces shold be removed
 *
 * @returns {string}
 */

var removeSpecialChars = function removeSpecialChars(text) {
  var removeSpaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var alphaNumericRegex = !removeSpaces ? /[^a-zA-Z0-9\s@]/g : /[^a-zA-Z0-9@]/g;
  return typeof text === 'string' ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(alphaNumericRegex, '') : text;
};
/**
 * Tests whether the text itself is a valid e-mail or website; Known-types then
 *
 * @param {string} text The text to be tested
 *
 * @return {Boolean}
 */

var textIsKnownType = function textIsKnownType(text) {
  return typeof text === 'string' && (validateEmail(text) || validateWebsite(text));
};

var validations = /*#__PURE__*/Object.freeze({
	__proto__: null,
	validateName: validateName,
	validateWebsite: validateWebsite,
	validateEmail: validateEmail,
	validatePassword: validatePassword,
	removeSpecialChars: removeSpecialChars,
	textIsKnownType: textIsKnownType
});

function _typeof(obj) {
  "@babel/helpers - typeof";

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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
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
 * Hook for triggering a common enter-key-press action
 *
 * @param {Function} callback the function which will be triggered
 *
 * @returns {Function} the function to be used with an "onKeyPress" or any trigger
 */

var useEnterPress = function useEnterPress(callback) {
  var onEnterPress = useCallback(function (e) {
    if (e.key === 'Enter' && !!callback && typeof callback === 'function') callback(e);
    e.stopPropagation();
  }, [callback]);
  return onEnterPress;
};

/**
 * Firebase in-array slice limit
 */
var arraySliceLength = 10;
/**
 * Utility for array slicing up to 10 itens
 * When building in-array for firebase-basic-service queries
 *
 * @param {string} property The property to be compared
 * @param {array} items List items of string
 */

var inArray = function inArray(property, items) {
  var filters = [];

  for (var i = 0; i < items.length / arraySliceLength; i += arraySliceLength) {
    filters.push(["".concat(property), 'in', items.slice(i, i + arraySliceLength)]);
  }

  return filters;
};

var errorStyles = makeStyles({
  root: {
    color: '#f44336',
    alignSelf: 'center',
    marginLeft: '10px',
    marginRight: '10px'
  }
});
var textFieldStyles = makeStyles({
  spacer: {
    marginBottom: '10px'
  }
});
var filterTextField = makeStyles(function (theme) {
  return {
    root: {},
    textField: {
      flex: 1,
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  };
});
var viewInfoStyles = makeStyles(function (theme) {
  return {
    root: {
      marginBottom: theme.spacing(2)
    },
    title: {
      marginBottom: '5px'
    },
    detail: {
      marginTop: 5,
      marginBottom: 5,
      fontSize: 18,
      fontWeight: '100'
    }
  };
});
var viewInfoLink = makeStyles(function (theme) {
  return {
    root: {},
    icon: {
      marginLeft: theme.spacing(1)
    }
  };
});
var listResultText = makeStyles({
  root: {
    marginTop: 0,
    marginBottom: 10
  }
});
var listEmptyStyles = makeStyles(function (theme) {
  return {
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& > *': {
        flex: '0 0 auto',
        marginBottom: theme.spacing(2)
      }
    }
  };
});

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {Element} param0.icon the icon to be used
 * @param {Function} param0.i18n the translation source
 * @param {string} param0.type the type of the info
 * @param {Boolean} param0.external If it opens an external link
 */

var InfoWithIcon = function InfoWithIcon(_ref) {
  var text = _ref.text,
      icon = _ref.icon,
      i18n = _ref.i18n,
      _ref$iconProps = _ref.iconProps,
      iconProps = _ref$iconProps === void 0 ? null : _ref$iconProps,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'link' : _ref$type,
      _ref$external = _ref.external,
      external = _ref$external === void 0 ? true : _ref$external;
  var classes = viewInfoLink();
  return React.createElement("div", {
    className: classes.root
  }, text, React.createElement(Tooltip, {
    title: i18n("view.text.info.".concat(type)),
    arrow: true
  }, React.createElement(IconButton, _extends({
    variant: "text",
    className: classes.icon,
    "aria-label": text,
    size: "small",
    target: external ? '_blank' : '_self'
  }, iconProps), React.cloneElement(icon))));
};

InfoWithIcon.propTypes = {
  text: PropTypes.string,
  external: PropTypes.bool,
  i18n: PropTypes.func,
  type: PropTypes.oneOf(['link', 'website', 'email', 'phone']),
  icon: PropTypes.element
};

/**
 * Renders an email "mailto:" (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {string} param0.i18n the translation source for tooltip/text
 * @param {string} param0.external [optional] if it opens an external link
 */

var EmailInfo = function EmailInfo(_ref) {
  var text = _ref.text,
      i18n = _ref.i18n,
      _ref$external = _ref.external,
      external = _ref$external === void 0 ? true : _ref$external;
  return React.createElement(InfoWithIcon, {
    text: text,
    icon: React.createElement(EmailRounded, null),
    i18n: i18n,
    external: external,
    type: "email",
    iconProps: {
      component: 'a',
      href: "mailto:".concat(text)
    }
  });
};

EmailInfo.propTypes = {
  text: PropTypes.string,
  external: PropTypes.bool
};

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {string} param0.i18n the translation source for tooltip/text
 * @param {string} param0.external [optional] if it opens an external link
 */

var WebSiteInfo = function WebSiteInfo(_ref) {
  var text = _ref.text,
      i18n = _ref.i18n,
      _ref$external = _ref.external,
      external = _ref$external === void 0 ? true : _ref$external;
  return React.createElement(InfoWithIcon, {
    text: text,
    icon: React.createElement(LaunchRounded, null),
    i18n: i18n,
    external: external,
    type: "website",
    iconProps: {
      component: 'a',
      href: "".concat(text)
    }
  });
};

WebSiteInfo.propTypes = {
  text: PropTypes.string,
  external: PropTypes.bool
};

var useStyles = makeStyles$1(function (theme) {
  return {
    root: {
      marginTop: theme.spacing(1),
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

var EmptyRelation = function EmptyRelation(_ref) {
  var i18n = _ref.i18n;
  var classes = viewInfoStyles();
  return React.createElement(Typography, {
    variant: "body2",
    className: classes.detail
  }, i18n('form.idof.not.informed'));
};

EmptyRelation.propTypes = {
  i18n: PropTypes.func.isRequired
};

var ErrorLabel = function ErrorLabel(_ref) {
  var children = _ref.children;
  var classes = errorStyles();
  return children && React.createElement(Typography, {
    variant: "body2",
    className: classes.root
  }, children);
};

var useStyles$1 = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      '& > .sibling-field': {
        flex: 1,
        flexGrow: 1,
        marginRight: '10px',
        minWidth: '100px',
        flexBasis: '120px',
        overflowWrap: 'break-word',
        '& .MuiFormControl-root': {
          width: '100%'
        }
      },
      '& > .break-field': {
        flexBasis: '100%'
      }
    },
    rootWithMarginTop: {
      marginTop: 15
    }
  };
});
/**
 * Renders a default group-wrapper div, with possibility of margin-top-15
 *
 * @param {*} param0
 */

var FieldGroup = function FieldGroup(_ref) {
  var children = _ref.children,
      _ref$marginTop = _ref.marginTop,
      marginTop = _ref$marginTop === void 0 ? false : _ref$marginTop;
  var classes = useStyles$1();
  return React.createElement("div", {
    className: classNames('field-group', classes.root, _defineProperty({}, classes.rootWithMarginTop, marginTop))
  }, children);
};

FieldGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node, PropTypes.arrayOf(PropTypes.element), PropTypes.arrayOf(PropTypes.node)]),
  marginTop: PropTypes.bool
};

/**
 * Renders an input with defined type
 *
 * @param {Object} param0
 */

var FormInput = function FormInput(_ref) {
  var label = _ref.label,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$onChange = _ref.onChange,
      _onChange = _ref$onChange === void 0 ? function (e) {
    return console.error('FormInput:value:onChangeNotImplemented', e.target.value);
  } : _ref$onChange,
      otherProps = _objectWithoutProperties(_ref, ["label", "type", "onChange"]);

  return React.createElement(TextField, _extends({
    variant: "outlined",
    type: type,
    label: label,
    onChange: function onChange(e) {
      _onChange(e);
    }
  }, otherProps));
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func
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
  }, dateString + (!!timeString ? " ".concat(timeString) : '')));
};

var mergeSets = function mergeSets(set0, setOrObject1) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var merged = null;

  if (defaultValue instanceof Array && setOrObject1 instanceof Array) {
    merged = [].concat(_toConsumableArray(set0), _toConsumableArray(setOrObject1));
  } else if (_typeof(defaultValue) === 'object') {
    merged = [].concat(_toConsumableArray(set0), [Object.assign({}, setOrObject1)]);
  } else {
    merged = [].concat(_toConsumableArray(set0), [setOrObject1]);
  }

  return merged;
};

var removeFromSet = function removeFromSet(set0, itemRemoving, indexRemoving) {
  var itemIsObject = itemRemoving instanceof Object && !!itemRemoving.uid,
      newList = _toConsumableArray(set0.filter(function (item, index) {
    return itemIsObject ? itemRemoving.uid !== item : index !== indexRemoving;
  }));

  return newList;
};
/**
 * Checks whether a type should use a service
 *
 * @param {FieldType} Type The type being checked
 */


var typeShouldUseService = function typeShouldUseService(Type) {
  var should = false; //Type is a FieldType
  //And is specific shape
  //No service will exist behind

  if (!!Type && !!Type.complexType && Type instanceof FieldType && Type.complexType !== ComplexTypes.ShapedAs) {
    should = true;
  }

  return should;
};

var typeInstance, typeService;
/**
 * Creates a type service based on a Type instance
 *
 * @param {FieldType} Type The type being used for instance & service
 * @param {object} firebase The base object for connections
 */

var getTypeService = function getTypeService(Type, firebase) {
  typeInstance = !!Type && !!Type.Type && typeof Type.Type === 'function' && new Type.Type();
  return !!typeInstance && typeInstance instanceof ModelBase && typeInstance.getService(firebase);
};
/**
 * Will create an instance of Type=>Service, then request a list of objects,
 * based on a set/array of **uid-strings** specified at **objectWithProps**
 *
 * @param {string} property The prop name being used for reference
 * @param {FieldType} Type The type being used for instance & service
 * @param {ModelBase|object} objectWithProps The object which contains an array-prop with uid-strings
 * @param {object} firebase The base object for connections
 */


var getServiceList = function getServiceList(property, Type, objectWithProps, firebase) {
  typeService = getTypeService(Type, firebase);
  if (!typeService) throw Error('getServiceList-requires-valid-typeService-instance');
  return typeService.filter(inArray('uid', objectWithProps[property])).list().then(function (result) {
    return Promise.resolve(result);
  }).catch(function (e) {
    throw e;
  });
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
          fontWeight: i > 0 ? '200' : '700'
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
  }, fields, !!remove && React.createElement(ListItemSecondaryAction, null, React.createElement(IconButton$1, {
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
  var currentDialogValue = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  var singleItem = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : true;
  var useOwnTitle = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;
  var config = model.$fieldConfig[property]; //Validating prior to using

  if (!config.searchField || !config.searchListItemProperties || !config.listItemProperties) return React.createElement("div", null, "NEED_TO_CONFIGURE_FIELD:", property, " | FieldType:IdOf", "<".concat(!!Type ? Type.name : 'undefined', ">"), "}", React.createElement("p", null, "MODEL: ", JSON.stringify(model)));

  var oService = new Type().getService(firebase),
      _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1],
      _useState3 = useState(!!currentDialogValue ? currentDialogValue : !!singleItem ? null : []),
      _useState4 = _slicedToArray(_useState3, 2),
      selected = _useState4[0],
      setSelected = _useState4[1],
      _useState5 = useState(''),
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
  } else if (!!selected && selected instanceof Array && selected.length > 0 && (!currentDialogValue || currentDialogValue instanceof Array && currentDialogValue.length === 0)) {
    setSelected(currentDialogValue);
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
  }, React.createElement(FormInput, {
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
        oService.filter([[[config.searchField, '>=', text], [config.searchField, '<', tend], ['deleted', '==', false]]]).limit(5).list().then(function (r) {
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
  var classes = viewInfoStyles();
  return React.createElement("div", {
    className: classes.root
  }, React.createElement(FormLabel, {
    className: classes.title
  }, i18n(label)), React.createElement("div", {
    className: classes.detail,
    style: field.style.field
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
      {
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
      }

    case FieldTypes.Datetime:
      {
        component = createDatePickerComponent({
          property: property,
          values: values,
          label: label,
          i18n: i18n,
          field: field,
          handleChange: handleChange,
          view: view
        });
        break;
      }

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

var createDatePickerComponent = function createDatePickerComponent(_ref6) {
  var property = _ref6.property,
      values = _ref6.values,
      field = _ref6.field,
      label = _ref6.label,
      i18n = _ref6.i18n,
      error = _ref6.error,
      handleChange = _ref6.handleChange,
      _ref6$view = _ref6.view,
      view = _ref6$view === void 0 ? false : _ref6$view;

  var classes = textFieldStyles(),
      // [selectedDate, setSelectedDate] = useState(values[property] || ''),
  handleChg = function handleChg(date) {
    console.log('createDatePickerComponent:handleChg:date', date); // selectedDate

    handleChange(property, date); //Field has specific onChange function, runs after manipulation

    if (!!field.onChange && typeof field.onChange === 'function') field.onChange(null, values, property, date, handleChange);
  };

  var value = '';

  if (!!view) {
    if (values.hasOwnProperty(property)) {
      value = values[property];
    } else {
      value = '';
    }
  } else {
    if (values.hasOwnProperty(property) && values[property] !== '') {
      value = values[property];
    } else {
      value = !!field.defaultValue ? field.defaultValue : '';
    }
  }

  if (null !== value && '' !== value) {
    if (_typeof(value) === 'object' && !(value instanceof Date)) {
      if (typeof value.toDate === 'function') {
        value = value.toDate();
      } else {
        value = new Date((!!value._seconds ? value._seconds : value.seconds) * 1000);
      }
    } else if (typeof value === 'string') {
      value = new Date(Date.parse(value));
    }
  }

  return !!view ? null !== value && '' !== value ? typeof value.toDate === 'function' ? value.toDate().toLocaleString() : typeof value.toLocaleString === 'function' ? value.toLocaleString() : value : blankFieldPlaceholder : React.createElement(MuiPickersUtilsProvider, {
    utils: DateFnsUtils
  }, React.createElement(Tooltip, {
    arrow: true,
    title: i18n("form.datepicker.".concat(property))
  }, React.createElement(React.Fragment, null, React.createElement(KeyboardDateTimePicker, _extends({
    disabled: view,
    disableToolbar: true,
    inputVariant: "outlined",
    variant: "dialog",
    format: "dd/MM/yyyy HH:mm",
    margin: "normal",
    id: "date-picker-".concat(property),
    label: i18n(label) // value={selectedDate}
    ,
    value: value,
    onChange: handleChg,
    KeyboardButtonProps: {
      'aria-label': label
    },
    error: !!error && !view,
    helperText: !view && !!error ? i18n("form.error.".concat(error)) : ' ',
    className: classes.spacer
  }, field.props)))));
};

var createTextComponent = function createTextComponent(_ref7) {
  var property = _ref7.property,
      values = _ref7.values,
      field = _ref7.field,
      label = _ref7.label,
      i18n = _ref7.i18n,
      error = _ref7.error,
      handleChange = _ref7.handleChange,
      _ref7$view = _ref7.view,
      view = _ref7$view === void 0 ? false : _ref7$view;

  var classes = textFieldStyles(),
      _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      inputVisible = _useState8[0],
      setInputVisible = _useState8[1],
      handleVisibilityClick = function handleVisibilityClick(e) {
    //Toggling visibility
    return setInputVisible(!inputVisible);
  };

  var component = null;
  component = !!view ? !!field.protected ? protectedFieldValue : !!values[property] && values[property] !== '' ? React.createElement(TextStyleByType, {
    text: values[property],
    i18n: i18n
  }) : blankFieldPlaceholder : React.createElement(FormInput //TODO: uncomment when usable
  // disabled={!!view}
  , _extends({
    className: classes.spacer,
    InputProps: !!field.protected ? {
      endAdornment: React.createElement(InputAdornment, {
        position: "end"
      }, React.createElement(Tooltip, {
        title: i18n('button.password.showOrHide.tooltip'),
        arrow: true
      }, React.createElement(IconButton$1, {
        edge: "end",
        onClick: handleVisibilityClick
      }, inputVisible ? React.createElement(VisibilityOffIcon, null) : React.createElement(VisibilityIcon, null))))
    } : {},
    inputProps: {
      style: !!field.style.field ? field.style.field : {}
    },
    label: i18n(label) //TODO: uncomment when usable
    // value={value}
    ,
    value: values[property],
    type: fieldTypeByName(!!field.type ? field.type : FieldTypes.String, field.protected, inputVisible),
    onChange: function onChange(e) {
      //TODO: uncomment when usable
      // if (!!view) return false;
      handleChange(property, e.target.value); //Field has specific onChange function, runs after manipulation

      if (!!field.onChange && typeof field.onChange === 'function') field.onChange(e, values, property, e.target.value, handleChange);
    },
    helperText: !view && !!error ? i18n("form.error.".concat(error)) : ' ',
    error: !!error && !view
  }, field.props));
  return component;
};

var createBooleanComponent = function createBooleanComponent(_ref8) {
  var property = _ref8.property,
      values = _ref8.values,
      label = _ref8.label,
      i18n = _ref8.i18n,
      field = _ref8.field,
      handleChange = _ref8.handleChange,
      _ref8$view = _ref8.view,
      view = _ref8$view === void 0 ? false : _ref8$view;

  var classes = textFieldStyles(),
      usableLabel = i18n(label),
      propValue = values[property],
      onChange = function onChange(e) {
    handleChange(property, e.target.checked); //Field has specific onChange function, runs after manipulation

    if (!!field.onChange && typeof field.onChange === 'function') field.onChange(e, values, property, e.target.checked, handleChange);
  };

  return !!view ? i18n("boolean.view.".concat(undefined !== propValue && propValue !== null ? propValue.toString() : 'undefined')) : React.createElement(FormControlLabel, _extends({
    className: classes.spacer,
    label: usableLabel,
    labelPlacement: "start",
    style: !!field.style.field ? field.style.field : {},
    onChange: onChange,
    control: React.createElement(Checkbox, {
      value: property,
      color: "primary",
      checked: values[property],
      onChange: onChange,
      inputProps: {
        'aria-label': usableLabel
      },
      disabled: !!field.disabled || !!view
    })
  }, field.props));
};

var fieldTypeByName = function fieldTypeByName(fieldType) {
  var fieldIsProtected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var inputDataVisible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var fieldTypeName = '';

  if (fieldIsProtected) {
    if (inputDataVisible) {
      return 'text';
    } else {
      return 'password';
    }
  }

  switch (fieldType) {
    case FieldTypes.Time:
      {
        fieldTypeName = 'time';
        break;
      }

    case FieldTypes.Date:
      {
        fieldTypeName = 'date';
        break;
      }

    case FieldTypes.Datetime:
      {
        fieldTypeName = 'datetime-local';
        break;
      }

    case FieldTypes.Integer:
    case FieldTypes.Float:
      {
        fieldTypeName = 'number';
        break;
      }

    case FieldTypes.String:
    default:
      {
        fieldTypeName = 'text';
        break;
      }
  }

  return fieldTypeName;
};

var TextStyleByType = function TextStyleByType(_ref9) {
  var text = _ref9.text,
      i18n = _ref9.i18n;
  if (validateEmail(text)) return React.createElement(EmailInfo, {
    text: text,
    i18n: i18n
  });
  if (validateWebsite(text)) return React.createElement(WebSiteInfo, {
    text: text,
    i18n: i18n
  });
  if (typeof text.toDate === 'function') return "".concat(text.toDate().toLocaleDateString());
  return "".concat(text);
};

/**
 * Custom hook for finding a list of data from an object array-prop
 *
 * @param {ModelBase} objectWithProps An object as source of data and string-uids
 * @param {string} property Property in question, the name
 * @param {FieldType} Type The type in question (complex should be)
 * @param {object} firebase With connection to a service
 *
 * @return {array} with a, array-list and a setList function
 */

var useListOfData = function useListOfData(objectWithProps, property, Type, firebase) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1],
      currentValues = objectWithProps[property],
      objectPropIsArray = currentValues instanceof Array; //TODO: URGENT review functionality


  useEffect(function () {
    if (!list || !list.length || objectPropIsArray && list.length !== currentValues.length) {
      //And is there a service behind?
      if (objectPropIsArray && objectWithProps[property].length > 0 && typeShouldUseService(Type)) {
        getServiceList(property, Type, objectWithProps, firebase).then(function (result) {
          setList(result);
        });
      } else {
        //No service at all, sets raw data
        setList(objectWithProps[property]);
      }
    }
  }, [currentValues]); // }, [list, objectWithProps, property, Type]);

  return [list, setList];
};

/**
 * Provides a boolean whether to use mobile icon-buttons, given current window size
 * @returns {Boolean} true, icons might be rendered; false, may use texts
 */

function useMobileIconButtons() {
  var theme = useTheme(),
      matches = useMediaQuery(theme.breakpoints.down('md'));
  return matches;
}

/**
 * Provides access to the current window size object
 * @returns {{ width: number, height: number }} object with window size props
 */

function useWindowSize() {
  var isClient = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  var _useState = useState(getSize),
      _useState2 = _slicedToArray(_useState, 2),
      windowSize = _useState2[0],
      setWindowSize = _useState2[1];

  useEffect(function () {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

/**
 * A pattern-follower **add-button**
 *
 * @param {object} param0
 * @param {string} param0.baseRoute
 * @param {function} param0.i18n
 * @param {function} param0.onClick
 */

var AddButton = function AddButton(_ref) {
  var i18n = _ref.i18n,
      _ref$baseRoute = _ref.baseRoute,
      baseRoute = _ref$baseRoute === void 0 ? null : _ref$baseRoute,
      _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? null : _ref$onClick,
      other = _objectWithoutProperties(_ref, ["i18n", "baseRoute", "onClick"]);

  var history = useHistory(),
      useIcon = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.add');
  }, [i18n]);
  return React.createElement(Tooltip, {
    title: i18n('button.add.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "contained",
    color: "primary",
    onClick: function onClick(e) {
      !!_onClick && typeof _onClick === 'function' ? _onClick(e) : history.push("".concat(baseRoute, "/form/"));
    },
    "aria-label": buttonText
  }, other), useIcon ? React.createElement(AddRounded, null) : buttonText));
};

AddButton.propTypes = {
  baseRoute: PropTypes.string,
  i18n: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

/**
 * A pattern-follower **cancel-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {string} param0.color
 * @param {function} param0.i18n
 */

var CancelButton = function CancelButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'secondary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n", "color"]);

  var history = useHistory(),
      useIcons = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.cancel');
  }, [i18n]);
  return React.createElement(Tooltip, {
    title: i18n('button.cancel.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "outlined",
    color: color,
    "aria-label": buttonText,
    children: useIcons ? React.createElement(CancelRounded, null) : buttonText,
    onClick: onClick || function () {
      return history.goBack();
    }
  }, other)));
};

CancelButton.propTypes = {
  onClick: PropTypes.func,
  i18n: PropTypes.func.isRequired,
  color: PropTypes.string
};

/**
 * A pattern-follower **cancel-and-return-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {string} param0.color
 * @param {function} param0.i18n
 */

var CancelReturnButton = function CancelReturnButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'secondary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n", "color"]);

  var history = useHistory(),
      useIcons = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.cancel.return');
  }, [i18n]),
      handleClick = function handleClick(e) {
    return !!onClick && typeof onClick === 'function' ? onClick(e) : history.goBack();
  };

  return React.createElement(Tooltip, {
    title: i18n('button.cancel.return.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "outlined",
    color: color,
    "aria-label": buttonText,
    children: useIcons ? React.createElement(KeyboardReturnRounded, null) : buttonText,
    onClick: handleClick
  }, other)));
};

CancelReturnButton.propTypes = {
  onClick: PropTypes.func,
  i18n: PropTypes.func.isRequired,
  color: PropTypes.string
};

var useStyles$2 = makeStyles(function (theme) {
  return {
    root: {
      marginLeft: 5,
      color: 'rgba(255,255,255,1) !important',
      backgroundColor: 'rgba(216, 0, 0, 1) !important',
      '&:hover': {
        backgroundColor: 'rgba(195, 0, 0, 0.85) !important'
      }
    }
  };
});
/**
 * A pattern-follower **delete-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */

var DeleteButton = function DeleteButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n"]);

  var classes = useStyles$2(),
      useIcons = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.delete');
  }, [i18n]);
  return React.createElement(Tooltip, {
    title: i18n('button.delete.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "contained",
    className: classes.root,
    onClick: onClick,
    "aria-label": buttonText
  }, other), useIcons ? React.createElement(DeleteIcon, null) : buttonText));
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  i18n: PropTypes.func.isRequired
};

/**
 * A pattern-follower **edit-button**
 *
 * @param {object} param0
 * @param {string} param0.baseRoute
 * @param {string} param0.id
 * @param {function} param0.i18n
 * @param {string} param0.color
 */

var EditButton = function EditButton(_ref) {
  var baseRoute = _ref.baseRoute,
      id = _ref.id,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["baseRoute", "id", "i18n", "color"]);

  var history = useHistory(),
      useIcons = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.edit');
  }, [i18n]);
  return React.createElement(Tooltip, {
    title: i18n('button.edit.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "contained",
    color: color,
    onClick: function onClick() {
      history.push("".concat(baseRoute, "/form/").concat(id));
    },
    "aria-label": buttonText
  }, other), useIcons ? React.createElement(EditRounded, null) : buttonText));
};

EditButton.propTypes = {
  baseRoute: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
  id: PropTypes.string,
  i18n: PropTypes.func.isRequired
};

/**
 * A pattern-follower **save-button**. Required handler (onClick)
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 * @param {string} param0.color
 */

var SaveButton = function SaveButton(_ref) {
  var onClick = _ref.onClick,
      i18n = _ref.i18n,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? 'primary' : _ref$color,
      other = _objectWithoutProperties(_ref, ["onClick", "i18n", "color"]);

  var useIcons = useMobileIconButtons(),
      buttonText = useMemo(function () {
    return i18n('button.save');
  }, [i18n]);
  return React.createElement(Tooltip, {
    title: i18n('button.save.tooltip'),
    arrow: true
  }, React.createElement(Button, _extends({
    variant: "contained",
    color: color,
    children: useIcons ? React.createElement(SaveRounded, null) : buttonText,
    onClick: onClick,
    "aria-label": buttonText
  }, other)));
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

var useStyles$3 = makeStyles(function (theme) {
  return {
    root: {
      marginBottom: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    },
    spacer: {
      flex: 1
    }
  };
});
/**
 * Will render a default Dynamic title (h4 or any specified);
 * Based on MUI Typography;
 *
 * @param {object} param0 Params
 * @param {string} param0.title The title to be rendered itself
 * @param {React.ReactElement|React.ReactNode} param0.children The collection of children to be rendered
 * @param {Array<React.ReactElement>} param0.button The button collection to be rendered
 * @param {string} param0.variant The title Typography variant
 */

var TitleAndButtons = function TitleAndButtons(_ref) {
  var title = _ref.title,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? false : _ref$children,
      _ref$buttons = _ref.buttons,
      buttons = _ref$buttons === void 0 ? [] : _ref$buttons,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'h4' : _ref$variant;
  var classes = useStyles$3();
  return React.createElement(Typography, {
    variant: variant,
    className: classes.root
  }, !!title && title !== '' && title, !!children && children, !!buttons && buttons.length > 0 && React.createElement(React.Fragment, null, React.createElement("div", {
    className: classes.spacer
  }), buttons.map(function (button, index) {
    return React.cloneElement(button, {
      key: index
    });
  })));
};

TitleAndButtons.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  buttons: PropTypes.arrayOf(PropTypes.element)
};

/**
 * Renders an empty spacer sibling-field
 *
 * @param {object} param0 Object applicable props
 */

var SpacerSiblingField = function SpacerSiblingField(props) {
  return React.createElement("div", _extends({
    className: "sibling-field",
    style: {
      flexBasis: '100%'
    }
  }, props));
};

var validateTimeout;
/**
 * @param {property} model the model reference
 * @param {property} property the current property name
 * @param {object} Type the field type for usage on construction
 * @param {array} values values set for the field for rendering
 * @param {function} i18n Translation base function. Has to receive an ID
 * @param {function} handleChg Firebase instance for service purposes
 */

var createShapedAsComponent = function createShapedAsComponent(model, property, Type, values, i18n, handleChg) {
  var newModel = {};
  Object.keys(Type).forEach(function (key, index) {
    if (key == '$fieldConfig') return;
    newModel[key] = '';
  });

  if (!Object.keys(values).length) {
    handleChg(property, Object.assign({}, newModel));
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
      handleChg(property, v);
    }
  });
  return React.createElement("div", {
    className: " mb-15"
  }, React.createElement(Typography, {
    variant: "h5",
    style: {
      marginBottom: '10px'
    }
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
  } //Using the external data grabber hook


  var _useListOfData = useListOfData(values, property, Type, firebase),
      _useListOfData2 = _slicedToArray(_useListOfData, 2),
      list = _useListOfData2[0],
      setList = _useListOfData2[1],
      _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1],
      _useState5 = useState(defaultCurrentDialogValue),
      _useState6 = _slicedToArray(_useState5, 2),
      currentDialogValue = _useState6[0],
      setCurrentDialogValue = _useState6[1];

  var save = function save() {
    var newList; //setting the list itself

    newList = mergeSets(values[property], currentDialogValue, defaultCurrentDialogValue); //resets the dialog

    setCurrentDialogValue(defaultCurrentDialogValue);
    setOpen(false);
    handleChange(property, newList);
  };

  var remove = function remove(itemRemoving, index) {
    return function () {
      var newList = removeFromSet(values[property], itemRemoving, index);
      setCurrentDialogValue(defaultCurrentDialogValue);
      setOpen(false);
      handleChange(property, newList);
    };
  };

  if (isIdOfModelBase) {
    //Allows overflowing
    shouldOverflowListItems = true; // console.log('isIdOfModelBase', isIdOfModelBase);

    inputs = createIdOfComponent(model, property, values, Type, firebase, i18n, function (p, uid, item) {
      setCurrentDialogValue(item);
    }, currentDialogValue);
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
            }, currentDialogValue, false, false);
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
        inputs = React.createElement(FormInput, {
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            return setCurrentDialogValue(e.target.value);
          }
        });
        break;

      case FieldTypes.Date:
        inputs = React.createElement(FormInput, {
          type: "date",
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            return setCurrentDialogValue(e.target.valueAsDate);
          }
        });
        break;

      case FieldTypes.Datetime:
        inputs = React.createElement(FormInput, {
          type: "datetime",
          label: i18nPropertyLabel,
          onChange: function onChange(e) {
            return setCurrentDialogValue(e.target.valueAsDate);
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
  }, i18nPropertyLabel, " ", !!list && "(".concat(list.length, ")")), React.createElement(ErrorLabel, null, errorMessage)), React.createElement(ExpansionPanelActions, {
    style: {
      padding: '0 25px'
    }
  }, React.createElement(AddButton, {
    onClick: function onClick() {
      return setOpen(true);
    },
    i18n: i18n
  })), React.createElement(ExpansionPanelDetails, null, React.createElement(Dialog$1, {
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
      overflow: shouldOverflowListItems ? 'visible' : '',
      paddingTop: 0
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
  }, !!list && list.length > 0 && React.createElement(List, null, list.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: model.$fieldConfig[property].listItemProperties,
      key: i,
      remove: remove(item, i)
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
    })); //should add a break after the field

    if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
      fields.push(React.createElement(SpacerSiblingField, {
        key: i
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
 * @param {function} param0.handleCancel cancelling function to be invoked
 * @param {string} param0.id register/item ID
 * @param {object} param0.firebase firebase API instance
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 *
 */


var DynamicForm = function DynamicForm(_ref3) {
  var model = _ref3.model,
      handleSave = _ref3.handleSave,
      handleCancel = _ref3.handleCancel,
      id = _ref3.id,
      firebase = _ref3.firebase,
      i18n = _ref3.i18n;
  var oService = null;

  var _useState7 = useState(model),
      _useState8 = _slicedToArray(_useState7, 2),
      values = _useState8[0],
      setValues = _useState8[1],
      _useState9 = useState({}),
      _useState10 = _slicedToArray(_useState9, 2),
      errors = _useState10[0],
      setErrors = _useState10[1]; //No dynamic form model service available


  if (!model || typeof model.getService !== 'function') {
    console.warn('dynamic-form-model.getService()-function-not-available');
  } else {
    //Creates service instance
    oService = model.getService(firebase);
  }

  useEffect(function () {
    if (id && (!model.uid || model.uid !== id) && oService) {
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
      setErrors(_objectSpread2({}, errors, _defineProperty({}, prop, validateResult)));
    }, 100);
  }, [errors, model]);
  /**
   * saves model at the server, after validation
   */

  var save = useCallback(function () {
    model.$fill(values);
    var validation = model.$validate(); //Debugging
    //TODO: remove from here anyways

    if (process.env.NODE_ENV === 'development') console.log("validation", validation);
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
  }, React.createElement(TitleAndButtons, {
    title: i18n("".concat(model.getModelName(), ".form.$title"))
  }), React.createElement(FieldGroup, null, fields), React.createElement("div", null, React.createElement(BottomButtons, {
    buttons: [React.createElement(SaveButton, {
      onClick: save,
      i18n: i18n
    }), React.createElement(CancelReturnButton, {
      onClick: handleCancel,
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

var EmptyList = function EmptyList(_ref) {
  var i18n = _ref.i18n;
  var classes = listEmptyStyles();
  return React.createElement("div", {
    className: classes.root
  }, React.createElement(Typography, {
    variant: "h5",
    component: "p"
  }, i18n('list.empty.text')), React.createElement(InfoIcon, null));
};

EmptyList.propTypes = {
  i18n: PropTypes.func.isRequired
};

var ListTotaliser = function ListTotaliser(_ref) {
  var i18n = _ref.i18n,
      _ref$length = _ref.length,
      length = _ref$length === void 0 ? 0 : _ref$length;
  var classes = listResultText();
  return length > 0 && React.createElement(Chip, {
    component: "div",
    variant: "outlined",
    className: classes.root,
    label: "".concat(i18n('list.result.showing'), " ").concat(length, " ").concat(i18n('list.result.results'))
  });
};

ListTotaliser.propTypes = {
  i18n: PropTypes.func.isRequired,
  length: PropTypes.number
};

/**
 * Creates the array of inputs for filtering data
 *
 * @param {object} param0
 * @param {object} param0.model
 * @param {function} param0.i18n
 * @param {function} param0.updateFilters
 */


var SingleFilter = function SingleFilter(_ref) {
  var model = _ref.model,
      i18n = _ref.i18n,
      updateFilters = _ref.updateFilters;

  var classes = filterTextField(),
      _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      filterText = _useState6[0],
      setFilterText = _useState6[1],
      disabled = !filterText || filterText.trim() === '',
      handleChange = useCallback(function (value) {
    var provableText = value; //This is just in case the text is being cleared

    if (typeof provableText === 'string' && provableText.trim() === '') {
      applyFilter(provableText);
    } //If data is not a known format, removes special chars


    if (!textIsKnownType(provableText)) {
      //Will clear for any special character
      //As well as lower case the text
      provableText = removeSpecialChars(provableText).toLowerCase();
    }

    return setFilterText(provableText);
  }, []),
      applyFilter = useCallback(
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(value) {
      var mainFilter, currentIndex;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              mainFilter = []; //Value was informed

              if (!!value && typeof value === 'string' && value.trim() !== '') {
                currentIndex = "$$index.".concat(value);
                mainFilter.push([currentIndex, '==', true]);
              } //Adding deleted flag filter


              mainFilter.push(['deleted', '==', false]); //Invalid type of updater?

              if (!(typeof updateFilters !== 'function')) {
                _context.next = 5;
                break;
              }

              throw Error('dynamic-list-SingleFilter-requires-updateFilters(array)-function');

            case 5:
              return _context.abrupt("return", updateFilters([mainFilter]));

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), []),
      handleSearch = useCallback(function (e) {
    var indexableText = filterText; //If available, stops propagation of event

    if (!!e && typeof e.stopPropagation === 'function') e.stopPropagation(); //Avoids triggering a query when the command should be disabled

    if (disabled) return false; //Will clear for any special character
    //As well as lower case the text

    indexableText = removeSpecialChars(indexableText, true).toLowerCase();
    return applyFilter(indexableText);
  }, [filterText, applyFilter]),
      handleEnterPress = useEnterPress(handleSearch);

  return React.createElement(FormInput, {
    className: classes.textField,
    label: i18n("list.filter.$label"),
    value: filterText,
    onChange: function onChange(e) {
      return handleChange(e.target.value);
    },
    onKeyPressCapture: handleEnterPress,
    InputProps: {
      endAdornment: React.createElement(InputAdornment, {
        position: "end"
      }, React.createElement(IconButton, {
        disabled: disabled,
        edge: "end",
        onClick: handleSearch
      }, React.createElement(SearchIcon, null)))
    }
  });
};

var searchTimeout;

var search = function search(oService, filters) {
  //removes previous versions of timeout
  clearTimeout(searchTimeout);
  if (!oService.filter || typeof oService.filter !== 'function') throw Error('dynamic-list-search-needs-filter()-method-implemented-at-service');

  if (filters && filters.length > 0) {
    //will filter, then
    oService.filter(filters);
  }

  searchTimeout = setTimeout(function () {
    if (!oService.list || typeof oService.list !== 'function') throw Error('dynamic-list-service-has-to-have-list()-method');
    if (!filters || filters.length === 0) oService.list();
  }, 300);
};

var oService;

var DynamicList = function DynamicList(_ref3) {
  var reduxList = _ref3.reduxList,
      model = _ref3.model,
      configuration = _ref3.configuration,
      baseRoute = _ref3.baseRoute,
      i18n = _ref3.i18n,
      firebase = _ref3.firebase,
      store = _ref3.store,
      serviceInstance = _ref3.serviceInstance;
  var history = useHistory(); //Checkers of service

  if (!oService && !serviceInstance && !!store && !!firebase) {
    oService = model.getService(firebase, store);
  } else if (!!serviceInstance) {
    oService = serviceInstance;
  } else {
    throw Error('dynamic-list-service-requires-an-available-serviceInstance-or-store-and-firebase');
  }

  useEffect(function () {
    //direct service instance, when not yet instanced
    // if (!!serviceInstance && !oService) oService = serviceInstance;
    //No items yet searched
    //if (!reduxList) {
    search(oService, []); //}
  }, [oService, serviceInstance]);
  return React.createElement("div", null, React.createElement(TitleAndButtons, {
    title: i18n("".concat(model.getModelName(), ".list.$title")),
    buttons: [React.createElement(AddButton, {
      baseRoute: baseRoute,
      i18n: i18n
    })]
  }), React.createElement(Card, {
    className: "mb-15"
  }, React.createElement(CardContent, null, React.createElement(FieldGroup, null, React.createElement(SingleFilter, {
    model: model,
    i18n: i18n,
    updateFilters: function updateFilters(filters) {
      return search(oService, filters);
    }
  })))), React.createElement(Card, {
    className: "mb-15"
  }, React.createElement(CardContent, null, !!reduxList && React.createElement(ListTotaliser, {
    i18n: i18n,
    length: reduxList.length
  }), !!reduxList && reduxList.length > 0 && React.createElement(List, null, reduxList.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: configuration.listItemProperties,
      key: i,
      onClick: function onClick() {
        history.push("".concat(baseRoute, "/view/").concat(item.uid));
      }
    });
  })), !reduxList || reduxList.length === 0 && React.createElement(EmptyList, {
    i18n: i18n
  }))));
};

DynamicList.propTypes = {
  reduxList: PropTypes.array,
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
    }, "NEED_TO_CONFIGURE_FIELD: ", property, " | FieldType:IdOf", "<".concat(!!Type ? Type.name : 'undefined', ">"), React.createElement("p", null, "MODEL: ", JSON.stringify(model)));
  } // if (process.env.NODE_ENV === 'development') {
  // 	console.log('===========================');
  // 	console.log('==> createIdOfComponent:model', model);
  // 	console.log('==> createIdOfComponent:property', property);
  // 	console.log('==> createIdOfComponent:Type', Type);
  // 	console.log('==> createIdOfComponent:values[property]', values[property]);
  // }


  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  if (!selected && undefined !== values[property] && values[property] !== '') {
    var oService = new Type().getService(firebase);
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
  }), !selected && React.createElement(EmptyRelation, {
    i18n: i18n
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
 * @param {object} firebase Firebase source object
 */


var createShapedAsComponent$1 = function createShapedAsComponent(model, property, Type, values, i18n, firebase) {
  var fields = createFields$1({
    // model: model.hasOwnProperty(property) ? model[property] : new Type(model[property]),
    model: new Type(model[property]),
    baseIntl: "".concat(model.getModelName(), ".form.").concat(property),
    values: values,
    i18n: i18n,
    firebase: firebase
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


var createArrayOfComponent$1 = function createArrayOfComponent(model, property, values, Type, i18n, firebase) {
  //will use a hook which maps the list of data
  var _useListOfData = useListOfData(values, property, Type, firebase),
      _useListOfData2 = _slicedToArray(_useListOfData, 1),
      list = _useListOfData2[0];

  return React.createElement("div", {
    className: "break-field mb-15",
    key: property
  }, React.createElement(ExpansionPanel, {
    defaultExpanded: true
  }, React.createElement(ExpansionPanelSummary, {
    expandIcon: React.createElement(ExpandMoreIcon, null)
  }, React.createElement(Typography, {
    variant: "h5"
  }, i18n("".concat(model.getModelName(), ".form.").concat(property)), ' ', !!list && "(".concat(list.length, ")"))), React.createElement(ExpansionPanelDetails, null, React.createElement("div", {
    style: {
      flex: 1
    }
  }, !!list && list.length > 0 && React.createElement(List, null, list.map(function (item, i) {
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
  Object.keys(model.$fieldConfig).forEach(function (property, i) {
    fields.push(createField$1({
      property: property,
      model: model,
      label: "".concat(baseIntl, ".").concat(property),
      values: values,
      i18n: i18n,
      firebase: firebase
    }));

    if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
      fields.push(React.createElement(SpacerSiblingField, {
        key: i
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

        if (!model[property]) {
          model[property] = '';
        }

        component = React.createElement(Card, {
          className: "mb-15",
          style: {
            overflow: 'visible'
          }
        }, React.createElement(CardContent, null, createIdOfComponent$1(model, property, values, field.type.Type, i18n, firebase)));
        break;

      case ComplexTypes.ArrayOf:
        breakField = true;
        component = createArrayOfComponent$1(model, property, values, field.type.Type, i18n, firebase);
        break;

      case ComplexTypes.ShapedAs:
        breakField = true;

        if (!model[property]) {
          model[property] = new field.type.Type();
        }

        component = React.createElement(Card, {
          className: "mb-15"
        }, React.createElement(CardContent, null, createShapedAsComponent$1(model, property, field.type.Type, //new field.type.Type(),
        values[property], i18n, firebase)));
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
    className: breakField ? 'break-field' : 'sibling-field',
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

  var _useState3 = useState(model),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1],
      history = useHistory(),
      deleteConfirmationDialogRef = React.createRef(),
      oService = !!serviceInstance ? serviceInstance : model.getService(firebase),
      fillData = function fillData(data) {
    model.$fill(data);
    setValues(data);
    return data;
  };

  useEffect(function () {
    // if (!!id && !serviceRunning && (!model.uid || model.uid !== id)) {
    if (!!id || model.uid !== id) {
      if (typeof oService.get !== 'function') {
        throw Error('dynamic-list-service-requires-a-get(id)-method');
      } //runs the service


      oService.get(id).then(fillData).catch(function (e) {
        if (process.env.NODE_ENV === 'development') console.error(e);else throw e;
      });
    }
  }, [id]); // //cleanup useEffect
  // useEffect(() => {
  // 	if (process.env.NODE_ENV === 'development') console.log('useEffect:unmount');
  // }, []);

  var remove = useCallback(function () {
    oService.patch(values.uid, {
      deleted: true
    });
    deleteConfirmationDialogRef.current.close(); //redirect

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
    buttons: [React.createElement(EditButton, {
      baseRoute: baseRoute,
      id: values.uid,
      i18n: i18n
    }), React.createElement(DeleteButton, {
      onClick: function onClick() {
        deleteConfirmationDialogRef.current.open();
      },
      i18n: i18n
    })]
  }), React.createElement(DeleteConfirmationDialog, {
    ref: deleteConfirmationDialogRef,
    title: i18n('dynamic.form.deleteConfirmation'),
    onConfirm: function onConfirm() {
      return remove();
    },
    i18n: i18n
  }), React.createElement(FieldGroup, {
    marginTop: true
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

export { AddButton, BottomButtons, CancelButton, CancelReturnButton, DeleteButton, DeleteConfirmationDialog, DynamicForm, DynamicList, DynamicView, EditButton, SaveButton, TitleAndButtons, removeSpecialChars, textIsKnownType, useEnterPress, useMobileIconButtons, useWindowSize, validateEmail, validateWebsite, validations };
//# sourceMappingURL=index.js.map
