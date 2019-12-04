import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
// TODO: check whether moduleNameMapper works out of webpack:
// import IntlMessages from 'Util/IntlMessages';
import IntlMessages from '../../util/IntlMessages';

/**
 * A pattern-follower **cancel-button**
 */
const CancelButton = ({ onClick }) => {
	const history = useHistory();

	return (
		<Button
			variant="outlined"
			color="secondary"
			children={<IntlMessages id="button.cancel" />}
			onClick={onClick || (() => history.goBack())}
			//TODO: Architecture - Components/form/CancelButton - Insert confirmation message
			// onClick={() => (confirm(<IntlMessages id="button.cancel" />) ? history.goBack() : null)}
		/>
	);
};

export default CancelButton;
