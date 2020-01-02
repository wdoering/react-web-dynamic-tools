import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditRounded';
import { useMobileIconButtons } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 5,
		color: 'rgba(255,255,255,1) !important',
		backgrounColor: 'rgba(204, 0, 0, 0.9) !important',
		'&:hover': {
			backgrounColor: 'rgba(204, 0, 0, 0.75) !important'
		}
	}
}));

const DeleteButton = ({ onClick, i18n, ...other }) => {
	const classes = useStyles(),
		useIcons = useMobileIconButtons(),
		buttonText = useMemo(() => i18n('button.delete'), [i18n]);

	return (
		<Tooltip title={i18n('button.delete.tooltip')} arrow>
			<Button
				variant="contained"
				className={classes.root}
				onClick={onClick}
				ariaLabel={buttonText}
				{...other}
			>
				{useIcons ? <EditIcon /> : buttonText}
			</Button>
		</Tooltip>
	);
};

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	i18n: PropTypes.func.isRequired
};

export default DeleteButton;