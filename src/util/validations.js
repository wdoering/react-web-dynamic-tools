export const validateName = (name) => {
	const nameRegex = /^[a-zA-Z]+$/;
	return nameRegex.test(name);
};

export const validateWebsite = (webSite) => {
	const webSiteRegex = /^((https?:\/\/)|(https?:\/\/)(www\.)|(www\.))?[a-zA-Z]{1,}[\.\-_]{0,}[a-zA-Z0-9%_\-.\+~#=]{1,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
	return webSiteRegex.test(webSite);
};

export const validateEmail = (email) => {
	const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEmail.test(email);
};

export const validatePassword = (password) => {
	const pwdRegex = /^.{6,}$/;
	return !pwdRegex.test(password);
};

/**
 * Will apply **three** rules:
 *
 * * normalize()ing to NFD Unicode normal form decomposes combined
 * 	 graphemes into the combination of simple ones. The è of Crème ends up expressed as e + ̀.
 * * Using a regex character class to match the U+0300 → U+036F range,
 * 	 it is now trivial to globally get rid of the diacritics,
 *   which the Unicode standard conveniently groups as the Combining Diacritical Marks Unicode block.
 * * Removes any non-text/non-number char;
 *
 * @param {string} text The text to be cleansed
 *
 * @returns {string}
 */
export const removeSpecialChars = (text) => {
	return typeof text === 'string'
		? text
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/[^a-zA-Z0-9]/g, '')
		: text;
};
