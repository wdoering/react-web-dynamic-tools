import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import {
	createConfiguredListItem,
	createViewComponent,
	getServiceList,
	typeShouldUseService
} from '../functions';
import { DeleteConfirmationDialog } from '../components/DeleteConfirmationDialog';
import { TitleAndButtons } from '../components/title';
import { useListOfData } from '../hooks';
import { EmptyRelation, FieldGroup } from '../components/form';
import { EditButton, DeleteButton } from '../components/Button';
import { SpacerSiblingField } from './_common';

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
				NEED_TO_CONFIGURE_FIELD: {property} | FieldType:IdOf
				{`<${!!Type ? Type.name : 'undefined'}>`}
				<p>MODEL: {JSON.stringify(model)}</p>
			</div>
		);
	}

	// if (process.env.NODE_ENV === 'development') {
	// 	console.log('===========================');
	// 	console.log('==> createIdOfComponent:model', model);
	// 	console.log('==> createIdOfComponent:property', property);
	// 	console.log('==> createIdOfComponent:Type', Type);
	// 	console.log('==> createIdOfComponent:values[property]', values[property]);
	// }

	const [selected, setSelected] = useState(null);

	if (!selected && undefined !== values[property] && values[property] !== '') {
		const oService = new Type().getService(firebase);

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
				{!selected && <EmptyRelation i18n={i18n} />}
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
 * @param {object} firebase Firebase source object
 */
const createShapedAsComponent = (model, property, Type, values, i18n, firebase) => {
	let fields = createFields({
		// model: model.hasOwnProperty(property) ? model[property] : new Type(model[property]),
		model: new Type(model[property]),
		baseIntl: `${model.getModelName()}.form.${property}`,
		values,
		i18n,
		firebase
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
	//will use a hook which maps the list of data
	const [list] = useListOfData(values, property, Type, firebase);

	return (
		<div className="break-field mb-15" key={property}>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h5">
						{i18n(`${model.getModelName()}.form.${property}`)}{' '}
						{!!list && `(${list.length})`}
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div style={{ flex: 1 }}>
						{!!list && list.length > 0 && (
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
 * @param {object} param0.baseIntl Variable containing the the labelling pattern
 * @param {object} param0.values Variable containing the values of all fields
 * @param {function} param0.i18n Translation source function
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */
const createFields = ({ model, baseIntl, values, i18n, firebase }) => {
	let fields = [];

	Object.keys(model.$fieldConfig).forEach((property, i) => {
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
			fields.push(<SpacerSiblingField key={i} />);
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
				if (!model[property]) {
					model[property] = '';
				}

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
								field.type.Type, //new field.type.Type(),
								values[property],
								i18n,
								firebase
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
			className={breakField ? 'break-field' : 'sibling-field'}
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
	const [values, setValues] = useState(model),
		history = useHistory(),
		deleteConfirmationDialogRef = React.createRef(),
		oService = !!serviceInstance ? serviceInstance : model.getService(firebase),
		// [serviceRunning, setServiceRunning] = useState(false),
		fillData = (data) => {
			model.$fill(data);
			setValues(data);

			return data;
		};

	useEffect(() => {
		// if (!!id && !serviceRunning && (!model.uid || model.uid !== id)) {
		if (!!id || model.uid !== id) {
			//TODO: remove from here
			if (process.env.NODE_ENV === 'development') {
				console.log('DynamicView:useEffect:serviceWillRun');
			}

			if (typeof oService.get !== 'function') {
				throw Error('dynamic-list-service-requires-a-get(id)-method');
			}

			//runs the service
			oService
				.get(id)
				.then(fillData)
				.catch((e) => {
					if (process.env.NODE_ENV === 'development') console.error(e);
					else throw e;
				});
		}
	}, [id]);

	// //cleanup useEffect
	// useEffect(() => {
	// 	if (process.env.NODE_ENV === 'development') console.log('useEffect:unmount');
	// }, []);

	const remove = useCallback(() => {
		oService.patch(values.uid, { deleted: true });
		deleteConfirmationDialogRef.current.close();

		//redirect
		history.push(`${baseRoute}/list`);
	}, [oService, values, deleteConfirmationDialogRef, history]);

	let fields = createFields({
		model,
		baseIntl: `${model.getModelName()}.form`,
		values,
		i18n,
		firebase
	});

	return (
		<form>
			<TitleAndButtons
				title={i18n(`${model.getModelName()}.form.$title`)}
				buttons={[
					<EditButton baseRoute={baseRoute} id={values.uid} i18n={i18n} />,
					<DeleteButton
						onClick={() => {
							deleteConfirmationDialogRef.current.open();
						}}
						i18n={i18n}
					/>
				]}
			/>
			<DeleteConfirmationDialog
				ref={deleteConfirmationDialogRef}
				title={i18n('dynamic.form.deleteConfirmation')}
				onConfirm={() => remove()}
				i18n={i18n}
			/>
			<FieldGroup marginTop>{fields}</FieldGroup>
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
