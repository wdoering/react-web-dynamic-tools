import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

/**
 * Renders an input with defined type
 *
 * @param {Object} param0
 */
const FormInput = ({
	label,
	type = 'text',
	onChange = (e) => console.error('FormInput:value:onChangeNotImplemented', e.target.value),
	...otherProps
}) => {
	return (
		<TextField
			variant="outlined"
			type={type}
			label={label}
			onChange={(e) => {
				onChange(e);
			}}
			{...otherProps}
		/>
	);
};

FormInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func
};

export default FormInput;
