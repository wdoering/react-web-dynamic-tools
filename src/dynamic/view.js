import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	Typography,
	Card,
	CardContent,
	List,
	Button,
	FormLabel
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FieldTypes, FieldType, ComplexTypes } from '@zerobytes/object-model-js';
import { createConfiguredListItem, createViewComponent } from './_functions';
import { DeleteConfirmationDialog } from '../components/DeleteConfirmationDialog';
import { TitleAndButtons } from '../components/title';

let searchIdOfTimeout;

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
const createIdOfComponent = (model, property, values, Type, i18n, firebase) => {
	const config = model.$fieldConfig[property];
	if (!config.listItemProperties) {
		return (
			<div style={{ fontWeight: 'bold', color: 'red' }}>
				NEED_TO_CONFIGURE_FIELD: {property} | FieldType:IdOf{`<${Type.name}>`}
			</div>
		);
	}
	const oService = new Type().getService(firebase);
	const [selected, setSelected] = useState(null);

	if (!selected && values[property]) {
		clearTimeout(searchIdOfTimeout);
		searchIdOfTimeout = setTimeout(() => {
			oService.get(values[property]).then((r) => {
				setSelected(r);
			});
		}, 200);
	}

	return (
		<div style={{ position: 'relative' }}>
			<Typography variant="h5">{i18n(`${model.getModelName()}.form.${property}`)}</Typography>
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

/**
 * Will create a shaped object display pattern
 *
 * @param {ModelBase} model The model instance for prop picking
 * @param {string} property Property specifically being treated
 * @param {ModelBase} Type Model type literally
 * @param {object} values Values for a sequence selector
 * @param {function} i18n Translation source function
 */
const createShapedAsComponent = (model, property, Type, values, i18n) => {
	let fields = createFields({
		model: Type,
		baseIntl: `${model.getModelName()}.form.${property}`,
		values,
		i18n
	});
	return (
		<div className=" mb-15">
			<Typography variant="h5">{i18n(`${model.getModelName()}.form.${property}`)}</Typography>
			<div style={{ flex: 1 }}>{fields}</div>
		</div>
	);
};

/**
 * Creates an array of items display pattern
 *
 * @param {ModelBase} model The model instance for prop picking
 * @param {string} property Property specifically being treated
 * @param {ModelBase} Type Model type literally
 * @param {function} i18n Translation source function
 */
const createArrayOfComponent = (model, property, values, Type, i18n, firebase) => {
	console.log('property', property);
	console.log('Type', Type);

	const typeInstance = new Type(),
		typeService = !!typeInstance && typeInstance.getService(firebase),
		[list, setList] = useState(values[property] || []);

	if (!list.length && values[property].length) {
		//Is there a service behind?
		if (typeService)
			typeService
				.filter([['uid', 'in', values[property]]])
				.list()
				.then((result) => {
					setList(result);
				});
		//No service at all, sets raw
		else setList(values[property]);
	}

	return (
		<div className="break-field mb-15" key={property}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">
						{i18n(`${model.getModelName()}.form.${property}`)} ({list.length})
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div style={{ flex: 1 }}>
						<List>
							{list.map((item, i) => {
								return createConfiguredListItem({
									item,
									listItemProperties:
										model.$fieldConfig[property].listItemProperties,
									key: i
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
 * @param {object} param0.baseIntl Variable containing the the labelling pattern
 * @param {object} param0.values Variable containing the values of all fields
 * @param {function} param0.i18n Translation source function
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */
const createFields = ({ model, baseIntl, values, i18n, firebase }) => {
	let fields = [];

	Object.keys(model.$fieldConfig).map((property, i) => {
		fields.push(
			createField({
				property,
				model,
				label: `${baseIntl}.${property}`,
				values,
				i18n,
				firebase
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
 *
 * @param {object} param0
 * @param {ModelBase} param0.model Model from the system, passed to DynamicForm
 * @param {string} param0.property Property from the model, destined to this field
 * @param {object} param0.label Variable containing the label text
 * @param {object} param0.values Variable containing the values of all fields
 * @param {function} param0.i18n Translation source function
 * @param {object} param0.firebase Firebase instance for servicing purposes
 */
const createField = ({ model, property, label, values, i18n, firebase }) => {
	const field = model.$fieldConfig[property];
	let component,
		breakField = false;

	//in case the field should be hidden, won't render
	if (!!field.hidden) return null;

	if (!field.style) {
		field.style = { wrapper: {}, field: {} };
	}

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
								i18n,
								firebase
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
					i18n,
					firebase
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
								i18n
							)}
						</CardContent>
					</Card>
				);
				break;
		}
	} else {
		//Creates a component by using an external function
		component = createViewComponent({ model, property, field, values, label, i18n });
	}
	return (
		<div
			key={property}
			className={`${breakField ? 'break-field' : 'sibling-field'} mb-15`}
			style={field.style.wrapper}
		>
			{component}
		</div>
	);
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
const DynamicView = ({ model, id, baseRoute, i18n, firebase, serviceInstance }) => {
	const [values, setValues] = useState(model);
	const history = useHistory();
	const deleteConfirmationDialogRef = React.createRef();
	let fields = createFields({
		model,
		baseIntl: `${model.getModelName()}.form`,
		values,
		i18n,
		firebase
	});
	useEffect(() => {
		//TODO: implement service flexibility
		if (id) {
			let oService = model.getService(firebase);
			oService.get(id).then((r) => {
				model.$fill(r);
				setValues(r);
			});
		}
	}, []);
	const remove = () => {
		let oService = model.getService(firebase);
		oService.patch(values.uid, { deleted: true });
		deleteConfirmationDialogRef.current.close();
		history.push(`${baseRoute}/list`);
	};
	return (
		<form noValidate autoComplete="off">
			<TitleAndButtons
				title={i18n(`${model.getModelName()}.form.$title`)}
				buttons={[
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							history.push(`${baseRoute}/form/${values.uid}`);
						}}
					>
						{i18n('button.edit')}
					</Button>,
					<Button
						variant="contained"
						className="ml-5 btn-danger text-white"
						onClick={() => {
							deleteConfirmationDialogRef.current.open();
						}}
					>
						{i18n('button.delete')}
					</Button>
				]}
			/>
			<DeleteConfirmationDialog
				ref={deleteConfirmationDialogRef}
				title={i18n('dynamic.form.deleteConfirmation')}
				onConfirm={() => remove()}
				i18n={i18n}
			/>
			<div className="field-group mt-15">{fields}</div>
		</form>
	);
};

DynamicView.propTypes = {
	model: PropTypes.object.isRequired,
	id: PropTypes.string,
	baseRoute: PropTypes.string,
	i18n: PropTypes.func.isRequired,
	firebase: PropTypes.object,
	serviceInstance: PropTypes.object
};

export default DynamicView;
