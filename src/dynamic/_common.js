import React from 'react';

/**
 * Renders an empty spacer sibling-field
 *
 * @param {object} param0 Object applicable props
 */
const SpacerSiblingField = (props) => {
	return <div className="sibling-field" style={{ flexBasis: '100%' }} {...props}></div>;
};

export { SpacerSiblingField };
