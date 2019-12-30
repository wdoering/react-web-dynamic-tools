import React from 'react';
import PropTypes from 'prop-types';
import { listResultText } from '../../assets/_styles';
import { Typography, Chip } from '@material-ui/core';

const ListTotaliser = ({ i18n, length = 0 }) => {
	const classes = listResultText();

	return (
		length > 0 && (
			<Chip
				component="div"
				variant="outlined"
				className={classes.root}
				label={`${i18n('list.result.showing')} ${length} ${i18n('list.result.results')}`}
			/>
		)
	);
};

ListTotaliser.propTypes = {
	i18n: PropTypes.func.isRequired,
	length: PropTypes.number
};

export default ListTotaliser;
