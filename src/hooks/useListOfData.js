import { useState, useEffect } from 'react';
import { getServiceList, typeShouldUseService } from '../functions';

/**
 * Custom hook for finding a list of data from an object array-prop
 *
 * @param {ModelBase} objectWithProps An object as source of data and string-uids
 * @param {string} property Property in question, the name
 * @param {FieldType} Type The type in question (complex should be)
 * @param {object} firebase With connection to a service
 *
 * @return {array} with a, array-list and a setList function
 */
const useListOfData = (objectWithProps, property, Type, firebase) => {
	const [list, setList] = useState([]),
		currentValues = objectWithProps[property],
		objectPropIsArray = currentValues instanceof Array;

	useEffect(() => {
		if (!list || !list.length || (objectPropIsArray && list.length !== currentValues.length)) {
			//And is there a service behind?
			if (
				objectPropIsArray &&
				objectWithProps[property].length > 0 &&
				typeShouldUseService(Type)
			) {
				getServiceList(property, Type, objectWithProps, firebase).then((result) => {
					setList(result);
				});
			} else {
				//No service at all, sets raw data
				setList(objectWithProps[property]);
			}
		}
	}, [list, objectWithProps, property, Type]);

	return [list, setList];
};

export default useListOfData;
