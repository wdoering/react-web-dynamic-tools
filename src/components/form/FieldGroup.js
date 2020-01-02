import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		flexDirection: 'row',
		flexWrap: 'wrap',
		'& > .sibling-field': {
			flex: 1,
			flexGrow: 1,
			marginRight: '10px',
			minWidth: '100px',
			flexBasis: '120px',
			overflowWrap: 'break-word',
			'& .MuiFormControl-root': {
				width: '100%'
			}
		},
		'& > .break-field': {
			flexBasis: '100%'
		}
	},
	rootWithMarginTop: {
		marginTop: 15
	}
}));

/**
 * Renders a default group-wrapper div, with possibility of margin-top-15
 *
 * @param {*} param0
 */
const FieldGroup = ({ children, marginTop = false }) => {
	const classes = useStyles();

	return (
		<div
			className={classNames('field-group', classes.root, {
				[classes.rootWithMarginTop]: marginTop
			})}
		>
			{children}
		</div>
	);
};

FieldGroup.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.element),
		PropTypes.arrayOf(PropTypes.node)
	]),
	marginTop: PropTypes.bool
};

export default FieldGroup;
