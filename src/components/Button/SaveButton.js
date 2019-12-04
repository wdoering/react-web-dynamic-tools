import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
// TODO: check whether moduleNameMapper works out of webpack:
// import IntlMessages from 'Util/IntlMessages';
import IntlMessages from '../../util/IntlMessages';

/**
 * A pattern-follower save-button. Required handler (onClick)
 *
 * @property {func} onClick
 */
const SaveButton = ({ onClick }) => {
	return (
		<Button
			variant="contained"
			color="primary"
			// type="submit"
			children={<IntlMessages id="button.save" />}
			onClick={onClick}
		/>
	);
};

SaveButton.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default SaveButton;
