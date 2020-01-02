import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import KeyboardReturnRounded from '@material-ui/icons/KeyboardReturnRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower **cancel-button**
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */
const CancelButton = ({ onClick, i18n, color = 'secondary', ...other }) => {
	const history = useHistory(),
		useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.cancel'), [i18n]);

	return (
		<Tooltip title={i18n('button.cancel.tooltip')} arrow>
			<Button
				variant="outlined"
				color={color}
				ariaLabel={buttonText}
				children={useIcons ? <KeyboardReturnRounded /> : buttonText}
				onClick={onClick || (() => history.goBack())}
				{...other}
			/>
		</Tooltip>
	);
};

CancelButton.propTypes = {
	onClick: PropTypes.func,
	i18n: PropTypes.func.isRequired,
	color: PropTypes.string
};

export default CancelButton;
