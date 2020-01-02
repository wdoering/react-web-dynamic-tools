import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import { useMobileIconButtons } from '../../hooks';

const useStyles = makeStyles((theme) => ({
	root: {
		marginLeft: 5,
		color: 'rgba(255,255,255,1) !important',
		backgroundColor: 'rgba(216, 0, 0, 1) !important',
		'&:hover': {
			backgroundColor: 'rgba(195, 0, 0, 0.85) !important'
		}
	}
}));

/**
 * A pattern-follower **delete-button**
 *
 * @param {object} param0
 * @param {function} param0.onClick
 * @param {function} param0.i18n
 */
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
				aria-label={buttonText}
				{...other}
			>
				{useIcons ? <DeleteRounded /> : buttonText}
			</Button>
		</Tooltip>
	);
};

DeleteButton.propTypes = {
	onClick: PropTypes.func.isRequired,
	i18n: PropTypes.func.isRequired
};

export default DeleteButton;
