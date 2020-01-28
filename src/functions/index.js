import 'date-fns';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
	FormControlLabel,
	Typography,
	List,
	ListItem,
	ListItemSecondaryAction,
	InputAdornment,
	Paper,
	Checkbox,
	FormLabel,
	Tooltip
} from '@material-ui/core';
import { ComplexTypes, FieldTypes, ModelBase, FieldType } from '@zerobytes/object-model-js';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffRounded';

import IconButton from '@material-ui/core/IconButton';
import { inArray } from '../util/query';
import { textFieldStyles, viewInfoStyles } from '../assets/_styles';
import { EmailInfo, WebSiteInfo } from '../components/view/text';
import { FormInput } from '../components/form';
import { validateEmail, validateWebsite } from '../util/validations';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const protectedFieldValue = '******',
	blankFieldPlaceholder = '-';

/**
 * TODO: comment/describe
 */
const DateDetail = ({ item, locale = 'pt-br' }) => {
	const dateString = item.toLocaleDateString(locale),
		timeString = item.toLocaleTimeString(locale);

	return (
		<div key={0} style={{ flexBasis: '100%' }}>
			<Typography
				style={{
					color: '#111',
					fontWeight: '700'
				}}
			>
				{dateString + (!timeString || ` ${timeString}`)}
			</Typography>
		</div>
	);
};

const mergeSets = (set0, setOrObject1, defaultValue = []) => {
	let merged = null;

	if (defaultValue instanceof Array && setOrObject1 instanceof Array) {
		merged = [...set0, ...setOrObject1];
	} else if (typeof defaultValue === 'object') {
		merged = [...set0, Object.assign({}, setOrObject1)];
	} else {
		merged = [...set0, setOrObject1];
	}

	return merged;
};

const removeFromSet = (set0, itemRemoving, indexRemoving) => {
	const itemIsObject = itemRemoving instanceof Object && !!itemRemoving.uid,
		newList = [
			...set0.filter((item, index) =>
				itemIsObject ? itemRemoving.uid !== item : index !== indexRemoving
			)
		];

	return newList;
};

/**
 * Checks whether a type should use a service
 *
 * @param {FieldType} Type The type being checked
 */
const typeShouldUseService = (Type) => {
	let should = false;

	//Type is a FieldType
	//And is specific shape
	//No service will exist behind
	if (
		!!Type &&
		!!Type.complexType &&
		Type instanceof FieldType &&
		Type.complexType !== ComplexTypes.ShapedAs
	) {
		should = true;
	}

	return should;
};

let typeInstance, typeService;

/**
 * Creates a type service based on a Type instance
 *
 * @param {FieldType} Type The type being used for instance & service
 * @param {object} firebase The base object for connections
 */
const getTypeService = (Type, firebase) => {
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
const getServiceList = (property, Type, objectWithProps, firebase) => {
	typeService = getTypeService(Type, firebase);

	if (!typeService) throw Error('getServiceList-requires-valid-typeService-instance');

	return typeService
		.filter(inArray('uid', objectWithProps[property]))
		.list()
		.then((result) => {
			//TODO: remove from here
			console.log('getServiceList:serviceList:result', result);

			return Promise.resolve(result);
		})
		.catch((e) => {
			throw e;
		});
};

/**
 * TODO: comment/describe
 *
 * @param {*} param0
 */
const createConfiguredListItem = ({ item, listItemProperties, key, onClick, remove }) => {
	let fields = [];

	if (listItemProperties) {
		listItemProperties.map((prop, i) => {
			fields.push(
				<div key={i} style={{ flexBasis: '100%' }}>
					<Typography
						style={{
							color: i > 0 ? '#666' : '#111',
							fontWeight: 1 > 0 ? '200' : '700'
						}}
					>
						{typeof prop === 'function' ? prop(item) : item[prop]}
					</Typography>
				</div>
			);
		});
	} else if (typeof item !== 'object') {
		fields.push(
			<div key={0} style={{ flexBasis: '100%' }}>
				<Typography
					style={{
						color: '#111',
						fontWeight: '700'
					}}
				>
					{item}
				</Typography>
			</div>
		);
	} else if (item instanceof Date) {
		fields.push(<DateDetail item={item} />);
	}

	return (
		<ListItem
			key={key}
			style={{
				flexWrap: 'wrap',
				borderBottom: '1px solid #ddd',
				cursor: onClick ? 'pointer' : 'normal'
			}}
			onClick={onClick}
		>
			{fields}
			{!!remove && (
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						onClick={() => {
							remove();
						}}
					>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			)}
		</ListItem>
	);
};

let searchIdOfTimeout;
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
const createIdOfComponent = (
	model,
	property,
	values,
	Type,
	firebase,
	i18n,
	handleChange,
	currentDialogValue = null,
	singleItem = true,
	useOwnTitle = true
) => {
	const config = model.$fieldConfig[property];

	//Validating prior to using
	if (!config.searchField || !config.searchListItemProperties || !config.listItemProperties)
		return (
			<div>
				NEED_TO_CONFIGURE_FIELD:{property} | FieldType:IdOf
				{`<${!!Type ? Type.name : 'undefined'}>`}}<p>MODEL: {JSON.stringify(model)}</p>
			</div>
		);

	const oService = new Type().getService(firebase),
		[list, setList] = useState([]),
		[selected, setSelected] = useState(
			!!currentDialogValue ? currentDialogValue : !!singleItem ? null : []
		),
		[value, setValue] = useState('');

	if (!selected && values[property]) {
		if (!(values[property] instanceof Array && singleItem)) {
			clearTimeout(searchIdOfTimeout);
			searchIdOfTimeout = setTimeout(() => {
				oService.get(values[property]).then((r) => {
					setSelected(r);
				});
			}, 200);
		} else {
			clearTimeout(searchIdOfTimeout);
			searchIdOfTimeout = setTimeout(() => {
				oService.filter([['uid', 'in', values[property]]]).then((r) => {
					setSelected(r);
				});
			}, 200);
		}
	} else if (
		!!selected &&
		selected instanceof Array &&
		selected.length > 0 &&
		(!currentDialogValue ||
			(currentDialogValue instanceof Array && currentDialogValue.length === 0))
	) {
		setSelected(currentDialogValue);

		// //TODO: remove from here
		// //debugging
		// if (process.env.NODE_ENV === 'development') {
		// 	console.log('createIdOfComponent:selected', selected);
		// 	console.log('createIdOfComponent:currentDialogValue', currentDialogValue);
		// }
	}

	const select = (item) => () => {
		setSelected(!!singleItem ? item : [...selected, item]);
		setList([]);
		setValue('');
		handleChange(property, item.uid, item);
	};
	return (
		<div style={{ position: 'relative' }}>
			{useOwnTitle && (
				<Typography variant="h5" className="mb-10">
					{i18n(`${model.getModelName()}.form.${property}`)}
				</Typography>
			)}
			<div style={{ flex: 1 }}>
				<FormInput
					variant="outlined"
					value={value}
					style={{ width: '100%' }}
					onChange={(e) => {
						let text = e.target.value;
						setValue(text);
						clearTimeout(searchIdOfTimeout);
						if (!text) {
							setList([]);
							return;
						}

						let tend =
							text.substr(0, text.length - 1) +
							String.fromCharCode(text.substr(text.length - 1, 1).charCodeAt(0) + 1);

						searchIdOfTimeout = setTimeout(function() {
							oService
								.filter([
									[
										[config.searchField, '>=', text],
										[config.searchField, '<', tend],
										['deleted', '==', false]
									]
								])
								.limit(5)
								.list()
								.then((r) => {
									setList(r);
								});
						}, 300);
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						)
					}}
				/>
			</div>
			{!!list.length && (
				<Paper
					elevation={10}
					style={{
						position: 'absolute',
						zIndex: 10000,
						left: 0,
						right: 0
					}}
				>
					<List style={{ minHeight: 65, maxHeight: 150, overflow: 'scroll' }}>
						{list.map((item, i) => {
							return createConfiguredListItem({
								item,
								listItemProperties: config.searchListItemProperties,
								key: i,
								onClick: select(item)
							});
						})}
					</List>
				</Paper>
			)}
			{!!selected && (
				<div className="mt-10">
					{!!singleItem &&
						createConfiguredListItem({
							item: selected,
							listItemProperties: config.listItemProperties,
							key: 0
						})}
					{!singleItem &&
						selected.map((item, index) =>
							createConfiguredListItem({
								item,
								listItemProperties: config.listItemProperties,
								key: index
							})
						)}
				</div>
			)}
		</div>
	);
};

const createFormComponent = ({
	model,
	property,
	values,
	field,
	error,
	label,
	i18n,
	handleChange
}) => {
	let component = null;

	component = createByType({
		model,
		property,
		values,
		label,
		error,
		i18n,
		field,
		handleChange,
		view: false
	});

	return component;
};

const createViewComponent = ({ model, property, field, values, label, i18n }) => {
	const classes = viewInfoStyles();

	return (
		<div className={classes.root}>
			<FormLabel className={classes.title}>{i18n(label)}</FormLabel>
			{/* The below style.field should be passed on to the type */}
			<div className={classes.detail} style={field.style.field}>
				{createByType({
					model,
					property,
					values,
					label,
					i18n,
					field,
					handleChange: null,
					view: true
				})}
			</div>
		</div>
	);
};

const createByType = ({
	model,
	property,
	values,
	label,
	error,
	i18n,
	field,
	handleChange,
	view = false
}) => {
	let component = null;

	switch (field.type) {
		case FieldTypes.Boolean: {
			component = createBooleanComponent({
				property,
				values,
				label,
				i18n,
				field,
				handleChange,
				view
			});
			break;
		}
		case FieldTypes.Datetime: {
			component = createDatePickerComponent({
				property,
				values,
				label,
				i18n,
				field,
				handleChange,
				view
			});
			break;
		}
		default:
			component = createTextComponent({
				property,
				values,
				field,
				label,
				i18n,
				error,
				handleChange,
				view
			});
			break;
	}

	return component;
};

const createDatePickerComponent = ({
	property,
	values,
	field,
	label,
	i18n,
	error,
	handleChange,
	view = false
}) => {
	const classes = textFieldStyles(),
		[selectedDate, setSelectedDate] = useState(''),
		handleChg = async (date) => {
			let newDate = Date.parse(date);

			if (process.env.NODE_ENV === 'development') {
				console.log('createDatePickerComponent:handleChg:date', date);
				console.log('createDatePickerComponent:handleChg:newDate', newDate);
			}

			setSelectedDate(newDate);
			return handleChange(property, newDate);
		},
		parsedDate = (date) => (typeof date.toDate === 'function' ? date.toDate() : date);

	useEffect(() => {
		let value;

		if (process.env.NODE_ENV === 'development') {
			console.log('createDatePickerComponent:values[property]', values[property]);
		}

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

		if (typeof value === 'object' && typeof value.toDate === 'function') {
			value = value.toDate();
		} else if (typeof value === 'string' && value !== '') {
			value = Date.parse(value);
		}

		setSelectedDate(value);
	}, [values, property]);

	return !!view ? (
		selectedDate !== '' ? (
			typeof selectedDate.toDate === 'function' ? (
				selectedDate.toDate().toLocaleString()
			) : typeof selectedDate.toLocaleString === 'function' ? (
				selectedDate.toLocaleString()
			) : (
				selectedDate
			)
		) : (
			blankFieldPlaceholder
		)
	) : (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<Tooltip arrow title={i18n(`form.datepicker.${property}`)}>
				<React.Fragment>
					<KeyboardDatePicker
						disabled={view}
						disableToolbar
						inputVariant="outlined"
						variant="dialog"
						format="dd/MM/yyyy HH:mm"
						margin="normal"
						id={`date-picker-${property}`}
						label={i18n(label)}
						value={parsedDate(selectedDate)}
						onChange={handleChg}
						KeyboardButtonProps={{
							'aria-label': label
						}}
						error={!!error && !view}
						helperText={!view && !!error ? i18n(`form.error.${error}`) : ' '}
						className={classes.spacer}
						{...field.props}
					/>
				</React.Fragment>
			</Tooltip>
		</MuiPickersUtilsProvider>
	);
};

const createTextComponent = ({
	property,
	values,
	field,
	label,
	i18n,
	error,
	handleChange,
	view = false
}) => {
	const classes = textFieldStyles(),
		[inputVisible, setInputVisible] = useState(false),
		handleVisibilityClick = (e) => {
			//Toggling visibility
			return setInputVisible(!inputVisible);
		};
	let component = null;

	component = !!view ? (
		!!field.protected ? (
			protectedFieldValue
		) : !!values[property] && values[property] !== '' ? (
			<TextStyleByType text={values[property]} i18n={i18n} />
		) : (
			blankFieldPlaceholder
		)
	) : (
		<FormInput
			//TODO: uncomment when usable
			// disabled={!!view}
			className={classes.spacer}
			InputProps={
				!!field.protected
					? {
							endAdornment: (
								<InputAdornment position="end">
									<Tooltip
										title={i18n('button.password.showOrHide.tooltip')}
										arrow
									>
										<IconButton edge="end" onClick={handleVisibilityClick}>
											{inputVisible ? (
												<VisibilityOffIcon />
											) : (
												<VisibilityIcon />
											)}
										</IconButton>
									</Tooltip>
								</InputAdornment>
							)
					  }
					: {}
			}
			inputProps={{ style: !!field.style.field ? field.style.field : {} }}
			label={i18n(label)}
			//TODO: uncomment when usable
			// value={value}
			value={values[property]}
			type={fieldTypeByName(
				!!field.type ? field.type : FieldTypes.String,
				field.protected,
				inputVisible
			)}
			onChange={(e) => {
				//TODO: uncomment when usable
				// if (!!view) return false;

				handleChange(property, e.target.value);

				//Field has specific onChange function, runs after manipulation
				if (!!field.onChange && typeof field.onChange === 'function')
					field.onChange(e, values, property, e.target.value, handleChange);
			}}
			helperText={!view && !!error ? i18n(`form.error.${error}`) : ' '}
			error={!!error && !view}
			{...field.props}
		/>
	);

	return component;
};

const createBooleanComponent = ({
	property,
	values,
	label,
	i18n,
	field,
	handleChange,
	view = false
}) => {
	const classes = textFieldStyles(),
		usableLabel = i18n(label),
		propValue = values[property],
		onChange = useCallback(
			(e) => {
				handleChange(property, e.target.checked);
			},
			[property]
		);

	return !!view ? (
		i18n(
			`boolean.view.${
				undefined !== propValue && propValue !== null ? propValue.toString() : 'undefined'
			}`
		)
	) : (
		<FormControlLabel
			className={classes.spacer}
			label={usableLabel}
			labelPlacement="start"
			style={!!field.style.field ? field.style.field : {}}
			onChange={onChange}
			control={
				<Checkbox
					value={property}
					color="primary"
					checked={values[property]}
					onChange={onChange}
					inputProps={{ 'aria-label': usableLabel }}
					disabled={!!field.disabled || !!view}
				/>
			}
			{...field.props}
		/>
	);
};

const fieldTypeByName = (fieldType, fieldIsProtected = false, inputDataVisible = false) => {
	let fieldTypeName = '';

	if (fieldIsProtected) {
		if (inputDataVisible) {
			return 'text';
		} else {
			return 'password';
		}
	}

	switch (fieldType) {
		case FieldTypes.Time: {
			fieldTypeName = 'time';
			break;
		}
		case FieldTypes.Date: {
			fieldTypeName = 'date';
			break;
		}
		case FieldTypes.Datetime: {
			fieldTypeName = 'datetime-local';
			break;
		}
		case FieldTypes.Integer:
		case FieldTypes.Float: {
			fieldTypeName = 'number';
			break;
		}
		case FieldTypes.String:
		default: {
			fieldTypeName = 'text';
			break;
		}
	}

	return fieldTypeName;
};

const TextStyleByType = ({ text, i18n }) => {
	if (process.env.NODE_ENV === 'development') console.log('==> TextStyleByType(text)', text);

	if (validateEmail(text)) return <EmailInfo text={text} i18n={i18n} />;
	if (validateWebsite(text)) return <WebSiteInfo text={text} i18n={i18n} />;
	if (typeof text.toDate === 'function') return `${text.toDate().toLocaleDateString()}`;
	return `${text}`;
};

export {
	createConfiguredListItem,
	createIdOfComponent,
	createViewComponent,
	createFormComponent,
	getServiceList,
	typeShouldUseService,
	mergeSets,
	removeFromSet
};
