import React from 'react';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: 15,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		alignContent: 'center'
	},
	spacer: {
		flex: 1
	}
}));

const TitleAndButtons = ({ title, children, buttons, variant = 'h4' }) => {
	const classes = useStyles();

	return (
		<Typography variant={variant} className={classes.root}>
			{!!title && title !== '' && title}
			{!!children && children}
			{!!buttons && buttons.length > 0 && <div className={classes.spacer} />}
			{buttons.map((button, index) => React.cloneElement(button, { key: index }))}
		</Typography>
	);
};

TitleAndButtons.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
	buttons: PropTypes.arrayOf(PropTypes.element)
};

export default TitleAndButtons;
