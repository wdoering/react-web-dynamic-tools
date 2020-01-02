import React from 'react';
import PropTypes from 'prop-types';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import { viewInfoWebSite } from '../../../assets/_styles';

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 */
const WebSiteInfo = ({ text, external = true }) => {
	const classes = viewInfoWebSite();

	return <a className={classes.root} href={text}>{`${text} ${(<LaunchRounded />)}`}</a>;
};

WebSiteInfo.propTypes = {
	text: PropTypes.string
};

export default WebSiteInfo;
