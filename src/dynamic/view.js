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
// TODO: check whether can be referenced by moduleNameMapper
// import IntlMessages from 'Util/IntlMessages';
import IntlMessages from '../util/IntlMessages';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { FieldTypes, FieldType, ComplexTypes } from 'object-model-js';
import { createConfiguredListItem } from './_functions';
// TODO: check use of moduleNameMapper
// import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import { DeleteConfirmationDialog } from '../components/DeleteConfirmationDialog';

let searchIdOfTimeout;
/**
 *
 * @param {ModelBase} model
 * @param {string} property
 * @param {object} values
 * @param {ModelBase} Type
 * @param {function} handleChange
 */
const createIdOfComponent = (model, property, values, Type, firebase) => {
	const config = model.$fieldConfig[property];
	if (!config.listItemProperties) {
		return (
			<div>
				NEED_TO_CONFIGURE_FIELD:{property} | FieldType:IdOf{`<${Type.name}>`}
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
			<Typography variant="h5">
				<IntlMessages id={`${model.getModelName()}.form.${property}`} />
			</Typography>
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
 *
 */
const createShapedAsComponent = (model, property, Type, values) => {
	let fields = createFields({
		model: Type,
		baseIntl: `${model.getModelName()}.form.${property}`,
		values
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
const createArrayOfComponent = (model, property, values, Type) => {
	const [list, setList] = useState(values[property] || []);
	if (!list.length && values[property].length) {
		setList(values[property]);
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
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.errors Variable containing the error list
 * @param {function} param0.handleChange Function to handle save event. Needs to be a function that receives a property as param and returns another function
 */
const createFields = ({ model, baseIntl, values, firebase }) => {
	let fields = [];

	Object.keys(model.$fieldConfig).map((property, i) => {
		fields.push(
			createField({
				property,
				model,
				label: `${baseIntl}.${property}`,
				values,
				firebase
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
 * @param {object} param0.label Variable containing the label text
 * @param {object} param0.values Variable containing the values of all fields
 * @param {object} param0.firebase Firebase instance for servicing purposes
 */
const createField = ({ model, property, label, values, firebase }) => {
	const field = model.$fieldConfig[property];
	if (!field.style) {
		field.style = { wrapper: {}, field: {} };
	}
	let component;

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
								firebase
							)}
						</CardContent>
					</Card>
				);
				break;
			case ComplexTypes.ArrayOf:
				breakField = true;
				component = createArrayOfComponent(model, property, values, field.type.Type);
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
								values[property]
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
					<div>
						<FormLabel>
							<IntlMessages id={label} />
						</FormLabel>
						<div style={{ fontSize: 18, fontWeight: '100', ...field.style.field }}>
							{values[property]}
						</div>
					</div>
				);
		}
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
 *
 * @param {object} param0
 */
const DynamicView = ({ model, id, baseRoute, firebase }) => {
	const [values, setValues] = useState(model);
	const history = useHistory();
	const deleteConfirmationDialogRef = React.createRef();
	let fields = createFields({
		model,
		baseIntl: `${model.getModelName()}.form`,
		values,
		firebase
	});
	useEffect(() => {
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
			<Typography
				variant="h4"
				className="mb-15"
				style={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					alignContent: 'center'
				}}
			>
				<IntlMessages id={`${model.getModelName()}.form.$title`} />
				<div style={{ flex: 1 }}></div>
				<Button
					variant="contained"
					color="primary"
					className="mr-5"
					onClick={() => {
						history.push(`${baseRoute}/form/${values.uid}`);
					}}
				>
					<IntlMessages id="button.edit" />
				</Button>
				<Button
					variant="contained"
					className="mr-5 btn-danger text-white"
					onClick={() => {
						deleteConfirmationDialogRef.current.open();
					}}
				>
					<IntlMessages id="button.delete" />
				</Button>
			</Typography>
			<DeleteConfirmationDialog
				ref={deleteConfirmationDialogRef}
				title={<IntlMessages id="dynamic.form.deleteConfirmation" />}
				onConfirm={() => remove()}
			/>
			<div className="field-group">{fields}</div>
		</form>
	);
};

DynamicView.propTypes = {
	model: PropTypes.object.isRequired,
	id: PropTypes.string,
	baseRoute: PropTypes.string,
	firebase: PropTypes.object.isRequired
};

export default DynamicView;
