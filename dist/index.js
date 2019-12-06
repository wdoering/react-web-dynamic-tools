import React, { useState, useEffect, Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, ListItem, ListItemSecondaryAction, TextField, InputAdornment, Paper, List, Card, CardContent, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelActions, ExpansionPanelDetails, Dialog, DialogTitle, DialogContent, DialogActions, FormLabel } from '@material-ui/core';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FieldType, ComplexTypes, FieldTypes, ModelBase } from 'object-model-js';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Dialog$1 from '@material-ui/core/Dialog';
import DialogActions$1 from '@material-ui/core/DialogActions';
import DialogContent$1 from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle$1 from '@material-ui/core/DialogTitle';
import Button$1 from '@material-ui/core/Button';

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

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
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

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/**
 * Language Provider Helper Component
 * Used to Display Localised Strings
 */

var InjectMassage = function InjectMassage(props) {
  return React.createElement(FormattedMessage, props);
};

var IntlMessages = injectIntl(InjectMassage, {
  withRef: false
});

/**
 * A pattern-follower **cancel-button**
 */

var CancelButton = function CancelButton(_ref) {
  var onClick = _ref.onClick;
  var history = useHistory();
  return React.createElement(Button, {
    variant: "outlined",
    color: "secondary",
    children: React.createElement(IntlMessages, {
      id: "button.cancel"
    }),
    onClick: onClick || function () {
      return history.goBack();
    } //TODO: Architecture - Components/form/CancelButton - Insert confirmation message
    // onClick={() => (confirm(<IntlMessages id="button.cancel" />) ? history.goBack() : null)}

  });
};

/**
 * A pattern-follower save-button. Required handler (onClick)
 *
 * @property {func} onClick
 */

var SaveButton = function SaveButton(_ref) {
  var onClick = _ref.onClick;
  return React.createElement(Button, {
    variant: "contained",
    color: "primary" // type="submit"
    ,
    children: React.createElement(IntlMessages, {
      id: "button.save"
    }),
    onClick: onClick
  });
};

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

var useStyles = makeStyles(function (theme) {
  return {
    root: {
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

/**
 * TODO: comment/describe
 */

var Dateinfo = injectIntl(function (_ref) {
  var item = _ref.item,
      intl = _ref.intl;
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
  }, intl.formatDate(item)));
});
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
    fields.push(React.createElement(Dateinfo, {
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
 * @param {function} handleChange
 */

var createIdOfComponent = function createIdOfComponent(model, property, values, Type, firebase, handleChange) {
  var config = model.$fieldConfig[property];
  if (!config.searchField || !config.searchListItemProperties || !config.listItemProperties) return React.createElement("div", null, "NEED_TO_CONFIGURE_FIELD:", property, " | FieldType:IdOf", "<".concat(Type.name, ">"));
  var oService = new Type().getService(firebase);

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      list = _useState2[0],
      setList = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      selected = _useState4[0],
      setSelected = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray(_useState5, 2),
      value = _useState6[0],
      setValue = _useState6[1];

  if (!selected && values[property] && !(values[property] instanceof Array)) {
    clearTimeout(searchIdOfTimeout);
    searchIdOfTimeout = setTimeout(function () {
      oService.get(values[property]).then(function (r) {
        setSelected(r);
      });
    }, 200);
  }

  var select = function select(item) {
    return function () {
      setSelected(item);
      setList([]);
      setValue('');
      handleChange(property, item.uid, item);
    };
  };

  return React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, React.createElement(Typography, {
    variant: "h5"
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  })), React.createElement("div", {
    style: {
      flex: 1
    },
    className: "mt-10"
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
        oService.filter([[[config.searchField, '>=', text], [config.searchField, '<', tend], ['deleted', '==', false]]]);
        console.log([[[config.searchField, '>=', text], [config.searchField, '<', tend], ['deleted', '==', false]]]);
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
      height: 150,
      overflow: 'scroll'
    }
  }, list.map(function (item, i) {
    return createConfiguredListItem({
      item: item,
      listItemProperties: config.searchListItemProperties,
      key: i,
      onClick: select(item)
    });
  }))), React.createElement("div", {
    className: "mt-10"
  }, !!selected && createConfiguredListItem({
    item: selected,
    listItemProperties: config.listItemProperties,
    key: 0
  })));
};

var validateTimeout;
/**
 *
 */

var createShapedAsComponent = function createShapedAsComponent(model, property, Type, values, _handleChange) {
  var newModel = {};
  Object.keys(Type).map(function (key) {
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
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  })), React.createElement("div", {
    style: {
      flex: 1
    }
  }, fields));
};
/**
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {FieldType|any} Type
 */


var createArrayOfComponent = function createArrayOfComponent(model, property, values, Type, firebase, handleChange) {
  var defaultCurrentDialogValue = {};

  if (!(Type instanceof FieldType) && _typeof(Type) !== 'object') {
    defaultCurrentDialogValue = '';
  }

  var _useState3 = useState(values[property] || []),
      _useState4 = _slicedToArray(_useState3, 2),
      list = _useState4[0],
      setList = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      open = _useState6[0],
      setOpen = _useState6[1];

  var _useState7 = useState(defaultCurrentDialogValue),
      _useState8 = _slicedToArray(_useState7, 2),
      currentDialogValue = _useState8[0],
      setCurrentDialogValue = _useState8[1];

  if (!list.length && values[property] && values[property].length) {
    setList(values[property]);
  }

  var save = function save() {
    if (_typeof(defaultCurrentDialogValue) === 'object') {
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
      setCurrentDialogValue({});
      setList(list);
      setOpen(false);
      handleChange(property, list);
    };
  };

  var inputs;
  var isIdOfModelBase = typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;

  if (Type instanceof FieldType) {
    switch (Type.complexType) {
      case ComplexTypes.ShapedAs:
        inputs = createShapedAsComponent(model, property, new Type.Type(), currentDialogValue, function (p, fullObject) {
          setCurrentDialogValue(fullObject);
        });
        break;
    }
  } else if (isIdOfModelBase) {
    inputs = createIdOfComponent(model, property, values, Type, firebase, function (p, uid, item) {
      setCurrentDialogValue(item);
    });
  } else if (typeof Type === 'string') {
    switch (Type) {
      case FieldTypes.String:
        inputs = React.createElement(TextField, {
          label: React.createElement(IntlMessages, {
            id: "".concat(model.getModelName(), ".form.").concat(property)
          }),
          onChange: function onChange(e) {
            setCurrentDialogValue(e.target.value);
          }
        });
        break;

      case FieldTypes.Date:
        inputs = React.createElement(TextField, {
          type: "date",
          label: React.createElement(IntlMessages, {
            id: "".concat(model.getModelName(), ".form.").concat(property)
          }),
          onChange: function onChange(e) {
            setCurrentDialogValue(e.target.valueAsDate);
          }
        });
        break;

      case FieldTypes.Datetime:
        inputs = React.createElement(TextField, {
          type: "datetime",
          label: React.createElement(IntlMessages, {
            id: "".concat(model.getModelName(), ".form.").concat(property)
          }),
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
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  }), " (", list.length, ")")), React.createElement(ExpansionPanelActions, {
    style: {
      padding: '0 25px'
    }
  }, React.createElement(Button, {
    variant: 'contained',
    onClick: function onClick() {
      return setOpen(true);
    },
    color: 'primary'
  }, React.createElement(IntlMessages, {
    id: "button.add"
  }))), React.createElement(ExpansionPanelDetails, null, React.createElement(Dialog, {
    open: open,
    onClose: function onClose() {
      return setOpen(false);
    },
    "aria-labelledby": "alert-dialog-title",
    "aria-describedby": "alert-dialog-description",
    style: {
      root: {
        overflow: isIdOfModelBase ? 'visible' : ''
      }
    }
  }, React.createElement(DialogTitle, null, "Use Google's location service?"), React.createElement(DialogContent, {
    style: {
      height: isIdOfModelBase ? 300 : '',
      overflow: isIdOfModelBase ? 'visible' : ''
    }
  }, inputs), React.createElement(DialogActions, null, React.createElement(SaveButton, {
    onClick: save,
    color: "primary"
  }), React.createElement(CancelButton, {
    onClick: function onClick() {
      return setOpen(false);
    },
    color: "primary",
    autoFocus: true
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
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createFields = function createFields(_ref) {
  var model = _ref.model,
      baseIntl = _ref.baseIntl,
      errors = _ref.errors,
      values = _ref.values,
      firebase = _ref.firebase,
      handleChange = _ref.handleChange;
  var fields = [];
  Object.keys(model.$fieldConfig).map(function (property, i) {
    fields.push(createField({
      property: property,
      model: model,
      label: "".concat(baseIntl, ".").concat(property),
      errors: errors,
      values: values,
      firebase: firebase,
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
  return fields;
};
/**
 * Creates a field based on the parameters passed and the field Type configuration
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.property Property from the model, destined to this field
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.errors Variable containing the error list
 * @param {object} param0.firebase Firebase instance for service purposes
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createField = function createField(_ref2) {
  var model = _ref2.model,
      property = _ref2.property,
      label = _ref2.label,
      values = _ref2.values,
      errors = _ref2.errors,
      firebase = _ref2.firebase,
      handleChange = _ref2.handleChange;
  var field = model.$fieldConfig[property];

  if (!field.style) {
    field.style = {
      wrapper: {},
      field: {}
    };
  }

  var component;
  var error = '';

  if (errors[property]) {
    error = errors[property][0];
  }

  var breakField = false;
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
        }, React.createElement(CardContent, null, createIdOfComponent(model, property, values, field.type.Type, firebase, function (property, id) {
          handleChange(property, id);
        })));
        break;

      case ComplexTypes.ArrayOf:
        breakField = true;
        component = createArrayOfComponent(model, property, values, field.type.Type, firebase, function (property, fullArray) {
          handleChange(property, fullArray);
        });
        break;

      case ComplexTypes.ShapedAs:
        breakField = true;

        if (!model[property]) {
          model[property] = new field.type.Type();
        }

        component = React.createElement(Card, {
          className: "mb-15"
        }, React.createElement(CardContent, null, createShapedAsComponent(model, property, new field.type.Type(), values[property], function (property, fullObject) {
          delete fullObject.$fieldConfig;
          handleChange(property, fullObject);
        })));
        break;
    }
  } else {
    switch (field.type) {
      case FieldTypes.String:
        component = React.createElement(TextField, _extends({}, field.props, {
          style: field.style.field,
          label: React.createElement(IntlMessages, {
            id: label
          }),
          value: values[property],
          onChange: function onChange(e) {
            return handleChange(property, e.target.value);
          },
          helperText: error ? React.createElement(IntlMessages, {
            id: "form.error.".concat(error)
          }) : ' '
        }));
    }
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
 */


var DynamicForm = function DynamicForm(_ref3) {
  var model = _ref3.model,
      handleSave = _ref3.handleSave,
      id = _ref3.id,
      firebase = _ref3.firebase;

  var _useState9 = useState(model),
      _useState10 = _slicedToArray(_useState9, 2),
      values = _useState10[0],
      setValues = _useState10[1];

  var _useState11 = useState({}),
      _useState12 = _slicedToArray(_useState11, 2),
      errors = _useState12[0],
      setErrors = _useState12[1];

  useEffect(function () {
    if (id) {
      var oService = model.getService(firebase);
      oService.get(id).then(function (r) {
        model.$fill(r);
        setValues(r);
      });
    }
  }, []);
  /**
   * Update values[prop] state
   * @param {string} prop
   */

  var handleChange = function handleChange(prop, value) {
    var v = _objectSpread2({}, values, _defineProperty({}, prop, value));

    setValues(v);
    validate(prop, value);
  };
  /**
   * Validates a property of the model
   * @param {string} prop
   * @param {any} value
   */


  var validate = function validate(prop, value) {
    clearTimeout(validateTimeout);
    model[prop] = value;
    validateTimeout = setTimeout(function () {
      setErrors(_objectSpread2({}, errors, _defineProperty({}, prop, model.$fieldConfig[prop].validate())));
    }, 100);
  };
  /**
   * saves model at the server, after validation
   */


  var save = function save() {
    model.$fill(values);
    var validation = model.validate();
    setErrors(validation);

    if (!Object.keys(validation).length) {
      if (handleSave) {
        handleSave(values);
      } else {
        model.getService(firebase).save(values);
      }
    }
  };

  var fields = createFields({
    model: model,
    baseIntl: "".concat(model.getModelName(), ".form"),
    errors: errors,
    values: values,
    firebase: firebase,
    handleChange: handleChange
  });
  return React.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, React.createElement(Typography, {
    variant: "h4",
    className: "mb-15"
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.$title")
  })), React.createElement("div", {
    className: "field-group"
  }, fields), React.createElement("div", null, React.createElement(BottomButtons, {
    buttons: [React.createElement(SaveButton, {
      onClick: save
    }), React.createElement(CancelButton, null)]
  })));
};

DynamicForm.propTypes = {
  model: PropTypes.object.isRequired,
  handleSave: PropTypes.func,
  id: PropTypes.string,
  firebase: PropTypes.object.isRequired
};

var createArrayOfComponent$1 = function createArrayOfComponent(model, property, Type, handleChange) {
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
          label: React.createElement(IntlMessages, {
            id: "".concat(model.getModelName(), ".form.").concat(property)
          }),
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

var createFilters = function createFilters(model, updateFilters) {
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
          component = createArrayOfComponent$1(model, property, fieldConfig.type.Type, handleChange);
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
            label: React.createElement(IntlMessages, {
              id: label
            }),
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

  if (filters && filters.length) {
    oService.filter(filters);
  }

  searchTimeout = setTimeout(function () {
    oService.list();
  }, 300);
};

var oService;

var DynamicList = function DynamicList(_ref) {
  var reduxList = _ref.reduxList,
      model = _ref.model,
      configuration = _ref.configuration,
      baseRoute = _ref.baseRoute,
      firebase = _ref.firebase,
      store = _ref.store;
  var history = useHistory();
  useEffect(function () {
    oService = model.getService(firebase, store);
    search(oService, []);
  }, []);
  return React.createElement("div", null, React.createElement(Card, {
    className: "mb-15"
  }, React.createElement(CardContent, null, React.createElement("div", {
    className: "field-group"
  }, createFilters(model, function (f) {
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
  firebase: PropTypes.object.isRequired,
  store: PropTypes.any.isRequired
};

var DeleteConfirmationDialog =
/*#__PURE__*/
function (_Component) {
  _inherits(DeleteConfirmationDialog, _Component);

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
          onConfirm = _this$props.onConfirm;
      return React.createElement(Dialog$1, {
        open: this.state.open,
        onClose: function onClose() {
          return _this2.close();
        },
        "aria-labelledby": "alert-dialog-title",
        "aria-describedby": "alert-dialog-description"
      }, React.createElement(DialogTitle$1, {
        id: "alert-dialog-title"
      }, title), React.createElement(DialogContent$1, null, React.createElement(DialogContentText, {
        id: "alert-dialog-description"
      }, message)), React.createElement(DialogActions$1, null, React.createElement(Button$1, {
        onClick: function onClick() {
          return _this2.close();
        },
        className: "btn-danger text-white"
      }, React.createElement(IntlMessages, {
        id: "button.cancel"
      })), React.createElement(Button$1, {
        onClick: onConfirm,
        className: "btn-primary text-white",
        autoFocus: true
      }, React.createElement(IntlMessages, {
        id: "button.yes"
      }))));
    }
  }]);

  return DeleteConfirmationDialog;
}(Component);

var searchIdOfTimeout$1;
/**
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {object} values
 * @param {ModelBase} Type
 * @param {function} handleChange
 */

var createIdOfComponent$1 = function createIdOfComponent(model, property, values, Type, firebase) {
  var config = model.$fieldConfig[property];

  if (!config.listItemProperties) {
    return React.createElement("div", null, "NEED_TO_CONFIGURE_FIELD:", property, " | FieldType:IdOf", "<".concat(Type.name, ">"));
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
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  })), React.createElement("div", {
    className: "mt-10"
  }, !!selected && createConfiguredListItem({
    item: selected,
    listItemProperties: config.listItemProperties,
    key: 0
  })));
};
/**
 *
 */


var createShapedAsComponent$1 = function createShapedAsComponent(model, property, Type, values) {
  var fields = createFields$1({
    model: Type,
    baseIntl: "".concat(model.getModelName(), ".form.").concat(property),
    values: values
  });
  return React.createElement("div", {
    className: " mb-15"
  }, React.createElement(Typography, {
    variant: "h5"
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  })), React.createElement("div", {
    style: {
      flex: 1
    }
  }, fields));
};
/**
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {FieldType|any} Type
 */


var createArrayOfComponent$2 = function createArrayOfComponent(model, property, values, Type) {
  var _useState3 = useState(values[property] || []),
      _useState4 = _slicedToArray(_useState3, 2),
      list = _useState4[0],
      setList = _useState4[1];

  if (!list.length && values[property].length) {
    setList(values[property]);
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
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.").concat(property)
  }), " (", list.length, ")")), React.createElement(ExpansionPanelDetails, null, React.createElement("div", {
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
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.errors Variable containing the error list
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */


var createFields$1 = function createFields(_ref) {
  var model = _ref.model,
      baseIntl = _ref.baseIntl,
      values = _ref.values,
      firebase = _ref.firebase;
  var fields = [];
  Object.keys(model.$fieldConfig).map(function (property, i) {
    fields.push(createField$1({
      property: property,
      model: model,
      label: "".concat(baseIntl, ".").concat(property),
      values: values,
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
  return fields;
};
/**
 * Creates a field based on the parameters passed and the field Type configuration
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.property Property from the model, destined to this field
 * @param {object} param0.label Variable containing the label text
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.firebase Firebase instance for servicing purposes
 */


var createField$1 = function createField(_ref2) {
  var model = _ref2.model,
      property = _ref2.property,
      label = _ref2.label,
      values = _ref2.values,
      firebase = _ref2.firebase;
  var field = model.$fieldConfig[property];

  if (!field.style) {
    field.style = {
      wrapper: {},
      field: {}
    };
  }

  var component;
  var breakField = false;
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
        }, React.createElement(CardContent, null, createIdOfComponent$1(model, property, values, field.type.Type, firebase)));
        break;

      case ComplexTypes.ArrayOf:
        breakField = true;
        component = createArrayOfComponent$2(model, property, values, field.type.Type);
        break;

      case ComplexTypes.ShapedAs:
        breakField = true;

        if (!model[property]) {
          model[property] = new field.type.Type();
        }

        component = React.createElement(Card, {
          className: "mb-15"
        }, React.createElement(CardContent, null, createShapedAsComponent$1(model, property, new field.type.Type(), values[property])));
        break;
    }
  } else {
    switch (field.type) {
      case FieldTypes.String:
        component = React.createElement("div", null, React.createElement(FormLabel, null, React.createElement(IntlMessages, {
          id: label
        })), React.createElement("div", {
          style: _objectSpread2({
            fontSize: 18,
            fontWeight: '100'
          }, field.style.field)
        }, values[property]));
    }
  }

  return React.createElement("div", {
    key: property,
    className: "".concat(breakField ? 'break-field' : 'sibling-field', " mb-15"),
    style: field.style.wrapper
  }, component);
};
/**
 *
 * @param {object} param0
 */


var DynamicView = function DynamicView(_ref3) {
  var model = _ref3.model,
      id = _ref3.id,
      baseRoute = _ref3.baseRoute,
      firebase = _ref3.firebase;

  var _useState5 = useState(model),
      _useState6 = _slicedToArray(_useState5, 2),
      values = _useState6[0],
      setValues = _useState6[1];

  var history = useHistory();
  var deleteConfirmationDialogRef = React.createRef();
  var fields = createFields$1({
    model: model,
    baseIntl: "".concat(model.getModelName(), ".form"),
    values: values,
    firebase: firebase
  });
  useEffect(function () {
    if (id) {
      var oService = model.getService(firebase);
      oService.get(id).then(function (r) {
        model.$fill(r);
        setValues(r);
      });
    }
  }, []);

  var remove = function remove() {
    var oService = model.getService(firebase);
    oService.patch(values.uid, {
      deleted: true
    });
    deleteConfirmationDialogRef.current.close();
    history.push("".concat(baseRoute, "/list"));
  };

  return React.createElement("form", {
    noValidate: true,
    autoComplete: "off"
  }, React.createElement(Typography, {
    variant: "h4",
    className: "mb-15",
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center'
    }
  }, React.createElement(IntlMessages, {
    id: "".concat(model.getModelName(), ".form.$title")
  }), React.createElement("div", {
    style: {
      flex: 1
    }
  }), React.createElement(Button, {
    variant: "contained",
    color: "primary",
    className: "mr-5",
    onClick: function onClick() {
      history.push("".concat(baseRoute, "/form/").concat(values.uid));
    }
  }, React.createElement(IntlMessages, {
    id: "button.edit"
  })), React.createElement(Button, {
    variant: "contained",
    className: "mr-5 btn-danger text-white",
    onClick: function onClick() {
      deleteConfirmationDialogRef.current.open();
    }
  }, React.createElement(IntlMessages, {
    id: "button.delete"
  }))), React.createElement(DeleteConfirmationDialog, {
    ref: deleteConfirmationDialogRef,
    title: React.createElement(IntlMessages, {
      id: "dynamic.form.deleteConfirmation"
    }),
    onConfirm: function onConfirm() {
      return remove();
    }
  }), React.createElement("div", {
    className: "field-group"
  }, fields));
};

DynamicView.propTypes = {
  model: PropTypes.object.isRequired,
  id: PropTypes.string,
  baseRoute: PropTypes.string,
  firebase: PropTypes.object.isRequired
};

export { DynamicForm, DynamicList, DynamicView };
