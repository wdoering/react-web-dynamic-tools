import React from 'react';

/**
 * Renders an empty spacer sibling-field
 *
 * @param {object} param0
 * @param {any} param0.key The key of the current item
 */
const SpacerSiblingField = ({ key = 0 }) => {
	return <div key={key} className="sibling-field" style={{ flexBasis: '100%' }}></div>;
};

export { SpacerSiblingField };
