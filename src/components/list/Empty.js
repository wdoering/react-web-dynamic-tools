import React from 'react';
import PropTypes from 'prop-types';
import { listEmptyStyles } from '../../assets/_styles';
import { Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoRounded';

const EmptyList = ({ i18n }) => {
	const classes = listEmptyStyles();

	return (
		<div className={classes.root}>
			<Typography variant="h5" component="p">
				{i18n('list.empty.text')}
			</Typography>
			<InfoIcon />
		</div>
	);
};

EmptyList.propTypes = {
	i18n: PropTypes.func.isRequired
};

export default EmptyList;
