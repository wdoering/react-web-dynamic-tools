/**
 * Firebase in-array slice limit
 */
const arraySliceLength = 10;

/**
 * Utility for array slicing up to 10 itens
 * When building in-array for firebase-basic-service queries
 *
 * @param {string} property The property to be compared
 * @param {array} items List items of string
 */
const inArray = (property, items) => {
	let filters = [];

	for (let i = 0; i < items.length / arraySliceLength; i += arraySliceLength) {
		filters.push([`${property}`, 'in', items.slice(i, i + arraySliceLength)]);
	}

	return filters;
};

export { inArray };
