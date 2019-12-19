import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Card, CardContent, List } from '@material-ui/core';
import { FieldTypes, FieldType, ComplexTypes, ModelBase } from '@zerobytes/object-model-js';
import { createConfiguredListItem } from './_functions';

/**
 * Will create a displayable list of components
 *
 * @param {*} model
 * @param {*} property
 * @param {*} Type
 * @param {function} i18n
 * @param {function} handleChange
 */
const createArrayOfComponent = (model, property, Type, i18n, handleChange) => {
	const [items, setItems] = useState([]);
	let component = '';

	let isIdOfModelBase =
		typeof Type === 'function' && Type.name !== 'Object' && new Type() instanceof ModelBase;
	if (isIdOfModelBase) {
	} else if (Type instanceof FieldType) {
	} else {
		switch (Type) {
			case FieldTypes.String:
				component = (
					<TextField
						label={i18n(`${model.getModelName()}.form.${property}`)}
						onChange={(e) => {
							let v = !e.target.value ? [] : e.target.value.split(';');
							setItems(v.filter((s) => !!s));
							handleChange(
								property,
								v.filter((s) => !!s)
							);
						}}
						helperText={
							<span>
								{items.map((item, i) => {
									return (
										<span
											key={i}
											className="rounded bg-primary p-1 mr-5 text-white"
										>
											{item}
										</span>
									);
								})}
							</span>
						}
					/>
				);
				break;
		}
	}

	return (
		<div>
			{/* <div>
				{items.map((item, i) => {
					return <span>{item}</span>;
				})}
			</div> */}
			<div>{component}</div>
		</div>
	);
};

/**
 *
 * @param {object} model
 * @param {function} i18n
 * @param {function} updateFilters
 */
const createFilters = (model, i18n, updateFilters) => {
	const newModel = {};
	Object.keys(model).map((key) => {
		if (key == '$fieldConfig') return;
		newModel[key] = '';
	});
	const [values, setValues] = useState(newModel);

	const handleChange = (property, value) => {
		let v = {
			...values,
			[property]: value
		};
		setValues(v);
		let mainF = [];
		Object.keys(v).map((key, i) => {
			let value = v[key];
			if (value && typeof value === 'string') {
				let f = [];
				let tEnd =
					value.substr(0, value.length - 1) +
					String.fromCharCode(value.substr(value.length - 1, 1).charCodeAt(0) + 1);
				f.push([key, '>=', value]);
				f.push([key, '<', tEnd]);
				f.push(['deleted', '==', false]);
				mainF.push(f);
			} else if (value instanceof Array && value.length) {
				value.map((s) => {
					if (!s) return;
					let f = [];
					f.push([key, 'array-contains', s]);
					f.push(['deleted', '==', false]);
					mainF.push(f);
				});
			}
		});

		updateFilters(mainF);
	};
	let filterFields = [];
	model.$fieldConfig.style = model.$fieldConfig.style || { field: {}, wrapper: {} };
	Object.keys(model.$fieldConfig).map((property, i) => {
		const fieldConfig = model.$fieldConfig[property];

		let label = `${model.getModelName()}.form.${property}`;
		let component = null;

		if (fieldConfig.type instanceof FieldType) {
			switch (fieldConfig.type.complexType) {
				case ComplexTypes.IdOf:
					break;
				case ComplexTypes.ArrayOf:
					component = createArrayOfComponent(
						model,
						property,
						fieldConfig.type.Type,
						i18n,
						handleChange
					);
					break;
				case ComplexTypes.ShapedAs:
					break;
			}
		} else {
			switch (fieldConfig.type) {
				case FieldTypes.String:
				case FieldTypes.Integer:
				case FieldTypes.Float:
					component = (
						<TextField
							style={model.$fieldConfig.style.field}
							label={i18n(label)}
							value={values[property]}
							onChange={(e) => handleChange(property, e.target.value)}
						/>
					);
					break;
			}
		}

		filterFields.push(
			<div key={i} className={'mr-10'}>
				{component}
			</div>
		);
	});
	return filterFields;
};
let searchTimeout;
const search = (oService, filters) => {
	clearTimeout(searchTimeout);
	if (filters && filters.length) {
		oService.filter(filters);
	}

	searchTimeout = setTimeout(() => {
		oService.list();
	}, 300);
};
let oService;

const DynamicList = ({ reduxList, model, configuration, baseRoute, i18n, firebase, store }) => {
	const history = useHistory();
	useEffect(() => {
		oService = model.getService(firebase, store);
		search(oService, []);
	}, []);

	return (
		<div>
			<Card className="mb-15">
				<CardContent>
					<div className="field-group">
						{createFilters(model, i18n, (f) => {
							search(oService, f);
						})}
					</div>
				</CardContent>
			</Card>

			<Card className="mb-15">
				<CardContent>
					<List>
						{reduxList.map((item, i) => {
							return createConfiguredListItem({
								item,
								listItemProperties: configuration.listItemProperties,
								key: i,
								onClick: () => {
									history.push(`${baseRoute}/view/${item.uid}`);
								}
							});
						})}
					</List>
				</CardContent>
			</Card>
		</div>
	);
};

DynamicList.propTypes = {
	reduxList: PropTypes.any,
	model: PropTypes.object,
	configuration: PropTypes.object,
	baseRoute: PropTypes.string,
	i18n: PropTypes.function.isRequired,
	firebase: PropTypes.object.isRequired,
	store: PropTypes.any.isRequired
};

export default DynamicList;
