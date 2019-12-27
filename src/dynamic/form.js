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

import { BottomButtons } from '../components/form';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import { createConfiguredListItem, createIdOfComponent, createFormComponent } from './_functions';

let validateTimeout;

/**
 * @param {property} model the model reference
 * @param {property} property the current property name
 * @param {object} Type the field type for usage on construction
 * @param {array} values values set for the field for rendering
 * @param {function} i18n Translation base function. Has to receive an ID
 * @param {function} handleChange Firebase instance for service purposes
 */
const createShapedAsComponent = (model, property, Type, values, i18n, handleChange) => {
	const newModel = {};
	Object.keys(Type).forEach((key, index) => {
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
		i18n,
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
				{i18n(`${model.getModelName()}.form.${property}.add`)}
			</Typography>
			<div style={{ flex: 1 }}>{fields}</div>
		</div>
	);
};
/**
 *
 * @param {object} model
 * @param {ModelBase} model
 * @param {string} property
 * @param {FieldType|any} Type
 */
const createArrayOfComponent = (model, property, values, Type, firebase, i18n, handleChange) => {
	let defaultCurrentDialogValue = {},
		shouldOverflowListItems = false,
		i18nPropertyLabel = i18n(`${model.getModelName()}.form.${property}`),
		inputs,
		typeIsFieldType = Type instanceof FieldType,
		typeIsComplexType = !!Type.complexType,
		isIdOfModelBase =
			typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;

	if (!(Type instanceof FieldType) && typeof Type !== 'object') {
		defaultCurrentDialogValue = '';
	} else if (!!Type.Type) {
		//collection should be predefined
		defaultCurrentDialogValue = [];
	}

	const [list, setList] = useState(values[property] || []),
		[open, setOpen] = useState(false),
		[currentDialogValue, setCurrentDialogValue] = useState(defaultCurrentDialogValue);

	//Picking array of items from model instance
	if (!list.length && values[property] && values[property].length) {
		setList(values[property]);
	}

	const save = () => {
		if (typeof defaultCurrentDialogValue === 'object') {
			list.push(Object.assign({}, currentDialogValue));
		} else if (defaultCurrentDialogValue instanceof Array) {
			console.log('currentDialogValue', currentDialogValue);
			list.push(...currentDialogValue);
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
		setCurrentDialogValue(defaultCurrentDialogValue);
		setList(list);
		setOpen(false);
		handleChange(property, list);
	};

	if (isIdOfModelBase) {
		//Allows overflowing
		shouldOverflowListItems = true;
		// console.log('isIdOfModelBase', isIdOfModelBase);
		inputs = createIdOfComponent(
			model,
			property,
			values,
			Type,
			firebase,
			i18n,
			(p, uid, item) => {
				setCurrentDialogValue(item);
			}
		);
	} else if (typeIsFieldType) {
		if (typeIsComplexType) {
			switch (Type.complexType) {
				case ComplexTypes.ShapedAs: {
					inputs = createShapedAsComponent(
						model,
						property,
						new Type.Type(),
						currentDialogValue,
						i18n,
						(p, fullObject) => {
							setCurrentDialogValue(fullObject);
						}
					);
					break;
				}
				case ComplexTypes.IdOf: {
					//Allows overflowing
					shouldOverflowListItems = true;

					inputs = createIdOfComponent(
						model,
						property,
						values,
						Type.Type,
						firebase,
						i18n,
						(p, uid, item) => {
							setCurrentDialogValue([...currentDialogValue, uid]);
						},
						false,
						false
					);
					break;
				}
				default:
					inputs = `DEFAULT_COMPLEX_TYPE_NOT_IMPLEMENTED: ComplexType: ${Type.complexType} | Type.name: ${Type.Type.name}`;
					break;
			}
		} else {
			inputs = `FIELD_TYPE_NOT_IMPLEMENTED: Type ${Type}`;
		}
	} else if (typeof Type === 'string') {
		switch (Type) {
			case FieldTypes.String:
				inputs = (
					<TextField
						label={i18nPropertyLabel}
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
						label={i18nPropertyLabel}
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
						label={i18nPropertyLabel}
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
						{i18nPropertyLabel} ({list.length})
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelActions style={{ padding: '0 25px' }}>
					<Button variant={'contained'} onClick={() => setOpen(true)} color={'primary'}>
						{i18n('button.add')}
					</Button>
				</ExpansionPanelActions>
				<ExpansionPanelDetails>
					<Dialog
						open={open}
						onClose={() => setOpen(false)}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						style={{ root: { overflow: shouldOverflowListItems ? 'visible' : '' } }}
					>
						<DialogTitle>{i18nPropertyLabel}</DialogTitle>
						<DialogContent
							style={{
								height: shouldOverflowListItems ? 300 : '',
								overflow: shouldOverflowListItems ? 'visible' : ''
							}}
						>
							{inputs}
						</DialogContent>
						<DialogActions>
							<SaveButton onClick={save} color="primary" i18n={i18n} />
							<CancelButton
								onClick={() => setOpen(false)}
								color="primary"
								autoFocus
								i18n={i18n}
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
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */
const createFields = ({ model, baseIntl, errors, values, firebase, i18n, handleChange }) => {
	let fields = [];

	Object.keys(model.$fieldConfig).forEach((property, i) => {
		fields.push(
			createField({
				property,
				model,
				label: `${baseIntl}.${property}`,
				errors,
				values,
				firebase,
				i18n,
				handleChange
			})
		);
		if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
			fields.push(
				<div key={i} className="sibling-field" style={{ flexBasis: '100%' }}></div>
			);
		}
	});
	return fields.filter((item) => !!item && item !== '');
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
const createField = ({ model, property, label, values, errors, firebase, i18n, handleChange }) => {
	const field = model.$fieldConfig[property];
	let component,
		error = '',
		breakField = false;

	//If the field should be hidden, won't show up
	if (!!field.hidden) return null;

	if (!field.style) {
		field.style = { wrapper: {}, field: {} };
	}

	if (errors[property]) {
		error = errors[property][0];
	}

	field.props = field.props || {};

	if (field.type instanceof FieldType) {
		breakField = true;
		switch (field.type.complexType) {
			case ComplexTypes.IdOf:
				//Has to use entire line
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
								i18n,
								(property, id) => {
									handleChange(property, id);
								}
							)}
						</CardContent>
					</Card>
				);
				break;
			case ComplexTypes.ArrayOf:
				//Has to use entire line
				breakField = true;

				component = createArrayOfComponent(
					model,
					property,
					values,
					field.type.Type,
					firebase,
					i18n,
					(property, fullArray) => {
						handleChange(property, fullArray);
					}
				);
				break;
			case ComplexTypes.ShapedAs:
				//Has to use entire line
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
								i18n,
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
		// switch (field.type) {
		// 	default:
		component = createFormComponent({
			model,
			property,
			values,
			field,
			error,
			label,
			i18n,
			handleChange
		});
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
 * @param {function} param0.model model instance for reference purposes
 * @param {function} param0.handleSave saving function to be invoked
 * @param {string} param0.id register/item ID
 * @param {object} param0.firebase firebase API instance
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 *
 */
const DynamicForm = ({ model, handleSave, id, firebase, i18n }) => {
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
		i18n,
		handleChange
	});
	return (
		<form noValidate autoComplete="off">
			<Typography variant="h4" className="mb-15">
				{i18n(`${model.getModelName()}.form.$title`)}
			</Typography>
			<div className="field-group">{fields}</div>
			<div>
				<BottomButtons
					buttons={[
						<SaveButton onClick={save} i18n={i18n} />,
						<CancelButton i18n={i18n} />
					]}
				/>
			</div>
		</form>
	);
};

DynamicForm.propTypes = {
	model: PropTypes.object.isRequired,
	handleSave: PropTypes.func,
	id: PropTypes.string,
	firebase: PropTypes.object.isRequired,
	i18n: PropTypes.func.isRequired
};

export default DynamicForm;
