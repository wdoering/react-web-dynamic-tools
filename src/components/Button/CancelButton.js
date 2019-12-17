import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

/**
 * A pattern-follower **cancel-button**
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */
const CancelButton = ({ onClick, i18n, color = 'secondary', ...other }) => {
	const history = useHistory();

	return (
		<Button
			variant="outlined"
			color={color}
			children={i18n('button.cancel')}
			onClick={onClick || (() => history.goBack())}
			{...other}
		/>
	);
};

CancelButton.propTypes = {
	onClick: PropTypes.func,
	i18n: PropTypes.func.isRequired,
	color: PropTypes.string
};

export default CancelButton;
