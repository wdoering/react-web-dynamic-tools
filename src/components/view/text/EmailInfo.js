import React from 'react';
import PropTypes from 'prop-types';
import EmailRounded from '@material-ui/icons/EmailRounded';
import InfoWithIcon from './InfoWithIcon';

/**
 * Renders an email "mailto:" (anchor) for display
 *
 * @param {object} param0 props
 * @param {string} param0.text the text to be rendered
 * @param {string} param0.i18n the translation source for tooltip/text
 * @param {string} param0.external [optional] if it opens an external link
 */
const EmailInfo = ({ text, i18n, external = true }) => (
	<InfoWithIcon
		text={text}
		icon={<EmailRounded />}
		i18n={i18n}
		external={external}
		type="email"
	/>
);

EmailInfo.propTypes = {
	text: PropTypes.string,
	external: PropTypes.bool
};

export default EmailInfo;
