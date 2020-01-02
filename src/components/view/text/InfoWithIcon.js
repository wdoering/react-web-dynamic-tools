import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from '@material-ui/core';
import { viewInfoLink } from '../../../assets/_styles';

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {Element} param0.icon the icon to be used
 * @param {Function} param0.i18n the translation source
 * @param {string} param0.type the type of the info
 * @param {Boolean} param0.external If it opens an external link
 */
const InfoWithIcon = ({ text, icon, i18n, type = 'link', external = true }) => {
	const classes = viewInfoLink();

	return (
		<div className={classes.root}>
			{text}
			<Tooltip title={i18n(`view.text.info.${type}`)} arrow>
				<IconButton
					variant="text"
					component="a"
					className={classes.icon}
					href={text}
					target={external ? '_blank' : '_self'}
					aria-label={text}
					size="small"
				>
					{React.cloneElement(icon)}
				</IconButton>
			</Tooltip>
		</div>
	);
};

InfoWithIcon.propTypes = {
	text: PropTypes.string,
	external: PropTypes.bool,
	i18n: PropTypes.func,
	type: PropTypes.oneOf(['link', 'website', 'email', 'phone']),
	icon: PropTypes.element
};

export default InfoWithIcon;
