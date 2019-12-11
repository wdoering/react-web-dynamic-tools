import React, { useState, useEffect } from 'react';
// TODO: check whether can be referenced by moduleNameMapper
// import { SaveButton, CancelButton } from 'Components/Button';
import { SaveButton, CancelButton } from '../components/Button';
import PropTypes from 'prop-types';
import {
	ExpansionPanel,
	ExpansionPanelActions,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography,
	Card,
	CardContent,
	List
} from '@material-ui/core';
// TODO: check whether can be referenced by moduleNameMapper
// import IntlMessages from 'Util/IntlMessages';
import IntlMessages from '../util/IntlMessages';
// TODO: check whether can be referenced by moduleNameMapper
// import { BottomButtons } from 'Components/form';
import { BottomButtons } from '../components/form';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import { createConfiguredListItem, createIdOfComponent } from './_functions';

let validateTimeout;

/**
 *
 */
const createShapedAsComponent = (model, property, Type, values, handleChange) => {
	const newModel = {};
	Object.keys(Type).map((key) => {
		if (key == '$fieldConfig') return;
		newModel[key] = '';
	});
	if (!Object.keys(values).length) {
		handleChange(property, Object.assign({}, newModel));
	}
	const [errors, setErrors] = useState([]);
	const validate = (prop, value) => {
		if (!values) return;

		clearTimeout(validateTimeout);
		Type[prop] = value;

		validateTimeout = setTimeout(() => {
			setErrors({
				...errors,
				[prop]: Type.$fieldConfig[prop].validate()
			});
		}, 100);
	};

	// const [values, setValues] = useState(Object.assign({}, newModel));
	let fields = createFields({
		model: Type,
		baseIntl: `${model.getModelName()}.form.${property}`,
		errors,
		values,
		handleChange: (prop, value) => {
			let v = {
				...values,
				[prop]: value
			};
			validate(prop, value);
			handleChange(property, v);
		}
	});
	return (
		<div className=" mb-15">
			<Typography variant="h5">
				<IntlMessages id={`${model.getModelName()}.form.${property}`} />
			</Typography>
			<div style={{ flex: 1 }}>{fields}</div>
		</div>
	);
};
/**
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {FieldType|any} Type
 */
const createArrayOfComponent = (model, property, values, Type, firebase, handleChange) => {
	let defaultCurrentDialogValue = {};
	if (!(Type instanceof FieldType) && typeof Type !== 'object') {
		defaultCurrentDialogValue = '';
	}
	const [list, setList] = useState(values[property] || []);
	const [open, setOpen] = useState(false);
	const [currentDialogValue, setCurrentDialogValue] = useState(defaultCurrentDialogValue);
	if (!list.length && values[property] && values[property].length) {
		setList(values[property]);
	}
	const save = () => {
		if (typeof defaultCurrentDialogValue === 'object') {
			list.push(Object.assign({}, currentDialogValue));
		} else {
			list.push(currentDialogValue);
		}
		setCurrentDialogValue(defaultCurrentDialogValue);
		setList(list);
		setOpen(false);
		handleChange(property, list);
	};
	const remove = (i) => () => {
		list.splice(i, 1);
		setCurrentDialogValue({});
		setList(list);
		setOpen(false);
		handleChange(property, list);
	};

	let inputs;
	let isIdOfModelBase =
		typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;
	if (Type instanceof FieldType) {
		switch (Type.complexType) {
			case ComplexTypes.ShapedAs:
				inputs = createShapedAsComponent(
					model,
					property,
					new Type.Type(),
					currentDialogValue,
					(p, fullObject) => {
						setCurrentDialogValue(fullObject);
					}
				);
				break;
		}
	} else if (isIdOfModelBase) {
		inputs = createIdOfComponent(model, property, values, Type, firebase, (p, uid, item) => {
			setCurrentDialogValue(item);
		});
	} else if (typeof Type === 'string') {
		switch (Type) {
			case FieldTypes.String:
				inputs = (
					<TextField
						label={<IntlMessages id={`${model.getModelName()}.form.${property}`} />}
						onChange={(e) => {
							setCurrentDialogValue(e.target.value);
						}}
					/>
				);

				break;
			case FieldTypes.Date:
				inputs = (
					<TextField
						type="date"
						label={<IntlMessages id={`${model.getModelName()}.form.${property}`} />}
						onChange={(e) => {
							setCurrentDialogValue(e.target.valueAsDate);
						}}
					/>
				);

				break;
			case FieldTypes.Datetime:
				inputs = (
					<TextField
						type="datetime"
						label={<IntlMessages id={`${model.getModelName()}.form.${property}`} />}
						onChange={(e) => {
							setCurrentDialogValue(e.target.valueAsDate);
						}}
					/>
				);

				break;
		}
	}
	return (
		<div className="break-field mb-15" key={property}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">
						<IntlMessages id={`${model.getModelName()}.form.${property}`} /> (
						{list.length})
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelActions style={{ padding: '0 25px' }}>
					<Button variant={'contained'} onClick={() => setOpen(true)} color={'primary'}>
						<IntlMessages id="button.add" />
					</Button>
				</ExpansionPanelActions>
				<ExpansionPanelDetails>
					<Dialog
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						style={{ root: { overflow: isIdOfModelBase ? 'visible' : '' } }}
					>
						<DialogTitle>{"Use Google's location service?"}</DialogTitle>
						<DialogContent
							style={{
								height: isIdOfModelBase ? 300 : '',
								overflow: isIdOfModelBase ? 'visible' : ''
							}}
						>
							{inputs}
						</DialogContent>
						<DialogActions>
							<SaveButton onClick={save} color="primary" />
							<CancelButton
								onClick={() => setOpen(false)}
								color="primary"
								autoFocus
							/>
						</DialogActions>
					</Dialog>
					<div style={{ flex: 1 }}>
						<List>
							{list.map((item, i) => {
								return createConfiguredListItem({
									item,
									listItemProperties:
										model.$fieldConfig[property].listItemProperties,
									key: i,
									remove: remove(i)
								});
							})}
						</List>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
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
const createFields = ({ model, baseIntl, errors, values, firebase, handleChange }) => {
	let fields = [];

	Object.keys(model.$fieldConfig).map((property, i) => {
		fields.push(
			createField({
				property,
				model,
				label: `${baseIntl}.${property}`,
				errors,
				values,
				firebase,
				handleChange
			})
		);
		if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
			fields.push(
				<div key={i} className="sibling-field" style={{ flexBasis: '100%' }}></div>
			);
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
const createField = ({ model, property, label, values, errors, firebase, handleChange }) => {
	const field = model.$fieldConfig[property];
	if (!field.style) {
		field.style = { wrapper: {}, field: {} };
	}
	let component;
	let error = '';
	if (errors[property]) {
		error = errors[property][0];
	}
	let breakField = false;
	field.props = field.props || {};
	if (field.type instanceof FieldType) {
		breakField = true;
		switch (field.type.complexType) {
			case ComplexTypes.IdOf:
				breakField = true;
				component = (
					<Card className="mb-15" style={{ overflow: 'visible' }}>
						<CardContent>
							{createIdOfComponent(
								model,
								property,
								values,
								field.type.Type,
								firebase,
								(property, id) => {
									handleChange(property, id);
								}
							)}
						</CardContent>
					</Card>
				);
				break;
			case ComplexTypes.ArrayOf:
				breakField = true;
				component = createArrayOfComponent(
					model,
					property,
					values,
					field.type.Type,
					firebase,
					(property, fullArray) => {
						handleChange(property, fullArray);
					}
				);
				break;
			case ComplexTypes.ShapedAs:
				breakField = true;
				if (!model[property]) {
					model[property] = new field.type.Type();
				}

				component = (
					<Card className="mb-15">
						<CardContent>
							{createShapedAsComponent(
								model,
								property,
								new field.type.Type(),
								values[property],
								(property, fullObject) => {
									delete fullObject.$fieldConfig;
									handleChange(property, fullObject);
								}
							)}
						</CardContent>
					</Card>
				);
				break;
		}
	} else {
		switch (field.type) {
			case FieldTypes.String:
				component = (
					<TextField
						{...field.props}
						style={field.style.field}
						label={<IntlMessages id={label} />}
						value={values[property]}
						onChange={(e) => handleChange(property, e.target.value)}
						helperText={error ? <IntlMessages id={`form.error.${error}`} /> : ' '}
					/>
				);
		}
	}
	return (
		<div
			key={property}
			className={breakField ? 'break-field' : 'sibling-field'}
			style={field.style.wrapper}
		>
			{component}
		</div>
	);
};

/**
 *
 * @param {object} param0
 */
const DynamicForm = ({ model, handleSave, id, firebase }) => {
	const [values, setValues] = useState(model);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (id) {
			let oService = model.getService(firebase);
			oService.get(id).then((r) => {
				model.$fill(r);
				setValues(r);
			});
		}
	}, []);

	/**
	 * Update values[prop] state
	 * @param {string} prop
	 */
	const handleChange = (prop, value) => {
		let v = {
			...values,
			[prop]: value
		};

		setValues(v);
		validate(prop, value);
	};
	/**
	 * Validates a property of the model
	 * @param {string} prop
	 * @param {any} value
	 */
	const validate = (prop, value) => {
		clearTimeout(validateTimeout);
		model[prop] = value;

		validateTimeout = setTimeout(() => {
			setErrors({
				...errors,
				[prop]: model.$fieldConfig[prop].validate()
			});
		}, 100);
	};
	/**
	 * saves model at the server, after validation
	 */
	const save = () => {
		model.$fill(values);
		let validation = model.$validate();
		setErrors(validation);
		if (!Object.keys(validation).length) {
			if (handleSave) {
				handleSave(values);
			} else {
				model.getService(firebase).save(values);
			}
		}
	};

	let fields = createFields({
		model,
		baseIntl: `${model.getModelName()}.form`,
		errors,
		values,
		firebase,
		handleChange
	});
	return (
		<form noValidate autoComplete="off">
			<Typography variant="h4" className="mb-15">
				<IntlMessages id={`${model.getModelName()}.form.$title`} />
			</Typography>
			<div className="field-group">{fields}</div>
			<div>
				<BottomButtons buttons={[<SaveButton onClick={save} />, <CancelButton />]} />
			</div>
		</form>
	);
};

DynamicForm.propTypes = {
	model: PropTypes.object.isRequired,
	handleSave: PropTypes.func,
	id: PropTypes.string,
	firebase: PropTypes.object.isRequired
};

export default DynamicForm;
