import React, { useState, useEffect, useCallback } from 'react';
import { SaveButton, CancelButton, AddButton, CancelReturnButton } from '../components/Button';
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
	Typography,
	Card,
	CardContent,
	List
} from '@material-ui/core';

import { BottomButtons, FieldGroup } from '../components/form';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import {
	createConfiguredListItem,
	createIdOfComponent,
	createFormComponent,
	mergeSets,
	removeFromSet
} from '../functions';
import { FormInput, ErrorLabel } from '../components/form';
import { useListOfData } from '../hooks';
import { TitleAndButtons } from '../components/title';
import { SpacerSiblingField } from './_common';

let validateTimeout;

/**
 * @param {property} model the model reference
 * @param {property} property the current property name
 * @param {object} Type the field type for usage on construction
 * @param {array} values values set for the field for rendering
 * @param {function} i18n Translation base function. Has to receive an ID
 * @param {function} handleChg Firebase instance for service purposes
 */
const createShapedAsComponent = (model, property, Type, values, i18n, handleChg) => {
	const newModel = {};
	Object.keys(Type).forEach((key, index) => {
		if (key == '$fieldConfig') return;
		newModel[key] = '';
	});
	if (!Object.keys(values).length) {
		handleChg(property, Object.assign({}, newModel));
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
			handleChg(property, v);
		}
	});
	return (
		<div className=" mb-15">
			<Typography variant="h5" style={{ marginBottom: '10px' }}>
				{i18n(`${model.getModelName()}.form.${property}.add`)}
			</Typography>
			<div style={{ flex: 1 }}>{fields}</div>
		</div>
	);
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
const createArrayOfComponent = (
	model,
	property,
	values,
	error,
	Type,
	firebase,
	i18n,
	handleChange
) => {
	let defaultCurrentDialogValue = {},
		shouldOverflowListItems = false,
		i18nPropertyLabel = i18n(`${model.getModelName()}.form.${property}`),
		inputs,
		errorMessage = !!error && error !== '' && i18n(`form.error.${error}`),
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

	//Using the external data grabber hook
	const [list, setList] = useListOfData(values, property, Type, firebase),
		[open, setOpen] = useState(false),
		[currentDialogValue, setCurrentDialogValue] = useState(defaultCurrentDialogValue);

	const save = () => {
		let newList;

		//setting the list itself
		newList = mergeSets(values[property], currentDialogValue, defaultCurrentDialogValue);
		//resets the dialog
		setCurrentDialogValue(defaultCurrentDialogValue);
		setOpen(false);
		handleChange(property, newList);
	};

	const remove = (itemRemoving, index) => () => {
		let newList = removeFromSet(values[property], itemRemoving, index);
		setCurrentDialogValue(defaultCurrentDialogValue);
		setOpen(false);
		handleChange(property, newList);
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
			},
			currentDialogValue
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
						currentDialogValue,
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
					<FormInput
						label={i18nPropertyLabel}
						onChange={(e) => setCurrentDialogValue(e.target.value)}
					/>
				);

				break;
			case FieldTypes.Date:
				inputs = (
					<FormInput
						type="date"
						label={i18nPropertyLabel}
						onChange={(e) => setCurrentDialogValue(e.target.valueAsDate)}
					/>
				);

				break;
			case FieldTypes.Datetime:
				inputs = (
					<FormInput
						type="datetime"
						label={i18nPropertyLabel}
						onChange={(e) => setCurrentDialogValue(e.target.valueAsDate)}
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
						{i18nPropertyLabel} {!!list && `(${list.length})`}
					</Typography>
					<ErrorLabel>{errorMessage}</ErrorLabel>
				</ExpansionPanelSummary>
				<ExpansionPanelActions style={{ padding: '0 25px' }}>
					<AddButton onClick={() => setOpen(true)} i18n={i18n} />
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
								overflow: shouldOverflowListItems ? 'visible' : '',
								paddingTop: 0
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
						{!!list && list.length > 0 && (
							<List>
								{list.map((item, i) => {
									return createConfiguredListItem({
										item,
										listItemProperties:
											model.$fieldConfig[property].listItemProperties,
										key: i,
										remove: remove(item, i)
									});
								})}
							</List>
						)}
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

		//should add a break after the field
		if (model.$fieldConfig[property].style && model.$fieldConfig[property].style.break) {
			fields.push(<SpacerSiblingField key={i} />);
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
		breakField = false,
		errorMessage = null;

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
		//Getting the error message
		errorMessage = !!error && error !== '' && i18n(`form.error.${error}`);

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
							<ErrorLabel>{errorMessage}</ErrorLabel>
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
					error,
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
							<ErrorLabel>{errorMessage}</ErrorLabel>
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
 * @param {function} param0.handleCancel cancelling function to be invoked
 * @param {string} param0.id register/item ID
 * @param {object} param0.firebase firebase API instance
 * @param {function} param0.i18n Translation base function. Has to receive an ID
 *
 */
const DynamicForm = ({ model, handleSave, handleCancel, id, firebase, i18n }) => {
	let oService = null;
	const [values, setValues] = useState(model),
		[errors, setErrors] = useState({});

	//No dynamic form model service available
	if (!model || typeof model.getService !== 'function') {
		console.warn('dynamic-form-model.getService()-function-not-available');
	} else {
		//Creates service instance
		oService = model.getService(firebase);
	}

	useEffect(() => {
		if (id && (!model.uid || model.uid !== id) && oService) {
			oService.get(id).then((r) => {
				model.$fill(r);
				setValues(r);
			});
		}
	}, [model, id, oService, setValues]);

	/**
	 * Update values[prop] state
	 * @param {string} prop
	 */
	const handleChange = useCallback(
		(prop, value) => {
			let v = {
				...values,
				[prop]: value
			};

			setValues(v);
			validate(prop, value);
		},
		[values, setValues, validate]
	);
	/**
	 * Validates a property of the model
	 * @param {string} prop
	 * @param {any} value
	 */
	const validate = useCallback(
		(prop, value) => {
			clearTimeout(validateTimeout);
			model[prop] = value;

			validateTimeout = setTimeout(() => {
				const validateResult = model.$fieldConfig[prop].validate();

				setErrors({
					...errors,
					[prop]: validateResult
				});
			}, 100);
		},
		[errors, model]
	);
	/**
	 * saves model at the server, after validation
	 */
	const save = useCallback(() => {
		model.$fill(values);
		let validation = model.$validate();

		//Debugging
		//TODO: remove from here anyways
		if (process.env.NODE_ENV === 'development') console.log(`validation`, validation);

		setErrors(validation);

		if (!Object.keys(validation).length) {
			if (handleSave) {
				handleSave(values);
			} else {
				oService.save(values);
			}
		}
	}, [setErrors, model, oService]);

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
			<TitleAndButtons title={i18n(`${model.getModelName()}.form.$title`)} />
			<FieldGroup>{fields}</FieldGroup>
			<div>
				<BottomButtons
					buttons={[
						<SaveButton onClick={save} i18n={i18n} />,
						<CancelReturnButton onClick={handleCancel} i18n={i18n} />
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
