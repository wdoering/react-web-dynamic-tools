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

/**
 * Will render a default Dynamic title (h4 or any specified);
 * Based on MUI Typography;
 *
 * @param {object} param0 Params
 * @param {string} param0.title The title to be rendered itself
 * @param {React.ReactElement|React.ReactNode} param0.children The collection of children to be rendered
 * @param {Array<React.ReactElement>} param0.button The button collection to be rendered
 * @param {string} param0.variant The title Typography variant
 */
const TitleAndButtons = ({ title, children = false, buttons = [], variant = 'h4' }) => {
	const classes = useStyles();

	return (
		<Typography variant={variant} className={classes.root}>
			{!!title && title !== '' && title}
			{!!children && children}
			{!!buttons && buttons.length > 0 && (
				<React.Fragment>
					<div className={classes.spacer} />
					{buttons.map((button, index) => React.cloneElement(button, { key: index }))}
				</React.Fragment>
			)}
		</Typography>
	);
};

TitleAndButtons.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
	buttons: PropTypes.arrayOf(PropTypes.element)
};

export default TitleAndButtons;
