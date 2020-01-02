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

export const viewInfoStyles = makeStyles({
	root: {
		marginBottom: '15px'
	},
	title: {
		marginBottom: '5px'
	},
	detail: {
		marginTop: 5,
		marginBottom: 5
	}
});

export const listResultText = makeStyles({
	root: {
		marginTop: 0,
		marginBottom: 10
	}
});

export const listEmptyStyles = makeStyles({
	root: {
		marginTop: 10,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& > *': {
			flex: '0 0 auto',
			marginBottom: 15
		}
	}
});
