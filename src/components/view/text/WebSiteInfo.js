import React from 'react';
import PropTypes from 'prop-types';
import LaunchRounded from '@material-ui/icons/LaunchRounded';
import InfoWithIcon from './InfoWithIcon';

/**
 * Renders a website link (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {string} param0.i18n the translation source for tooltip/text
 * @param {string} param0.external [optional] if it opens an external link
 */
const WebSiteInfo = ({ text, i18n, external = true }) => (
	<InfoWithIcon
		text={text}
		icon={<LaunchRounded />}
		i18n={i18n}
		external={external}
		type="website"
		iconProps={{ component: 'a', href: `${text}` }}
	/>
);

WebSiteInfo.propTypes = {
	text: PropTypes.string,
	external: PropTypes.bool
};

export default WebSiteInfo;
