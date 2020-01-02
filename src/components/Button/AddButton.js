import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import AddRounded from '@material-ui/icons/AddRounded';
import { useMobileIconButtons } from '../../hooks';

const AddButton = ({ baseRoute, i18n }) => {
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
			>
				{useIcon ? <AddRounded /> : buttonText}
			</Button>
		</Tooltip>
	);
};

AddButton.propTypes = {
	baseRoute: PropTypes.string.isRequired,
	i18n: PropTypes.func.isRequired
};

export default AddButton;
