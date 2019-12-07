import React from 'react';
import PropTypes from 'prop-types';

const Translate = ({ i18n, id, ...other }) => {
	return i18n instanceof React.Component
		? React.cloneElement(i18n, { id, ...other })
		: i18n(id, other);
};

Translate.propTypes = {
	i18n: PropTypes.oneOf([PropTypes.i18n, PropTypes.textId]),
	id: PropTypes.string
};

export default Translate;
