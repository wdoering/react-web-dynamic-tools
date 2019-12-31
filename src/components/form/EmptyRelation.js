import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { viewInfoStyles } from '../../assets/_styles';

const EmptyRelation = ({ i18n }) => {
	const classes = viewInfoStyles();

	return (
		<Typography variant="body2" className={classes.detail}>
			{i18n('form.idof.not.informed')}
		</Typography>
	);
};

EmptyRelation.propTypes = {
	i18n: PropTypes.func.isRequired
};

export default EmptyRelation;
