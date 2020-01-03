import { useCallback } from 'react';

/**
 * Hook for triggering a common enter-key-press action
 *
 * @param {Function} callback the function which will be triggered
 *
 * @returns {Function} the function to be used with an "onKeyPress" or any trigger
 */
const useEnterPress = (callback) => {
	const onEnterPress = useCallback(
		(e) => {
			if (e.key === 'Enter' && !!callback && typeof callback === 'function') callback(e);

			e.stopPropagation();
		},
		[callback]
	);

	return onEnterPress;
};

export default useEnterPress;
