export const validateName = (name) => {
	const nameRegex = /^[a-zA-Z]+$/;
	return nameRegex.test(name);
};

export const validateEmail = (email) => {
	const regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEmail.test(email);
};

export const validatePassword = (password) => {
	const pwdRegex = /^.{6,}$/;
	return !pwdRegex.test(password);
};
