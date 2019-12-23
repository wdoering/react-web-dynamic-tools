import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const TitleAndButtons = ({ title, children, buttons, variant = 'h4' }) => {
	return (
		<Typography
			variant={variant}
			className="mb-15"
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				alignContent: 'center'
			}}
		>
			{!!title && title !== '' && title}
			{!!children && children}
			{!!buttons && buttons.length > 0 && <div style={{ flex: 1 }} />}
			{buttons.map((button, index) => React.cloneElement(button, { key: index }))}
		</Typography>
	);
};

TitleAndButtons.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
	buttons: PropTypes.arrayOf([PropTypes.node, PropTypes.element])
};

export default TitleAndButtons;
