import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(1),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-end',
		'& > *': {
			flex: '0 0 auto',
			marginLeft: theme.spacing(1)
		}
	}
}));

/**
 *
 * @param {React.ReactNodeArray} buttons
 */
const BottomButtons = ({ buttons }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{buttons.map((button, key) => React.cloneElement(button, { key }))}
		</div>
	);
};

BottomButtons.propTypes = {
	buttons: PropTypes.arrayOf(PropTypes.node)
};

export default BottomButtons;
