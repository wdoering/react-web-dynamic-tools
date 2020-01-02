import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import AddRounded from '@material-ui/icons/AddRounded';
import { useMobileIconButtons } from '../../hooks';

/**
 * A pattern-follower **add-button**
 *
 * @param {object} param0
 * @param {string} param0.baseRoute
 * @param {function} param0.i18n
 * @param {function} param0.onClick
 */
const AddButton = ({ baseRoute, i18n, onClick = null, ...other }) => {
	const history = useHistory(),
		useIcon = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.add'), [i18n]);

	return (
		<Tooltip title={i18n('button.add.tooltip')} arrow>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					history.push(`${baseRoute}/form/`);
				}}
				aria-label={buttonText}
				{...other}
			>
				{useIcon ? <AddRounded /> : buttonText}
			</Button>
		</Tooltip>
	);
};

AddButton.propTypes = {
	baseRoute: PropTypes.string.isRequired,
	i18n: PropTypes.func.isRequired,
	onClick: PropTypes.func
};

export default AddButton;
