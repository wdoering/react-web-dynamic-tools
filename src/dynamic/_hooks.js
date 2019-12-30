import React, { useState, useEffect, useMemo } from 'react';
import { getServiceList, typeShouldUseService } from './_functions';

/**
 * Custom hook for finding a list of data from an object array-prop
 *
 * @param {ModelBase} objectWithProps An object as source of data and string-uids
 * @param {string} property Property in question, the name
 * @param {FieldType} Type The type in question (complex should be)
 * @param {object} firebase With connection to a service
 */
const useListOfData = (objectWithProps, property, Type, firebase) => {
	const [list, setList] = useState([]),
		objectPropIsArray = objectWithProps[property] instanceof Array,
		runService = useCallback(() => getServiceList(property, Type, objectWithProps, firebase), [
			property,
			Type,
			objectWithProps,
			firebase
		]);
	// const runService = useMemo(() => {
	// 	getServiceList(property, Type, objectWithProps, firebase).then((result) => {
	// 		setList(result);
	// 	});
	// }, []);

	console.log('useListOfData:objectWithProps[property]', objectWithProps[property]);

	useEffect(() => {
		if (
			!list ||
			!list.length ||
			(objectPropIsArray && objectWithProps[property].length !== list.length)
		) {
			//And is there a service behind?
			if (objectPropIsArray) {
				if (objectWithProps[property].length === 0) {
					setList([]);
				} else if (objectWithProps[property].length > 0 && typeShouldUseService(Type)) {
					runService(property, Type, objectWithProps, firebase).then((result) => {
						setList(result);
					});
				}
			} else {
				//No service at all, sets raw data
				setList(objectWithProps[property]);
			}
		}
	}, [list, setList, objectWithProps, property, Type, firebase]);

	return [list, setList];
};

export { useListOfData };
