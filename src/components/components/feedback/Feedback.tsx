import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

/**
 * Wizard component
 * @author vadim.chilinciuc
 */


interface NotifierComponentProps {
	/**
	 * Controls the visibility of the snackbar. Set to true to open, false to close.
	 */
	openNotifier: boolean;

	/**
	 * The main title of the snackbar.
	 */
	message: string;

	/**
	 * The sub-title of the snackbar.
	 */
	submessage: string;

	/**
	 * Indicates the type or severity of the snackbar.
	 */
	severity: string;

	/**
	 * The duration in milliseconds for which the snackbar auto-hides.
	 */
	autoHideDuration: number;

	/**
	 * Callback function invoked when the snackbar is closed.
	 */
	onCloseSnack: () => void;
}

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert sx={{
		backgroundColor:'rgba(255,255,255,1)',
		boxSizing:'border-box',
		border:'1px solid rgba(177,180,182,1)',
		boxShadow:'none'
	}} elevation={6} ref={ref} {...props} />;
});

export default function Feedback({ openNotifier,onCloseSnack,message,submessage,severity,autoHideDuration }:NotifierComponentProps) {

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={openNotifier} autoHideDuration={autoHideDuration} >
				<Alert onClose={onCloseSnack} severity={severity} >
					<h3  style={{
						marginTop:'-11px',
						fontWeight: 600,
						fontStyle: 'normal',
						textAlign: 'left',
						fontSize:'32px',
						lineHeight: '42px',
						color:'black'
					}}
					>
						{message}
					</h3>
					<p style={{marginTop:'-20px',fontSize:'20px',lineHeight: '31px'}}>{submessage}</p>
				</Alert >
			</Snackbar>
		</Stack>
	);
}