import React from 'react';
import { errorStyles } from '../../assets/_styles';
import { Typography } from '@material-ui/core';

const ErrorLabel = ({ children }) => {
	const classes = errorStyles();

	return (
		children && (
			<Typography variant="body2" className={classes.root}>
				{children}
			</Typography>
		)
	);
};

export default ErrorLabel;
