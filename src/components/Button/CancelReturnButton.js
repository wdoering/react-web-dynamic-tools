import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import KeyboardReturnRounded from '@material-ui/icons/KeyboardReturnRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower **cancel-and-return-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {string} param0.color
 * @param {function} param0.i18n
 */
const CancelReturnButton = ({ onClick, i18n, color = 'secondary', ...other }) => {
	const history = useHistory(),
		useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.cancel.return'), [i18n]);

	return (
		<Tooltip title={i18n('button.cancel.return.tooltip')} arrow>
			<Button
				variant="outlined"
				color={color}
				aria-label={buttonText}
				children={useIcons ? <KeyboardReturnRounded /> : buttonText}
				onClick={onClick || (() => history.goBack())}
				{...other}
			/>
		</Tooltip>
	);
};

CancelReturnButton.propTypes = {
	onClick: PropTypes.func,
	i18n: PropTypes.func.isRequired,
	color: PropTypes.string
};

export default CancelReturnButton;
