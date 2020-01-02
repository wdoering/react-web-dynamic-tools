import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Tooltip } from '@material-ui/core';

const AddButton = ({ baseRoute, i18n }) => {
	const history = useHistory();

	return (
		<Tooltip title={i18n('button.add.tooltip')} arrow>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					history.push(`${baseRoute}/form/`);
				}}
			>
				{i18n('button.add')}
			</Button>
		</Tooltip>
	);
};

AddButton.propTypes = {
	baseRoute: PropTypes.string.isRequired,
	i18n: PropTypes.func.isRequired
};

export default AddButton;
