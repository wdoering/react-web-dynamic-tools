import { useMediaQuery, useTheme } from '@material-ui/core';

/**
 * Provides a boolean whether to use mobile icon-buttons, given current window size
 * @returns {Boolean} true, icons might be rendered; false, may use texts
 */
function useMobileIconButtons() {
	const theme = useTheme(),
		matches = useMediaQuery(theme.breakpoints.down('md'));

	return matches;
}

export default useMobileIconButtons;
