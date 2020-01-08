import { makeStyles } from '@material-ui/core';

export const errorStyles = makeStyles({
	root: {
		color: '#f44336',
		alignSelf: 'center',
		marginLeft: '10px',
		marginRight: '10px'
	}
});

export const textFieldStyles = makeStyles({
	spacer: {
		marginBottom: '10px'
	}
});

export const filterTextField = makeStyles((theme) => ({
	root: {},
	textField: {
		flex: 1,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

export const viewInfoStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(2)
	},
	title: {
		marginBottom: '5px'
	},
	detail: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: 18,
		fontWeight: '100'
	}
}));

export const viewInfoLink = makeStyles((theme) => ({
	root: {},
	icon: {
		marginLeft: theme.spacing(1)
	}
}));

export const listResultText = makeStyles({
	root: {
		marginTop: 0,
		marginBottom: 10
	}
});

export const listEmptyStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& > *': {
			flex: '0 0 auto',
			marginBottom: theme.spacing(2)
		}
	}
}));
