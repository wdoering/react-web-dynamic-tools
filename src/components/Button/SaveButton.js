import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import SaveRounded from '@material-ui/icons/SaveRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower **save-button**. Required handler (onClick)
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 * @param {string} param0.color
 */
const SaveButton = ({ onClick, i18n, color = 'primary', ...other }) => {
	const useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.save'), [i18n]);

	return (
		<Tooltip title={i18n('button.save.tooltip')} arrow>
			<Button
				variant="contained"
				color={color}
				children={useIcons ? <SaveRounded /> : buttonText}
				onClick={onClick}
				aria-label={buttonText}
				{...other}
			/>
		</Tooltip>
	);
};

SaveButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	i18n: PropTypes.func.isRequired,
	color: PropTypes.string
};

export default SaveButton;
