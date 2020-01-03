import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

/**
 * Contains any possible dev-flaw into a nutshell wrapper
 */
const ErrorBoundary = ({ children, ...otherProps }) => {
	try {
		return React.cloneElement(children, { ...otherProps });
	} catch (e) {
		return (
			<div
				style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
			>
				<Typography component="h3" variant="h4">
					Oops!
				</Typography>
				<Typography component="p" variant="body1">
					This component presented a serious problem. :/
				</Typography>
				<Typography component="h5" variant="h5">
					Error depiction:
				</Typography>
				<Typography component="p">{e.toString()}</Typography>
			</div>
		);
	}
};

ErrorBoundary.propTypes = {
	children: PropTypes.element
};

export default ErrorBoundary;
