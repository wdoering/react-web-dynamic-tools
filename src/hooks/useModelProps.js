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

		console.log('model', model);
		console.log('modelProps', modelProps);

		//There are prop-keys to be kept
		if (modelProps.length === 0 && !!model) {
			//Tries getting a plainObject version of an object
			if (model instanceof PlainObject) {
				props = Object.keys(model.$toPlainObject());
			} else {
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

	return modelProps;
};

export default useModelProps;
