import React from 'react';
import PropTypes from 'prop-types';
import EmailRounded from '@material-ui/icons/EmailRounded';
import { viewInfoLink } from '../../../assets/_styles';

/**
 * Renders an email "mailto:" (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 */
const EmailInfo = ({ text, external = true }) => {
	const classes = viewInfoLink();

	return (
		<a
			className={classes.root}
			href={`mailto:${text}`}
			target={external ? '_blank' : '_self'}
		>{`${text} ${(<EmailRounded />)}`}</a>
	);
};

EmailInfo.propTypes = {
	text: PropTypes.string,
	external: PropTypes.bool
};

export default EmailInfo;
