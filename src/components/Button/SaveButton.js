import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from '@material-ui/core';
import { SaveRounded } from '@material-ui/icons/SaveRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower save-button. Required handler (onClick)
 *
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */
const SaveButton = ({ onClick, i18n, color = 'primary', ...other }) => {
	const useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.save'), [i18n]);

	return (
		<Tooltip title={i18n('button.save.tooltip')} arrow>
			<Button
				variant="contained"
				color={color}
				// type="submit"
				children={useIcons ? <SaveRounded /> : buttonText}
				onClick={onClick}
				ariaLabel={buttonText}
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
