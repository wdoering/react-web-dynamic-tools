export const validateName = (name) => {
	const nameRegex = /^[a-zA-Z]+$/;
	return nameRegex.test(name);
};

export const validateWebsite = (webSite) => {
	const webSiteRegex = /((https?:\/\/)|(https?:\/\/)(www\.)|(www\.))?[a-zA-Z]{1,}[\.\-_]{0,}[a-zA-Z0-9%_\-.\+~#=]{1,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
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
