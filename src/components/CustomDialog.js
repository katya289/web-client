import React from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Box
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';

export const CustomDialog = ({ isOpenDialog, handleClose, title, subtitle, children }) => {
    return (
        <Dialog
        // color="primary"
            open={isOpenDialog}
            onClose={handleClose}
            aria-labelledby="max-width"
            sx={{
                '& .MuiDialog-paper': {
                    backgroundColor: '#222831',
                    height: '200px',
                    width: '600px'
                },
            }}
        >
            <DialogTitle sx={{ color: 'white' }} id='max-width-dialog-title'>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BlockIcon sx={{ color: 'red', marginRight: '8px' }} />
                    {title}
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'white' }}>{subtitle}</DialogContentText>

            </DialogContent>
            <DialogActions>
                {children}
                <Button onClick={handleClose} color="error">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

CustomDialog.propTypes = {
    isOpenDialog: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.element.isRequired
};
