import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TextField, Card, CardContent, List, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/SearchRounded';
import {
	FieldTypes,
	FieldType,
	ComplexTypes,
	ModelBase,
	PlainObject
} from '@zerobytes/object-model-js';
import { createConfiguredListItem } from '../functions';
import { TitleAndButtons } from '../components/title';
import EmptyList from '../components/list/Empty';
import ListTotaliser from '../components/list/Totaliser';
import { AddButton } from '../components/Button';
import { FieldGroup, FormInput } from '../components/form';
import { filterTextField } from '../assets/_styles';
import { useModelProps, useEnterPress } from '../hooks';
import {
	removeSpecialChars,
	validateEmail,
	validateWebsite,
	textIsKnownType
} from '../util/validations';

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
			//Array of string
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
			<div>{component}</div>
		</div>
	);
};

/**
 * Creates the array of inputs for filtering data
 *
 * @param {object} model
 * @param {function} i18n
 * @param {function} updateFilters
 */
const createFilters = (model, i18n, updateFilters) => {
	const newModel = {};
	let filterFields = [];

	Object.keys(model).map((key) => {
		if (key == '$fieldConfig') return;
		newModel[key] = '';
	});

	const [values, setValues] = useState(newModel);

	const handleChange = useCallback((property, value) => {
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
				// TODO: check whether results are affected f.push(['deleted', '==', false]);
				mainF.push(f);
			} else if (value instanceof Array && value.length) {
				value.map((s) => {
					if (!s) return;
					let f = [];
					f.push([key, 'array-contains', s]);
					// TODO: check whether results are affected f.push(['deleted', '==', false]);
					mainF.push(f);
				});
			}
		});

		updateFilters(mainF);
	});

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

/**
 * Creates the array of inputs for filtering data
 *
 * @param {object} param0
 * @param {object} param0.model
 * @param {function} param0.i18n
 * @param {function} param0.updateFilters
 */
const SingleFilter = ({ model, i18n, updateFilters }) => {
	const classes = filterTextField(),
		[filterText, setFilterText] = useState(''),
		disabled = !filterText || filterText.trim() === '',
		// modelProps = useModelProps(model),
		handleChange = useCallback((value) => {
			let provableText = value;

			//This is just in case the text is being cleared
			if (typeof provableText === 'string' && provableText.trim() === '') {
				applyFilter(provableText);
			}

			//If data is not a known format, removes special chars
			if (!textIsKnownType(provableText)) {
				//Will clear for any special character
				//As well as lower case the text
				provableText = removeSpecialChars(provableText).toLowerCase();
			}

			return setFilterText(provableText);
		}, []),
		applyFilter = useCallback(async (value) => {
			let mainFilter = [];

			//Value was informed
			if (!!value && typeof value === 'string' && value.trim() !== '') {
				let currentIndex = `$$index.${value}`;

				mainFilter.push([currentIndex, '==', true]);
			}

			//TODO: check whether lists were affected
			//Adding deleted flag filter
			//mainFilter.push(['deleted', '==', false]);

			//Invalid type of updater?
			if (typeof updateFilters !== 'function')
				throw Error('dynamic-list-SingleFilter-requires-updateFilters(array)-function');

			//Has to be valid
			//AS well as composes an AND query (extra outer array)
			return updateFilters([mainFilter]);
		}, []),
		handleSearch = useCallback(
			(e) => {
				let indexableText = filterText;

				//If available, stops propagation of event
				if (!!e && typeof e.stopPropagation === 'function') e.stopPropagation();

				//Avoids triggering a query when the command should be disabled
				if (disabled) return false;

				//Will clear for any special character
				//As well as lower case the text
				indexableText = removeSpecialChars(indexableText, true).toLowerCase();

				return applyFilter(indexableText);
			},
			[filterText, applyFilter]
		),
		handleEnterPress = useEnterPress(handleSearch);

	return (
		<FormInput
			className={classes.textField}
			label={i18n(`list.filter.$label`)}
			value={filterText}
			onChange={(e) => handleChange(e.target.value)}
			onKeyPressCapture={handleEnterPress}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton disabled={disabled} edge="end" onClick={handleSearch}>
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				)
			}}
		/>
	);
};

let searchTimeout;
const search = (oService, filters) => {
	//removes previous versions of timeout
	clearTimeout(searchTimeout);

	if (!oService.filter || typeof oService.filter !== 'function')
		throw Error('dynamic-list-search-needs-filter()-method-implemented-at-service');

	if (filters && filters.length > 0) {
		//will filter, then
		oService.filter(filters);
	}

	searchTimeout = setTimeout(() => {
		if (!oService.list || typeof oService.list !== 'function')
			throw Error('dynamic-list-service-has-to-have-list()-method');

		if (!filters || filters.length === 0) oService.list();
	}, 300);
};

let oService;

const DynamicList = ({
	reduxList,
	model,
	configuration,
	baseRoute,
	i18n,
	firebase,
	store,
	serviceInstance
}) => {
	const history = useHistory();

	//Checkers of service
	if (!oService && !serviceInstance && !!store && !!firebase) {
		oService = model.getService(firebase, store);
	} else if (!!serviceInstance) {
		oService = serviceInstance;
	} else {
		throw Error(
			'dynamic-list-service-requires-an-available-serviceInstance-or-store-and-firebase'
		);
	}

	useEffect(() => {
		//direct service instance, when not yet instanced
		// if (!!serviceInstance && !oService) oService = serviceInstance;

		//No items yet searched
		//if (!reduxList) {
		search(oService, []);
		//}
	}, [oService, serviceInstance]);

	return (
		<div>
			<TitleAndButtons
				title={i18n(`${model.getModelName()}.list.$title`)}
				buttons={[<AddButton baseRoute={baseRoute} i18n={i18n} />]}
			/>
			<Card className="mb-15">
				<CardContent>
					<FieldGroup>
						{/* {createFilters(model, i18n, (f) => {
							search(oService, f);
						})} */}
						<SingleFilter
							model={model}
							i18n={i18n}
							updateFilters={(filters) => {
								return search(oService, filters);
							}}
						/>
					</FieldGroup>
				</CardContent>
			</Card>

			<Card className="mb-15">
				<CardContent>
					{!!reduxList && <ListTotaliser i18n={i18n} length={reduxList.length} />}
					{!!reduxList && reduxList.length > 0 && (
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
					)}
					{!reduxList || (reduxList.length === 0 && <EmptyList i18n={i18n} />)}
				</CardContent>
			</Card>
		</div>
	);
};

DynamicList.propTypes = {
	reduxList: PropTypes.array,
	model: PropTypes.object,
	configuration: PropTypes.object,
	baseRoute: PropTypes.string,
	i18n: PropTypes.func.isRequired,
	firebase: PropTypes.object,
	serviceInstance: PropTypes.object,
	store: PropTypes.any
};

export default DynamicList;
