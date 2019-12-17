import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

/**
 * Delete Confirmation Dialog
 */
class DeleteConfirmationDialog extends React.Component {
	state = {
		open: false
	};

	// open dialog
	open() {
		this.setState({ open: true });
	}

	// close dialog
	close() {
		this.setState({ open: false });
	}

	render() {
		const { title, message, onConfirm, i18n } = this.props;

		return (
			<Dialog
				open={this.state.open}
				onClose={() => this.close()}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">{message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => this.close()} className="btn-danger text-white">
						{i18n('button.cancel')}
					</Button>
					<Button onClick={onConfirm} className="btn-primary text-white" autoFocus>
						{i18n('button.yes')}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

DeleteConfirmationDialog.propTypes = {
	i18n: PropTypes.func.isRequired
};

export default DeleteConfirmationDialog;
