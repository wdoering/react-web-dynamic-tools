import React from 'react';
import PropTypes from 'prop-types';
import { errorStyles } from '../../assets/_styles';
import { Typography } from '@material-ui/core';

const ErrorLabel = ({ children }) => {
	return (
		children && (
			<Typography variant="body2" style={errorStyles()}>
				{children}
			</Typography>
		)
	);
};

ErrorLabel.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default ErrorLabel;
