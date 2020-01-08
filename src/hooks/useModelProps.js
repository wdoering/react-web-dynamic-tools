import { useEffect, useState } from 'react';
import { ModelBase, PlainObject } from '@zerobytes/object-model-js';

/**
 * Will map all specific model props to an array of names
 *
 * @param {ModelBase|PlainObject} model the model to be mapped
 *
 * @returns {array} of model prop-names
 */
const useModelProps = (model) => {
	const [modelProps, setModelProps] = useState([]);

	//TODO: create specific hook
	useEffect(() => {
		let props = [];

		//There are prop-keys to be kept
		if (modelProps.length === 0 && !!model) {
			console.log('model', model);
			console.log('modelProps', modelProps);

			//Tries getting a plainObject version of an object
			if (model instanceof PlainObject) {
				console.log('model instanceof PlainObject');
				props = Object.keys(model.$toPlainObject());
			} else {
				console.log('model instanceof object');
				//Keeps default object props
				//Removing undesired ones
				//No functions and specifically-reserved name props
				props = Object.keys(model).filter(
					(prop) =>
						typeof model[prop] !== 'function' &&
						!['$fieldConfig', '$$index'].includes(prop)
				);
			}

			//Will set props, then
			setModelProps(props);
		}
	}, []); // Empty array ensures that effect is only run on mount and unmount

	console.log('modelProps', modelProps);

	return modelProps;
};

export default useModelProps;
