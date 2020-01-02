import React from 'react';
import PropTypes from 'prop-types';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import { viewInfoLink } from '../../../assets/_styles';

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 */
const WebSiteInfo = ({ text, external = true }) => {
	const classes = viewInfoLink();

	return (
		<a className={classes.root} href={text} target={external ? '_blank' : '_self'}>{`${text} ${(
			<LaunchRounded />
		)}`}</a>
	);
};

WebSiteInfo.propTypes = {
	text: PropTypes.string,
	external: PropTypes.bool
};

export default WebSiteInfo;
