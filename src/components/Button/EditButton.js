import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';
import EditRounded from '@material-ui/icons/EditRounded';
import { useMobileIconButtons } from '../../hooks';

const EditButton = ({ baseRoute, id, i18n, color = 'primary', ...other }) => {
	const history = useHistory(),
		useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.edit'), [i18n]);

	return (
		<Tooltip title={i18n('button.edit.tooltip')} arrow>
			<Button
				variant="contained"
				color={color}
				onClick={() => {
					history.push(`${baseRoute}/form/${id}`);
				}}
				aria-label={buttonText}
				{...other}
			>
				{useIcons ? <EditRounded /> : buttonText}
			</Button>
		</Tooltip>
	);
};

EditButton.propTypes = {
	baseRoute: PropTypes.string.isRequired,
	color: PropTypes.oneOf(['primary', 'secondary']),
	id: PropTypes.string.isRequired,
	i18n: PropTypes.func.isRequired
};

export default EditButton;
