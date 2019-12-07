import React from 'react';
import PropTypes from 'prop-types';

const Translate = ({ i18n, id, ...other }) => {
	return typeof i18n === 'function'
		? i18n(id, other)
		: React.cloneElement(i18n, { id, ...other });
};

Translate.propTypes = {
	i18n: PropTypes.oneOfType([PropTypes.i18n, PropTypes.textId]),
	id: PropTypes.string
};

export default Translate;
