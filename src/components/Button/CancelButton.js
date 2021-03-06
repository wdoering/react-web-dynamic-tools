import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import CancelRounded from '@material-ui/icons/CancelRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower **cancel-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {string} param0.color
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
				aria-label={buttonText}
				children={useIcons ? <CancelRounded /> : buttonText}
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
