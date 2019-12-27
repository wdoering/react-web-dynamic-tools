import React, { useState } from 'react';
import {
	FormControlLabel,
	TextField,
	Typography,
	List,
	ListItem,
	ListItemSecondaryAction,
	InputAdornment,
	Paper,
	Checkbox,
	FormLabel,
	FormControl
} from '@material-ui/core';
import { FieldTypes } from '@zerobytes/object-model-js';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

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
const createIdOfComponent = (model, property, values, Type, firebase, i18n, handleChange) => {
	const config = model.$fieldConfig[property];
	if (!config.searchField || !config.searchListItemProperties || !config.listItemProperties)
		return (
			<div>
				NEED_TO_CONFIGURE_FIELD:{property} | FieldType:IdOf{`<${Type.name}>`}
			</div>
		);
	// const oService = new Type().getService(firebase);
	const oService = new Type.Type().getService(firebase);
	const [list, setList] = useState([]);
	const [selected, setSelected] = useState(null);
	const [value, setValue] = useState('');

	if (!selected && values[property] && !(values[property] instanceof Array)) {
		clearTimeout(searchIdOfTimeout);
		searchIdOfTimeout = setTimeout(() => {
			oService.get(values[property]).then((r) => {
				setSelected(r);
			});
		}, 200);
	}

	const select = (item) => () => {
		setSelected(item);
		setList([]);
		setValue('');
		handleChange(property, item.uid, item);
	};
	return (
		<div style={{ position: 'relative' }}>
			<Typography variant="h5">{i18n(`${model.getModelName()}.form.${property}`)}</Typography>
			<div style={{ flex: 1 }} className="mt-10">
				<TextField
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
							oService.filter([
								[
									[config.searchField, '>=', text],
									[config.searchField, '<', tend],
									['deleted', '==', false]
								]
							]);
							console.log([
								[
									[config.searchField, '>=', text],
									[config.searchField, '<', tend],
									['deleted', '==', false]
								]
							]);
							oService
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
					<List style={{ height: 150, overflow: 'scroll' }}>
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
			<div className="mt-10">
				{!!selected &&
					createConfiguredListItem({
						item: selected,
						listItemProperties: config.listItemProperties,
						key: 0
					})}
			</div>
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
	return (
		<div>
			<FormLabel>{i18n(label)}</FormLabel>
			<div style={{ fontSize: 18, fontWeight: '100', ...field.style.field }}>
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
		case FieldTypes.Boolean:
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
	let component = null;

	component = !!view ? (
		!!field.protected ? (
			protectedFieldValue
		) : !!values[property] && values[property] !== '' ? (
			values[property]
		) : (
			blankFieldPlaceholder
		)
	) : (
		<TextField
			{...field.props}
			style={field.style.field}
			label={i18n(label)}
			value={values[property]}
			type={!!field.protected ? 'password' : !!field.props.type ? field.props.type : 'text'}
			onChange={(e) => handleChange(property, e.target.value)}
			helperText={error ? i18n(`form.error.${error}`) : ' '}
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
	const usableLabel = i18n(label);

	return !!view ? (
		i18n(`boolean.view.${values[property].toString()}`)
	) : (
		<FormControl>
			<FormLabel>{usableLabel}</FormLabel>
			<Checkbox
				value={property}
				color="primary"
				checked={values[property]}
				onChange={(e) => handleChange(property, e.target.checked)}
				inputProps={{ 'aria-label': usableLabel }}
				disabled={!!field.disabled}
			/>
		</FormControl>
	);
};

export { createConfiguredListItem, createIdOfComponent, createViewComponent, createFormComponent };
