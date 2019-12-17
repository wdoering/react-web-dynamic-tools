import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

/**
 * A pattern-follower save-button. Required handler (onClick)
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */
const SaveButton = ({ onClick, i18n, color = 'primary', ...other }) => {
	return (
		<Button
			variant="contained"
			color={color}
			// type="submit"
			children={i18n('button.save')}
			onClick={onClick}
			{...other}
		/>
	);
};

SaveButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	i18n: PropTypes.func.isRequired,
	color: PropTypes.string
};

export default SaveButton;
